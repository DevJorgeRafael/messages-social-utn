import { Asignatura } from "./asignatura.interface";
import { Rol } from "./rol.interface";

export interface ProfesorDetalle {
    profesor: {
        pr_id: number;
        pr_nombre: string;
        pr_apellido: string;
    }
    asignaturas: Asignatura[];
    roles: Rol[];
}