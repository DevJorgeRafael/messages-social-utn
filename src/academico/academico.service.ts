import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { Facultad } from './interfaces/facultad.interface';
import { FacultadDetalle } from './interfaces/facultad-detalle.interface';
import { Carrera } from './interfaces/carrera.interface';
import { CarreraDealle } from './interfaces/carrera-detalle.interface';
import { Nivel } from './interfaces/nivel.interface';
import { NivelDetalle } from './interfaces/nivel-detalle.interface';
import { Profesor } from './interfaces/profesores.interface';
import { ProfesorDetalle } from './interfaces/profesor-detalle.interface';
import { Asignatura } from './interfaces/asignatura.interface';
import { AsignaturaDetalle } from './interfaces/asignatura-detalle.interface';
import { Estudiante } from './interfaces/estudiante.interface';
import { EstudianteDetalle } from './interfaces/estudiante-detalle.interface';
import { Rol } from './interfaces/rol.interface';
import { RolDetalle } from './interfaces/rol-detalle.interface';

@Injectable()
export class AcademicoService {
    private readonly apiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.apiUrl = this.configService.get<string>('API_URL');
    }

    getFacultades(): Observable<AxiosResponse<Facultad[]>> {
        return this.httpService.get(`${this.apiUrl}/facultades`);
    }

    getFacultadById(id: number): Observable<AxiosResponse<FacultadDetalle[]>> {
        return this.httpService.get(`${this.apiUrl}/facultades/${id}`)
    }

    getCarreras(): Observable<AxiosResponse<Carrera[]>> {
        return this.httpService.get(`${this.apiUrl}/carreras`);
    }

    getCarreraById(id: number): Observable<AxiosResponse<CarreraDealle>> {
        return this.httpService.get(`${this.apiUrl}/carreras/${id}`);
    }

    getNiveles(): Observable<AxiosResponse<Nivel[]>> {
        return this.httpService.get(`${this.apiUrl}/niveles`);
    }

    getNivelById(id: number): Observable<AxiosResponse<NivelDetalle>> {
        return this.httpService.get(`${this.apiUrl}/niveles/${id}`);
    }

    getProfesores(): Observable<AxiosResponse<Profesor[]>> {
        return this.httpService.get(`${this.apiUrl}/profesores`)
    }

    getProfesorById(id: number): Observable<AxiosResponse<ProfesorDetalle>> {
        return this.httpService.get(`${this.apiUrl}/profesores/${id}`)
    }

    getAsignaturas(id: number): Observable<AxiosResponse<Asignatura[]>> {
        return this.httpService.get(`${this.apiUrl}/asignaturas`)
    }

    getAsignaturaById(id: number): Observable<AxiosResponse<AsignaturaDetalle>> {
        return this.httpService.get(`${this.apiUrl}/asignaturas/${id}`)
    }

    getEstudiantes(): Observable<AxiosResponse<Estudiante[]>> {
        return this.httpService.get(`${this.apiUrl}/estudiantes`)
    }

    getEstudianteById(id: number): Observable<AxiosResponse<EstudianteDetalle>> {
        return this.httpService.get(`${this.apiUrl}/estudiantes/${id}`)
    }

    getRoles(): Observable<AxiosResponse<Rol[]>> {
        return this.httpService.get(`${this.apiUrl}/roles`)
    }

    getRolById(id: number): Observable<AxiosResponse<RolDetalle>> {
        return this.httpService.get(`${this.apiUrl}/roles/${id}`)
    }
}
