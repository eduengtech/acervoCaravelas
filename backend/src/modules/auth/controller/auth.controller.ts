import { Body, Controller, Header, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/createAuthDto';
import { RefreshTokenDto } from '../dto/refreshTokenDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {};

    @Post('login')
    @ApiOperation({ summary: 'Autenticação do usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    login(@Body() data: LoginDto) {
        return this.authService.login(data.email, data.senha);
    }
    
    @Post('refresh')
    @ApiOperation({ summary: 'Renovar access token usando o refresh token' })
    @ApiResponse({ status: 200, description: 'Tokens renovados com sucesso' })
    @ApiResponse({ status: 401, description: 'Refresh Token inválido ou expirado' })
    async refresh(@Headers('authorization') authHeader: string ) {

        if (!authHeader) throw new UnauthorizedException ('Token não fornecido');

        const token = authHeader.replace('Bearer', '')

        return this.authService.refresh(token)
    }

    @Post('logout')
    @ApiOperation({ summary: 'Encerrar sessão e invalidar refresh token' })
    @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token inválido' })
    async lougout(@Headers('authorization') authHeader: string ) {

        if(!authHeader) throw new UnauthorizedException('Token não fornecido');

        const token = authHeader.replace('Bearer ', '');

        return this.authService.logout(token);
    }
}
