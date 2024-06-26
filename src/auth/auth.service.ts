// src/auth/auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AcademicoService } from '../academico/academico.service';
import { Estudiante } from '../academico/interfaces/estudiante.interface';
import { lastValueFrom } from 'rxjs';
import { Profesor } from 'src/academico/interfaces/profesores.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly academicoService: AcademicoService,
    ) { }

    async validateUser(usuario: string, contrasenia: string): Promise<{ user: any, error?: string }> {
        if(usuario.startsWith('E')) {
            return this.validateEstudiante(usuario, contrasenia);
        } else if(usuario.startsWith('D')) {
            return this.validateDocente(usuario, contrasenia);
        } else {
            return { user: null, error: 'Tipo de usuario no válido'}
        }
    }

    private async validateEstudiante(usuario: string, contrasenia: string): Promise<{user: any, error?: string }> {
        const estudiantes = await lastValueFrom(this.academicoService.getEstudiantes());
        const estudiante = estudiantes.data.find((est: Estudiante) => est.est_usuario === usuario);
        if(!estudiante) return { user: null, error: 'Usuario no encontrado' };

        if(contrasenia !== estudiante.est_contrasenia) 
            return { user: null, error: ' Contraseña incorrecta' }

        const { est_contrasenia, ...result } = estudiante;
        return { user: result };
    }

    private async validateDocente(usuario: string, contrasenia: string): Promise<{ user: any, error?: string }> {
        const profesores = await lastValueFrom(this.academicoService.getProfesores());
        const profesor = profesores.data.find((prof: Profesor) => prof.pr_usuario === usuario);
        if(!profesor) return { user: null, error: 'Usuario no encontrado' };

        if(contrasenia !== profesor.pr_contrasenia) 
            return { user: null, error: 'Contraseña incorrecta' };

        const { pr_contrasenia, ...result } = profesor;
        return { user: result };
    }

    async generateToken(user: any): Promise<string> {
        const payload = { username: user.est_usuario, sub: user.est_id };
        const token = this.jwtService.sign(payload);
        return token;
    }

    async getFullUser(userId: number): Promise<any> {
        const estudianteObservable = this.academicoService.getEstudianteById(userId);
        const estudiante = await lastValueFrom(estudianteObservable);
        console.log(estudiante);
        if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
        return estudiante;
    }
}
