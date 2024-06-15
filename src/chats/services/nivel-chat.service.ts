import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NivelChat } from '../entities/nivel-chat.entity';
import { CreateNivelChatDto } from '../dto/create-nivel-chat.dto';

@Injectable()
export class NivelChatService {
    constructor(
        @InjectRepository(NivelChat)
        private readonly nivelChatRepository: Repository<NivelChat>,
    ) { }

    async create(createNivelChatDto: CreateNivelChatDto): Promise<NivelChat> {
        const newNivelChat = this.nivelChatRepository.create(createNivelChatDto);
        return this.nivelChatRepository.save(newNivelChat);
    }

    findAll(): Promise<NivelChat[]> {
        return this.nivelChatRepository.find();
    }

    async findOne(id: number): Promise<NivelChat> {
        const nivelChat = await this.nivelChatRepository.findOne({
            where: { nivel_chat_id: id },
        });
        if (!nivelChat) {
            throw new NotFoundException(`NivelChat with id ${id} not found.`);
        }
        return nivelChat;
    }

    async update(id: number, updateNivelChat: Partial<CreateNivelChatDto>): Promise<NivelChat> {
        const nivelChat = await this.findOne(id);
        Object.assign(nivelChat, updateNivelChat);
        return this.nivelChatRepository.save(nivelChat);
    }

    async remove(id: number): Promise<void> {
        const nivelChat = await this.findOne(id);
        await this.nivelChatRepository.remove(nivelChat);
    }
}
