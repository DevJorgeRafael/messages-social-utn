import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Chats } from './chats.entity';

@Entity('usuarios_chat')
export class UsuariosChat {
    @PrimaryGeneratedColumn()
    usuarios_chat_id: number;

    @Column()
    usuario_id: number;

    @ManyToOne(() => Chats, chats => chats.usuariosChat)
    chats: Chats;
}
