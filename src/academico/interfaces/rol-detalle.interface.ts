import { Profesor } from "./profesores.interface";

export interface RolDetalle {
    rol: {
        ro_id: number;
        ro_nombre: string;
    }
    profesores: Profesor[];
}