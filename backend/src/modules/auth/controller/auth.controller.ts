import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/createAuthDto';
import express from 'express';
import { JwtAuhGuards } from '../guards/jwtAuthGuards';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {};

    @Get('me')
    @UseGuards(JwtAuhGuards)
    @ApiOperation({summary: 'Obter usuário logado'})
    @ApiResponse({status: 200, description:'Usuário autenticado'})
    me(@Req() req: express.Request) {
        return req.user;
    }

    @Post('login')
    @ApiOperation({ summary: 'Autenticação do usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    async login(@Body() data: LoginDto, @Res({passthrough: true}) res: express.Response) {
        const {accessToken, refreshToken} = await this.authService.login(data.email, data.senha);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 ,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return {message: 'Login realizado com sucesso'}
    }
    
    @Post('refresh')
    @ApiOperation({ summary: 'Renovar access token usando o refresh token' })
    @ApiResponse({ status: 200, description: 'Tokens renovados com sucesso' })
    @ApiResponse({ status: 401, description: 'Refresh Token inválido ou expirado' })
    async refresh(@Req() req: express.Request ,@Res({passthrough: true}) res: express.Response,) {
        
        const refresh_Token = req.cookies?.refreshToken;


        if (!refresh_Token) throw new UnauthorizedException ('Refresh não fornecido');

        const {accessToken, refreshToken} = await this.authService.refresh(refresh_Token)

        res.cookie('accessToken', accessToken, {
            httpOnly:true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            sameSite: 'lax',
            secure: false,
            maxAge: 1000 * 60 * 60 * 24* 7,
        })
        return { message: 'Token renovado'}
    }

    @Post('logout')
    @ApiOperation({ summary: 'Encerrar sessão e invalidar refresh token' })
    @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token inválido' })
    async lougout(@Req() req: express.Request ,@Res({passthrough: true}) res: express.Response,) {
        const refreshToken = req.cookies?.refreshToken;

        if(refreshToken) await this.authService.logout(refreshToken);
        
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');


        return {message: 'Logout realizado com sucesso'};
    }
}
