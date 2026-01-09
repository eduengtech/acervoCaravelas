import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ example: 'João da Silva' })
    @IsOptional()
    @IsString({ message: 'O nome deve ser uma string' })
    nome?: string;

    @ApiPropertyOptional({ example: 'joao@email.com' })
    @IsOptional()
    @IsEmail({}, { message: 'O e-mail deve ser válido' })
    email?: string;

    @ApiPropertyOptional({ example: 'novaSenha123' })
    @IsOptional()
    @IsString({ message: 'A senha deve ser uma string' })
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    senha?: string;
}