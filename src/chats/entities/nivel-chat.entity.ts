// src/chats/entities/nivel-chat.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chat } from './chat.entity';

@Entity('nivel_chat')
export class NivelChat {
    @PrimaryGeneratedColumn()
    nivel_chat_id: number;

    @Column()
    nivel_chat_nombre: string;

    @OneToMany(() => Chat, chat => chat.nivelChat)
    chats: Chat[];
}
