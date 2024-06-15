// src/chats/services/usuarios-chat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosChat } from '../entities/usuarios-chat.entity';
import { CreateUsuarioChatDto } from '../dto/create-usuario-chat.dto';

@Injectable()
export class UsuariosChatService {
    constructor(
        @InjectRepository(UsuariosChat)
        private readonly usuariosChatRepository: Repository<UsuariosChat>,
    ) { }

    async create(createUsuariosChatDto: CreateUsuarioChatDto): Promise<UsuariosChat> {
        const newUsuariosChat = this.usuariosChatRepository.create(createUsuariosChatDto);
        return this.usuariosChatRepository.save(newUsuariosChat);
    }

    findAll(): Promise<UsuariosChat[]> {
        return this.usuariosChatRepository.find();
    }

    async findOne(id: number): Promise<UsuariosChat> {
        const usuariosChat = await this.usuariosChatRepository.findOne({
            where: { usuarios_chat_id: id },
        });
        if (!usuariosChat) {
            throw new NotFoundException(`UsuariosChat with id ${id} not found.`);
        }
        return usuariosChat;
    }

    async update(id: number, updateUsuariosChat: Partial<CreateUsuarioChatDto>): Promise<UsuariosChat> {
        const usuariosChat = await this.findOne(id);
        Object.assign(usuariosChat, updateUsuariosChat);
        return this.usuariosChatRepository.save(usuariosChat);
    }

    async remove(id: number): Promise<void> {
        const usuariosChat = await this.findOne(id);
        await this.usuariosChatRepository.remove(usuariosChat);
    }
}
