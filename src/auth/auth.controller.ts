import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body() loginDto: { usuario: string; contrasenia: string },
        @Res() response: Response
    ) {
        const { user, error } = await this.authService.validateUser(loginDto.usuario, loginDto.contrasenia);

        switch (error) {
            case 'Usuario no encontrado':
                throw new UnauthorizedException('Usuario no encontrado');
            case 'Contraseña incorrecta':
                throw new UnauthorizedException('Contraseña incorrecta');
        }

        if(!user) throw new UnauthorizedException('Credenciales inválidas')

        const token = await this.authService.generateToken(user);
        response.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

        const fullUser = await this.authService.getFullUser(user.est_id);
        return response.json(fullUser);
    }
}
