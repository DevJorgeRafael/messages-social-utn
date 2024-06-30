import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chat } from './chat.entity';

@Entity('mensajes')
export class Mensaje {
    @PrimaryGeneratedColumn()
    mensaje_id: number;

    @Column()
    chat_id: number;

    @Column()
    contenido: string;

    @Column()
    fecha: Date;

    @Column()
    usuario: string;

    @Column()
    leido: boolean;

    @ManyToOne(() => Chat, chat => chat.mensajes)
    @JoinColumn({ name: 'chat_id' })
    chat: Chat;
}
