import { Carrera } from "./carrera.interface";

export interface FacultadDetalle {
    facultad: {
        fa_id: number;
        fa_nombre: string;
    }
    carreras: Carrera[];
}