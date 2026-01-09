import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class RefreshTokenDto {
    @ApiProperty({
        example: 'contato@email.com',
        description: 'Endereço de e-mail do usuário'
    })

    @IsString({ message: 'A senha deve ser uma string' })
    refreshToken: string;
}