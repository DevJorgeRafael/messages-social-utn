// src/chats/entities/tipo-chat.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chat } from './chat.entity';

@Entity('tipo_chat')
export class TipoChat {
    @PrimaryGeneratedColumn()
    tipo_chat_id: number;

    @Column()
    tipo_chat_nombre: string;

    @OneToMany(() => Chat, chat => chat.tipoChat)
    chats: Chat[];
}
