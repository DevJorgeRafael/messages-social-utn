import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AcademicoService } from '../academico/academico.service';
import { Estudiante } from '../academico/interfaces/estudiante.interface';
import { lastValueFrom } from 'rxjs';
import { Profesor } from 'src/academico/interfaces/profesores.interface';
import { EstudianteDetalle } from 'src/academico/interfaces/estudiante-detalle.interface';
import { ProfesorDetalle } from 'src/academico/interfaces/profesor-detalle.interface';
import { JwtPayload } from 'src/academico/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly academicoService: AcademicoService,
    ) { }

    async validateUser(usuario: string, contrasenia: string): Promise<{ user: Estudiante | Profesor, error?: { error: string, message: string } }> {
        this.logger.log(`Validating user with usuario: ${usuario}`);
        if (usuario.startsWith('E')) {
            return this.validateEstudiante(usuario, contrasenia);
        } else if (usuario.startsWith('D')) {
            return this.validateDocente(usuario, contrasenia);
        } else {
            return { user: null, error: { error: 'usuario', message: 'Tipo de usuario no válido' } }
        }
    }

    private async validateEstudiante(usuario: string, contrasenia: string): Promise<{ user: Estudiante, error?: { error: string, message: string } }> {
        this.logger.log(`Validating estudiante with usuario: ${usuario}`);
        const estudiantes = await lastValueFrom(this.academicoService.getEstudiantes());
        this.logger.log(`Fetched estudiantes: ${JSON.stringify(estudiantes.data)}`);
        const estudiante = estudiantes.data.find((est: Estudiante) => est.est_usuario === usuario);
        if (!estudiante) {
            this.logger.error(`Estudiante not found: ${usuario}`);
            return { user: null, error: { error: 'usuario', message: 'Usuario no encontrado' } };
        }

        if (contrasenia !== estudiante.est_contrasenia) {
            this.logger.error(`Invalid password for estudiante: ${usuario}`);
            return { user: null, error: { error: 'contrasenia', message: 'Contraseña incorrecta' } }
        }

        const { est_contrasenia, ...result } = estudiante;
        return { user: result };
    }

    private async validateDocente(usuario: string, contrasenia: string): Promise<{ user: Profesor, error?: { error: string, message: string } }> {
        this.logger.log(`Validating docente with usuario: ${usuario}`);
        const profesores = await lastValueFrom(this.academicoService.getProfesores());
        this.logger.log(`Fetched profesores: ${JSON.stringify(profesores.data)}`);
        const profesor = profesores.data.find((prof: Profesor) => prof.pr_usuario === usuario);
        if (!profesor) {
            this.logger.error(`Profesor not found: ${usuario}`);
            return { user: null, error: { error: 'usuario', message: 'Usuario no encontrado' } };
        }

        if (contrasenia !== profesor.pr_contrasenia) {
            this.logger.error(`Invalid password for profesor: ${usuario}`);
            return { user: null, error: { error: 'contrasenia', message: 'Contraseña incorrecta' } };
        }

        const { pr_contrasenia, ...result } = profesor;
        return { user: result };
    }

    async generateToken(user: Estudiante | Profesor): Promise<string> {
        let payload;

        if ('est_usuario' in user) {
            // Caso de Estudiante
            payload = { username: user.est_usuario, sub: user.est_id };
        } else if ('pr_usuario' in user) {
            // Caso de Profesor
            payload = { username: user.pr_usuario, sub: user.pr_id };
        } else {
            throw new Error('Tipo de usuario no válido');
        }

        return new Promise((resolve, reject) => {
            try {
                const token = this.jwtService.sign(payload, { expiresIn: '1h' });
                resolve(token);
            } catch (err) {
                reject(err);
            }
        });
    }

    async getFullUser(userId: number, userType: 'E' | 'D'): Promise<EstudianteDetalle | ProfesorDetalle> {
        if (userType === 'E') {
            const estudianteObservable = this.academicoService.getEstudianteById(userId);
            const estudiante = await lastValueFrom(estudianteObservable);
            if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

            const { est_contrasenia, ...estudianteSinContrasenia } = estudiante.estudiante;
            return { ...estudiante, estudiante: estudianteSinContrasenia } as EstudianteDetalle;
        } else if (userType === 'D') {
            const profesorObservable = this.academicoService.getProfesorById(userId);
            const profesor = await lastValueFrom(profesorObservable);
            if (!profesor) throw new NotFoundException('Profesor no encontrado');

            const { pr_contrasenia, ...profesorSinContrasenia } = profesor.profesor;
            return { ...profesor, profesor: profesorSinContrasenia } as ProfesorDetalle;
        }
        throw new NotFoundException('Tipo de usuario no válido');
    }

    async verifyToken(token: string): Promise<JwtPayload> {
        try {
            return this.jwtService.verify<JwtPayload>(token)
        } catch (error) {
            throw new Error('Token inválido')
        }
    }
}
