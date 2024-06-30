// src/chats/services/usuarios-chat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioChat } from '../entities/usuarios-chat.entity';
import { CreateUsuarioChatDto } from '../dto/create-usuario-chat.dto';

@Injectable()
export class UsuariosChatService {
    constructor(
        @InjectRepository(UsuarioChat)
        private readonly usuariosChatRepository: Repository<UsuarioChat>,
    ) { }

    async create(createUsuarioChatDto: CreateUsuarioChatDto): Promise<UsuarioChat> {
        const newUsuarioChat = this.usuariosChatRepository.create(createUsuarioChatDto);
        return this.usuariosChatRepository.save(newUsuarioChat);
    }

    async findUsersByChatId(chatId: number): Promise<UsuarioChat[]> {
        const usuariosChat = await this.usuariosChatRepository.find({ where: { chat: { chat_id: chatId } } });

        if (!usuariosChat || usuariosChat.length === 0) {
            throw new NotFoundException(`No users found for chat ID ${chatId}`);
        }

        return usuariosChat;
    }
}
