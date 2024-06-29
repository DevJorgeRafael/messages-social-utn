import { Asignatura } from "./asignatura.interface";
import { Rol } from "./rol.interface";

export interface ProfesorDetalle {
    profesor: {
        pr_id: number;
        pr_nombre: string;
        pr_apellido: string;
        pr_email: string;
        pr_contrasenia?: string;
        pr_usuario: string;
    }
    asignaturas: Asignatura[];
    roles: Rol[];
}