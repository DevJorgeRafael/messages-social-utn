// src/auth/auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AcademicoService } from '../academico/academico.service';
import { Estudiante } from '../academico/interfaces/estudiante.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly academicoService: AcademicoService,
    ) { }

    async validateUser(usuario: string, contrasenia: string): Promise<any> {
        const estudiantes = await this.academicoService.getEstudiantes().toPromise();
        const estudiante = estudiantes.data.find(
            (est: Estudiante) => est.est_usuario === usuario,
        );
        if(!estudiante) return { user: null, error: 'Usuario no encontrado'}
        

        if (contrasenia !== estudiante.est_contrasenia) 
            return { user: null, error: 'Contraseña incorrecta'};

        const { est_contrasenia, ...result } = estudiante;
        return { user: result};
    }

    async login(user: any) {
        const payload = { username: user.est_usuario, sub: user.est_id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
