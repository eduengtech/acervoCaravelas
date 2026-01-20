import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "../dto/createAuthDto";
import express from "express";
import { JwtAuhGuards } from "../guards/jwtAuthGuards";

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
  };
  cookies: {
    refreshToken?: string;
    accessToken?: string;
  };
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("me")
  @UseGuards(JwtAuhGuards)
  @ApiOperation({ summary: "Obter usuário logado" })
  @ApiResponse({ status: 200, description: "Usuário autenticado" })
  me(@Req() req: AuthenticatedRequest) {
    return req.user;
  }

  @Post("login")
  @ApiOperation({ summary: "Autenticação do usuário" })
  async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: express.Response) {
    const { accessToken, refreshToken } = await this.authService.login(data.email, data.senha);

    this.setCookies(res, accessToken, refreshToken);

    return { message: "Login realizado com sucesso" };
  }

  @Post("refresh")
  @ApiOperation({ summary: "Renovar access token" })
  async refresh(@Req() req: express.Request, @Res({ passthrough: true }) res: express.Response) {
    const cookies = req.cookies as Record<string, string | undefined>;
    const refreshTokenFromCookie = cookies?.refreshToken;

    if (!refreshTokenFromCookie) throw new UnauthorizedException("Refresh não fornecido");

    const { accessToken, refreshToken } = await this.authService.refresh(refreshTokenFromCookie);

    this.setCookies(res, accessToken, refreshToken);
    return { message: "Token renovado" };
  }

  @Post("logout")
  @ApiOperation({ summary: "Encerrar sessão" })
  async logout(@Req() req: express.Request, @Res({ passthrough: true }) res: express.Response) {
    const cookies = req.cookies as Record<string, string | undefined>;
    const refreshToken = cookies?.refreshToken;

    if (refreshToken) await this.authService.logout(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return { message: "Logout realizado com sucesso" };
  }

  private setCookies(res: express.Response, accessToken: string, refreshToken: string) {
    const commonOptions: express.CookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("accessToken", accessToken, {
      ...commonOptions,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", refreshToken, {
      ...commonOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }
}
