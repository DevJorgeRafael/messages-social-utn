// src/chats/services/tipo-chat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoChat } from '../entities/tipo-chat.entity';

@Injectable()
export class TipoChatService {
    constructor(
        @InjectRepository(TipoChat)
        private tipoChatRepository: Repository<TipoChat>,
    ) { }

    findAll() {
        return this.tipoChatRepository.find();
    }

    async findById(id: number): Promise<TipoChat> {
        const tipoChat = await this.tipoChatRepository.findOne({
            where: { tipo_chat_id: id }
        });
        if (!tipoChat) {
            throw new NotFoundException(`TipoChat with id ${id} not found`);
        }
        return tipoChat;
    }

    create(tipoChat: Partial<TipoChat>) {
        const newTipoChat = this.tipoChatRepository.create(tipoChat);
        return this.tipoChatRepository.save(newTipoChat);
    }

    update(id: number, tipoChat: Partial<TipoChat>) {
        return this.tipoChatRepository.update(id, tipoChat);
    }

    delete(id: number) {
        return this.tipoChatRepository.delete(id);
    }
}
