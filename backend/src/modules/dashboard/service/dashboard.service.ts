import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/service/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [acervos, categorias, autores, usuarios] = await Promise.all([
      this.prisma.itensAcervo.count(),
      this.prisma.categoria.count(),
      this.prisma.autor.count(),
      this.prisma.user.count(),
    ]);

    return {
      totalAcervos: acervos,
      totalCategorias: categorias,
      totalAutores: autores,
      totalUsuarios: usuarios,
    };
  }

  async getPopularCategories() {
    const categories = await this.prisma.categoria.findMany({
      include: {
        _count: {
          select: { itens: true },
        },
      },
      take: 5,
    });

    return categories.map((cat) => ({
      name: cat.nome,
      value: cat._count.itens,
    }));
  }
}
