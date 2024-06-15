import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensajes } from '../entities/mensajes.entity';
import { CreateMensajeDto } from '../dto/create-mensaje.dto';

@Injectable()
export class MensajeService {
    constructor(
        @InjectRepository(Mensajes)
        private readonly mensajeRepository: Repository<Mensajes>,
    ) { }

    async create(createMensajeDto: CreateMensajeDto): Promise<Mensajes> {
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
