import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TipoChatService } from '../services/tipo-chat.service';
import { CreateTipoChatDto } from '../dto/create-tipo-chat.dto';

@Controller('tipo-chat')
export class TipoChatController {
    constructor(private readonly tipoChatService: TipoChatService) { }

    @Get()
    findAll() {
        return this.tipoChatService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tipoChatService.findOne(id);
    }

    @Post()
    create(@Body() createTipoChatDto: CreateTipoChatDto) {
        return this.tipoChatService.create(createTipoChatDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTipoChatDto: Partial<CreateTipoChatDto>) {
        return this.tipoChatService.update(id, updateTipoChatDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tipoChatService.remove(id);
    }
}
