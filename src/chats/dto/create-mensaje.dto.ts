export class CreateMensajeDto {
    chat_id: number;
    usuario: string;
    contenido: string;
    fecha: Date;
    leido: boolean;
}