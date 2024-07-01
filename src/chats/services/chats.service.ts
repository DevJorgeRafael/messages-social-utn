import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from '../dto/create-chat.dto';
import { TipoChat } from '../entities/tipo-chat.entity';
import { NivelChat } from '../entities/nivel-chat.entity';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        @InjectRepository(TipoChat)
        private readonly tipoChatRepository: Repository<TipoChat>,
        @InjectRepository(NivelChat)
        private readonly nivelChatRepository: Repository<NivelChat>,
    ) { }

    async create(createChatDto: CreateChatDto): Promise<Chat> {
        const tipoChat = await this.tipoChatRepository.findOne({where: { tipo_chat_id: createChatDto.tipo_chat_id } });
        const nivelChat = await this.nivelChatRepository.findOne({where: { nivel_chat_id: createChatDto.nivel_chat_id } });
        
        const newChat = this.chatRepository.create({
            chat_nombre: createChatDto.chat_nombre,
            tipoChat,
            nivelChat,
        });

        console.log(newChat)
        return this.chatRepository.save(newChat);
    }

    findAll(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    async findOne(id: number): Promise<Chat> {
        const chat = await this.chatRepository.findOne({
            where: { chat_id: id },
        });
        if (!chat) {
            throw new NotFoundException(`Chat with id ${id} not found.`);
        }
        return chat;
    }

    async update(id: number, updateChat: Partial<CreateChatDto>): Promise<Chat> {
        const chat = await this.findOne(id);
        Object.assign(chat, updateChat);
        return this.chatRepository.save(chat);
    }

    async remove(id: number): Promise<void> {
        const chat = await this.findOne(id);
        await this.chatRepository.remove(chat);
    }

    async getChatsByNivel(usuario: string, nivel_chat_id: number): Promise<Chat[]> {
        const chats = await this.chatRepository.find({
            where: { nivelChat: { nivel_chat_id },
            usuariosChat: { usuario }
        },
            relations: ['usuarios'],
        });
        return chats;
    }
}
