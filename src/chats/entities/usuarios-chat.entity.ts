import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Chats } from './chats.entity';

@Entity()
export class UsuariosChat {
    @PrimaryGeneratedColumn()
    usuarios_chat_id: number;

    @Column()
    usuario_id: number;

    @ManyToOne(() => Chats, chat => chat.usuariosChat)
    chats: Chats;
}
