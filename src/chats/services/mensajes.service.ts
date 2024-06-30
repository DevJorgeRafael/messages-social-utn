import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from '../entities/mensaje.entity';
import { CreateMensajeDto } from '../dto/create-mensaje.dto';
import { ChatsService } from './chats.service';
import { CreateChatDto } from '../dto/create-chat.dto';

@Injectable()
export class MensajeService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
        private readonly chatsService: ChatsService,
    ) { }

    async create(createMensajeDto: CreateMensajeDto, createChatDto?: CreateChatDto): Promise<Mensaje> {
        let chatId = createMensajeDto.chat_id;

        if (!chatId && createChatDto) {
            const chat = await this.chatsService.create(createChatDto);
            chatId = chat.chat_id;
        }

        const newMensaje = this.mensajeRepository.create({
            ...createMensajeDto,
            chat_id: chatId,
        });

        return this.mensajeRepository.save(newMensaje);
    }

    findAllByChat(chatId: number): Promise<Mensaje[]> {
        return this.mensajeRepository.find({ where: { chat: { chat_id: chatId } } });
    }

    async findOne(id: number): Promise<Mensaje> {
        const mensaje = await this.mensajeRepository.findOne({
            where: { mensaje_id: id },
        });
        if (!mensaje) {
            throw new NotFoundException(`Mensaje with id ${id} not found.`);
        }
        return mensaje;
    }

    async update(id: number, updateMensaje: Partial<CreateMensajeDto>): Promise<Mensaje> {
        const mensaje = await this.findOne(id);
        Object.assign(mensaje, updateMensaje);
        return this.mensajeRepository.save(mensaje);
    }

    async remove(id: number): Promise<void> {
        const mensaje = await this.findOne(id);
        await this.mensajeRepository.remove(mensaje);
    }
}
