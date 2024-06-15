import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoChat } from '../entities/tipo-chat.entity';
import { CreateTipoChatDto } from '../dto/create-tipo-chat.dto';

@Injectable()
export class TipoChatService {
    constructor(
        @InjectRepository(TipoChat)
        private readonly tipoChatRepository: Repository<TipoChat>,
    ) { }

    async create(createTipoChatDto: CreateTipoChatDto): Promise<TipoChat> {
        const newTipoChat = this.tipoChatRepository.create(createTipoChatDto);
        return this.tipoChatRepository.save(newTipoChat);
    }

    findAll(): Promise<TipoChat[]> {
        return this.tipoChatRepository.find();
    }

    async findOne(id: number): Promise<TipoChat> {
        const tipoChat = await this.tipoChatRepository.findOne({
            where: { tipo_chat_id: id },
        });
        if (!tipoChat) {
            throw new NotFoundException(`TipoChat with id ${id} not found.`);
        }
        return tipoChat;
    }

    async update(id: number, updateTipoChat: Partial<CreateTipoChatDto>): Promise<TipoChat> {
        const tipoChat = await this.findOne(id);
        Object.assign(tipoChat, updateTipoChat);
        return this.tipoChatRepository.save(tipoChat);
    }

    async remove(id: number): Promise<void> {
        const tipoChat = await this.findOne(id);
        await this.tipoChatRepository.remove(tipoChat);
    }
}
