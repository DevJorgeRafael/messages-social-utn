// src/chats/entities/chats.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TipoChat } from './tipo-chat.entity';
import { NivelChat } from './nivel-chat.entity';
import { UsuarioChat } from './usuarios-chat.entity';
import { Mensaje } from './mensaje.entity';

@Entity('chats')
export class Chat {
    @PrimaryGeneratedColumn()
    chat_id: number;

    @Column()
    chat_nombre: string;

    @ManyToOne(() => TipoChat, tipoChat => tipoChat.chats)
    @JoinColumn({ name: 'tipo_chat_id'})
    tipoChat: TipoChat;

    @ManyToOne(() => NivelChat, nivelChat => nivelChat.chats)
    @JoinColumn({ name: 'nivel_chat_id' })
    nivelChat: NivelChat;

    @OneToMany(() => UsuarioChat, usuarioChat => usuarioChat.chat)
    usuariosChat: UsuarioChat[];

    @OneToMany(() => Mensaje, mensaje => mensaje.chat)
    mensajes: Mensaje[];
}
