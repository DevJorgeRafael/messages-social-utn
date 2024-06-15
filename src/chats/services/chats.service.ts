import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chats } from '../entities/chats.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from '../dto/create-chat.dto';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chats)
        private readonly chatRepository: Repository<Chats>,
    ) { }

    async create(createChatDto: CreateChatDto): Promise<Chats> {
        const newChat = this.chatRepository.create(createChatDto);
        return this.chatRepository.save(newChat);
    }

    findAll(): Promise<Chats[]> {
        return this.chatRepository.find();
    }

    async findOne(id: number): Promise<Chats> {
        const chat = await this.chatRepository.findOne({
            where: { chat_id: id },
        });
        if (!chat) {
            throw new NotFoundException(`Chat with id ${id} not found.`);
        }
        return chat;
    }

    async update(id: number, updateChat: Partial<CreateChatDto>): Promise<Chats> {
        const chat = await this.findOne(id);
        Object.assign(chat, updateChat);
        return this.chatRepository.save(chat);
    }

    async remove(id: number): Promise<void> {
        const chat = await this.findOne(id);
        await this.chatRepository.remove(chat);
    }
}
