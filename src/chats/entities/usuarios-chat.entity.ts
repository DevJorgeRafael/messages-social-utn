import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chat } from './chat.entity';

@Entity('usuarios_chat')
export class UsuarioChat {
    @PrimaryGeneratedColumn()
    usuarios_chat_id: number;

    @Column()
    usuario_id: number;

    @Column()
    rol: string;

    @ManyToOne(() => Chat, chat => chat.usuariosChat)
    @JoinColumn({ name: 'chat_id' })
    chat: Chat;
}
