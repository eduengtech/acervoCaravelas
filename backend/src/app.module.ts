import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { TokenModule } from "./modules/token/token.module";
import { AcervoModule } from "./modules/acervo/acervo.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
    TokenModule,
    AcervoModule,
  ],
})
export class AppModule {}
