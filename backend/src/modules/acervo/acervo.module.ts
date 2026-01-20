import { Module } from "@nestjs/common";
import { AcervoController } from "./controllers/acervo.controller";
import { AcervoService } from "./service/acervo.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AutorController } from "./controllers/autor.controller";
import { CategoriaController } from "./controllers/categoria.controller";
import { AutorService } from "./service/autor.service";
import { CategoriaService } from "./service/categoria.service";

@Module({
  imports: [PrismaModule],
  controllers: [AcervoController, CategoriaController, AutorController],
  providers: [AcervoService, CategoriaService, AutorService],
})
export class AcervoModule {}
