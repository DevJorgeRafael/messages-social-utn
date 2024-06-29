import { Asignatura } from "./asignatura.interface";

export interface EstudianteDetalle {
    estudiante: {
        est_id: number;
        est_nombre: string;
        est_apellido: string;
        est_email: string;
        est_contrasenia?: string;
        est_usuario: string;
    }
    nivel: {
        ni_id: number;
        ni_nivel: string;
    }
    asignaturas: Asignatura[];
}