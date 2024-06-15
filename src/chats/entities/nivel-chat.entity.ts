// src/chats/entities/nivel-chat.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chats } from './chats.entity';

@Entity('nivel_chat')
export class NivelChat {
    @PrimaryGeneratedColumn()
    nivel_chat_id: number;

    @Column()
    nivel_chat_nombre: string;

    @OneToMany(() => Chats, chats => chats.nivelChat)
    chats: Chats[];
}
