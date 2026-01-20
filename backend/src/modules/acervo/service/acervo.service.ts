import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/service/prisma.service";
import { CreateItemAcervoDto } from "../Dto/acervoCreateDto";

@Injectable()
export class AcervoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateItemAcervoDto, userId: string) {
    return this.prisma.itensAcervo.create({
      data: {
        ...dto,
        criadoPorId: userId,
      },
      include: {
        categoria: true,
        tipoItem: true,
        autor: true,
      },
    });
  }

  async getRecent() {
    return this.prisma.itensAcervo.findMany({
      take: 5,
      orderBy: { criadoEm: "desc" },
      include: {
        categoria: { select: { nome: true } },
        tipoItem: { select: { nome: true } },
      },
    });
  }
}
