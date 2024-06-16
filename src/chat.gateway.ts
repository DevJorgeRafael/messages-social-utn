import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMensajeDto } from './chats/dto/create-mensaje.dto';
import { CreateChatDto } from './chats/dto/create-chat.dto';
import { MensajeService } from './chats/services/mensajes.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private readonly mensajeService: MensajeService,
    ) { }

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: { mensaje: CreateMensajeDto, chat?: CreateChatDto }): Promise<void> {
        const { mensaje, chat } = payload;
        const newMensaje = await this.mensajeService.create(mensaje, chat);
        this.server.to(newMensaje.chat_id.toString()).emit('newMessage', newMensaje);
    }
}
