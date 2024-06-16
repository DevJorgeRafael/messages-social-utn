import { Nivel } from "./nivel.interface";

export interface CarreraDealle {
    carrera: {
        ca_id: number;
        fa_id: number;
        ca_nombre: string;
    }
    niveles: Nivel[];
}