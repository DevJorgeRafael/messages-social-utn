import { Asignatura } from "./asignatura.interface";

export interface NivelDetalle {
    nivel: {
        ni_id: number;
        ca_id: number;
        ni_nivel: string;
    }
    asignaturas: Asignatura[];
}