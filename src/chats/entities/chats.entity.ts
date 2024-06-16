// src/chats/entities/chats.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TipoChat } from './tipo-chat.entity';
import { NivelChat } from './nivel-chat.entity';
import { UsuariosChat } from './usuarios-chat.entity';
import { Mensajes } from './mensajes.entity';

@Entity('chats')
export class Chats {
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

    @OneToMany(() => UsuariosChat, usuariosChat => usuariosChat.chats)
    usuariosChat: UsuariosChat[];

    @OneToMany(() => Mensajes, mensajes => mensajes.chats)
    mensajes: Mensajes[];
}
