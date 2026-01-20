import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TokenService } from "../token/service/token.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
