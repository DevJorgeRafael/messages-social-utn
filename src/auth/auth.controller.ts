import { Controller, Post, Body, UnauthorizedException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtPayload } from 'src/academico/interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body() loginDto: { usuario: string; contrasenia: string },
        @Res() response: Response
    ) {
        const { user, error } = await this.authService.validateUser(loginDto.usuario, loginDto.contrasenia);

        if(error) {
            throw new UnauthorizedException(error);
        }

        if(!user) throw new UnauthorizedException('Credenciales inválidas')

        const token = await this.authService.generateToken(user);
        response.cookie('access_token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
            path: '/', // in all routes
        });

        let fullUser;
        if ('est_id' in user) {
            fullUser = await this.authService.getFullUser(user.est_id, 'E');
        } else if ('pr_id' in user) {
            fullUser = await this.authService.getFullUser(user.pr_id, 'D');
        }

        if (!fullUser) {
            throw new UnauthorizedException('Usuario completo no encontrado');
        }
        
        return response.json(fullUser);
    }

    @Post('verify-token')
    async verifyToken (@Req() request: Request, @Res() response: Response) {
        const token = request.cookies['access_token'];

        if (!token) {
            return response.status(401).json({ message: 'No autorizado'})
        }

        try {
            const user: JwtPayload = await this.authService.verifyToken(token);

            let fullUser;
            if (user.username.startsWith('E')) {
                fullUser = await this.authService.getFullUser(user.sub, 'E');
            } else if (user.username.startsWith('D')) {
                fullUser = await this.authService.getFullUser(user.sub, 'D');
            }

            if (!fullUser) {
                return response.status(401).json({ message: 'No autorizado' })
            }

            return response.json(fullUser);
        } catch (error) {
            return response.status(401).json({ message: 'No autorizado' })
        }
    }
}
