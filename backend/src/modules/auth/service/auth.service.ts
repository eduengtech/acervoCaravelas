import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/modules/users/service/users.service";
import { TokenService } from "src/modules/token/service/token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(email: string, senha: string) {
    const user = await this.usersService.validateUser(email, senha);

    if (!user) throw new UnauthorizedException("Credenciais inválidas");

    return this.tokenService.generateAndSaveTokens(user);
  }

  async refresh(refreshToken: string) {
    const payload = await this.tokenService.validateAndGetPayload(refreshToken);

    if (!payload) throw new UnauthorizedException("Token inválido ou expirado");

    const user = await this.usersService.findById(payload.sub);

    if (!user) throw new UnauthorizedException("Usuário não encontrado");

    await this.tokenService.deleteRefreshToken(user.id);

    return this.tokenService.generateAndSaveTokens(user);
  }

  async logout(refreshToken: string) {
    const payload = await this.tokenService.validateAndGetPayload(refreshToken);

    if (payload) await this.tokenService.deleteRefreshToken(payload.sub);

    return { message: "Logout realizado com sucesso" };
  }
}
