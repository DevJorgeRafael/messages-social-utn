import { Estudiante } from "./estudiante.iterface";
import { Profesor } from "./profesores.interface";

export interface AsignaturaDetalle {
    asignatura: {
        as_id: number;
        as_nombre: string;
        ni_id: number;
        ni_nivel: string;
    }
    profesores: Profesor[];
    estudiantes: Estudiante[];
}