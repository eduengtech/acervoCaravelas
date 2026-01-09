import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class LoginDto {
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
        senha: string;
    
}