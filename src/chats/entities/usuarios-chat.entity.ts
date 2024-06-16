import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chats } from './chats.entity';

@Entity()
export class UsuariosChat {
    @PrimaryGeneratedColumn()
    usuarios_chat_id: number;

    @Column()
    usuario_id: number;

    @ManyToOne(() => Chats, chat => chat.usuariosChat)
    @JoinColumn({ name: 'chat_id' })
    chats: Chats;
}
