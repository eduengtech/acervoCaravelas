import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Role } from '@prisma/client';



export class CreateUsersDto{
    @ApiProperty({
        example: 'Luanna Alves',
        description: 'Nome completo do Usuario'
    })
    @IsString({ message:'O nome deve ser uma string'})
    nome: string;

    @ApiProperty({
        example: 'contato@email.com',
        description: 'Endereço de e-mail do usuário'
    })
    @IsEmail({}, {message: 'Email válido'})
    email: string;

    @ApiProperty({
        example: 'senhaSegura123',
        description: 'Senha do usuário (mínimo 8 caracteres)',
    })
    @IsString({ message: 'A senha deve ser uma string' })
    @MinLength(8, {message: 'A senha deve ter no mínimo 8 caracteres'})
    senha: string;

    @ApiProperty({ example: 'EDITOR', enum: Role, description: 'Role do usuário' })
    @IsEnum(Role, { message: 'Role inválida' })
    role: Role;
}