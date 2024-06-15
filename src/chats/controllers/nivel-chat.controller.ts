import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { NivelChatService } from '../services/nivel-chat.service';
import { CreateNivelChatDto } from '../dto/create-nivel-chat.dto';

@Controller('nivel-chat')
export class NivelChatController {
    constructor(private readonly nivelChatService: NivelChatService) { }

    @Get()
    findAll() {
        return this.nivelChatService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.nivelChatService.findOne(id);
    }

    @Post()
    create(@Body() createNivelChatDto: CreateNivelChatDto) {
        return this.nivelChatService.create(createNivelChatDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateNivelChatDto: Partial<CreateNivelChatDto>) {
        return this.nivelChatService.update(id, updateNivelChatDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.nivelChatService.remove(id);
    }
}
