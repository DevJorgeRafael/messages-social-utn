import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: { usuario: string; contrasenia: string }) {
        const { user, error } = await this.authService.validateUser(loginDto.usuario, loginDto.contrasenia);

        switch (error) {
            case 'Usuario no encontrado':
                throw new UnauthorizedException('Usuario no encontrado');
            case 'Contraseña incorrecta':
                throw new UnauthorizedException('Contraseña incorrecta');
        }

        if(!user) throw new UnauthorizedException('Credenciales inálidas')
        
        return this.authService.login(user);
    }
}
