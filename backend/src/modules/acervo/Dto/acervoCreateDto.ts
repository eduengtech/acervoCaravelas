import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID } from "class-validator";

export class CreateItemAcervoDto {
  @ApiProperty({ example: "História de Caravelas" })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: "Um relato detalhado sobre..." })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: "2024-03-20T10:00:00Z", required: false })
  @IsOptional()
  dataCriacao?: Date;

  @ApiProperty({ example: "uuid-do-tipo-item" })
  @IsUUID()
  tipoItemId: string;

  @ApiProperty({ example: "uuid-da-categoria" })
  @IsUUID()
  categoriaId: string;

  @ApiProperty({ example: "uuid-do-autor", required: false })
  @IsOptional()
  @IsUUID()
  autorId?: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  publicado?: boolean;
}
