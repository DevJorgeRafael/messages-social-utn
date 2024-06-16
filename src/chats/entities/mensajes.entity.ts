import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chats } from './chats.entity';

@Entity('mensajes')
export class Mensajes {
    @PrimaryGeneratedColumn()
    mensaje_id: number;

    @Column()
    chat_id: number;

    @Column()
    contenido: string;

    @Column()
    fecha: Date;

    @Column()
    usuario_id: number;

    @Column()
    leido: boolean;

    @ManyToOne(() => Chats, chats => chats.mensajes)
    @JoinColumn({ name: 'chat_id' }) 
    chats: Chats;
}
