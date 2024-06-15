export class CreateMensajeDto {
    chat_id: number;
    usuario_id: number;
    contenido: string;
    fecha: Date;
    leido: boolean;
}