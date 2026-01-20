import { ApiProperty } from "@nestjs/swagger";

export class DashboardStatsDto {
  @ApiProperty({ description: "Total de itens no acervo", example: 1256 })
  totalAcervos: number;

  @ApiProperty({ description: "Total de categorias cadastradas", example: 24 })
  totalCategorias: number;

  @ApiProperty({ description: "Total de autores registrados", example: 148 })
  totalAutores: number;

  @ApiProperty({ description: "Total de usuários ativos no sistema", example: 12 })
  totalUsuarios: number;
}
