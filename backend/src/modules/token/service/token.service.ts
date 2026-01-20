import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/service/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "src/modules/auth/interface/jwtPayload";

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAndSaveTokens(user: { id: string; email: string; role: string }) {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: "1d" }),
      this.jwtService.signAsync(payload, { expiresIn: "7d" }),
    ]);

    await this.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async validateAndGetPayload(refreshToken: string): Promise<JwtPayload | null> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

      const savedTokens = await this.prisma.refreshToken.findMany({
        where: { userId: payload.sub },
      });

      for (const record of savedTokens) {
        const isMatch = await bcrypt.compare(refreshToken, record.tokenHash);

        if (isMatch && record.expiresAt > new Date()) {
          return payload;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    try {
      // 1. Decodificamos o token para encontrar o usuário (sub)
      // Usamos 'as unknown as JwtPayload' para evitar o erro de unsafe assignment do ESLint
      const payload = (await this.jwtService.verifyAsync(refreshToken)) as unknown as JwtPayload;

      // 2. Buscamos os tokens desse usuário no banco
      const savedTokens = await this.prisma.refreshToken.findMany({
        where: { userId: payload.sub },
      });

      // 3. Comparamos o hash para deletar o token específico
      for (const record of savedTokens) {
        const isMatch = await bcrypt.compare(refreshToken, record.tokenHash);

        if (isMatch) {
          await this.prisma.refreshToken.delete({
            where: { id: record.id },
          });
        }
      }
    } catch (error: unknown) {
      // Silenciamos o erro se o token já estiver expirado ou inválido ao deletar
      if (error instanceof Error) {
        console.error("Erro ao deletar token:", error.message);
      }
    }
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const tokenHash = await bcrypt.hash(refreshToken, salt);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }
}
