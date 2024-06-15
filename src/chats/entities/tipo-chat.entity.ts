// src/chats/entities/tipo-chat.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chats } from './chats.entity';

@Entity('tipo_chat')
export class TipoChat {
    @PrimaryGeneratedColumn()
    tipo_chat_id: number;

    @Column()
    tipo_chat_nombre: string;

    @OneToMany(() => Chats, chats => chats.tipoChat)
    chats: Chats[];
}
