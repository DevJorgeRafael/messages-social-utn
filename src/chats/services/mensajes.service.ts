import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensajes } from '../entities/mensajes.entity';
import { CreateMensajeDto } from '../dto/create-mensaje.dto';
import { ChatsService } from './chats.service';

@Injectable()
export class MensajeService {
    constructor(
        @InjectRepository(Mensajes)
        private readonly mensajeRepository: Repository<Mensajes>,
        private readonly chatsService: ChatsService,
    ) { }

    async create(createMensajeDto: CreateMensajeDto): Promise<Mensajes> {
        // Verificar si el chat existe
        let chat = await this.chatsService.findOne(createMensajeDto.chat_id).catch(() => null);

        // Si no existe, crear el chat
        // if (!chat) {
        //     const createChatDto = {
        //         chat_nombre: `Chat for ${createMensajeDto.chat_id}`, // Define el nombre del chat según tus necesidades
        //         tipo_chat_id: createMensajeDto.tipo_chat_id, // Añade estos campos al DTO si es necesario
        //         nivel_chat_id: createMensajeDto.nivel_chat_id,
        //     };
        //     chat = await this.chatsService.create(createChatDto);
        // }

        // Crear el mensaje
        const newMensaje = this.mensajeRepository.create(createMensajeDto);
        return this.mensajeRepository.save(newMensaje);
    }

    findAll(): Promise<Mensajes[]> {
        return this.mensajeRepository.find();
    }

    async findOne(id: number): Promise<Mensajes> {
        const mensaje = await this.mensajeRepository.findOne({
            where: { mensaje_id: id },
        });
        if (!mensaje) {
            throw new NotFoundException(`Mensaje with id ${id} not found.`);
        }
        return mensaje;
    }

    async update(id: number, updateMensaje: Partial<CreateMensajeDto>): Promise<Mensajes> {
        const mensaje = await this.findOne(id);
        Object.assign(mensaje, updateMensaje);
        return this.mensajeRepository.save(mensaje);
    }

    async remove(id: number): Promise<void> {
        const mensaje = await this.findOne(id);
        await this.mensajeRepository.remove(mensaje);
    }
}
