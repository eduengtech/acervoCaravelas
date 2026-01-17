import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/service/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  

  async generateAndSaveTokens(user: { id: string, email: string, role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '1d' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    await this.saveRefreshToken(user.id, refreshToken);

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  /**
   * NOVO: Este método "abre" o token e verifica se ele é válido no banco.
   * Centraliza a lógica para o AuthService ficar limpo.
   */
  async validateAndGetPayload(refreshToken: string) {
    try {
      // 1. Valida a assinatura do JWT
      const payload = await this.jwtService.verifyAsync(refreshToken);

      // 2. Busca todos os hashes de tokens ativos desse usuário no banco
      const savedTokens = await this.prisma.refreshToken.findMany({
        where: { userId: payload.sub },
      });

      // 3. Compara o token enviado com os hashes salvos
      for (const record of savedTokens) {
        const isMatch = await bcrypt.compare(refreshToken, record.tokenHash);
        
        // Se bater e não estiver expirado, o token é legítimo
        if (isMatch && record.expiresAt > new Date()) {
          return payload; 
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  async deleteRefreshToken(userId: string) {
    return this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  private async saveRefreshToken(userId: string, token: string) {
    const tokenHash = await bcrypt.hash(token, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt,
      },
    });
  }
}