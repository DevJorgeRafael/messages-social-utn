import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { MensajeService } from './services/mensajes.service';
import { ConnectionGateway } from '../connection.gateway';
import { ChatsService } from './services/chats.service';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(
        private readonly mensajeService: MensajeService,
        private readonly connectionGateway: ConnectionGateway,
        private readonly chatService: ChatsService,
    ) { }

    @SubscribeMessage('SendMessage')
    async handleSendMessage(@MessageBody() payload: { mensaje: CreateMensajeDto, chat?: CreateChatDto }): Promise<void> {
        const { mensaje, chat } = payload;
        console.log('Chat recibido:', chat); // Agrega este log para verificar si el chat se recibe
        const newMensaje = await this.mensajeService.create(mensaje, chat);
        console.log('Nuevo mensaje creado:', newMensaje);
        this.connectionGateway.server.emit('messageReceived', newMensaje);
    }

    @SubscribeMessage('GetAcademicChats')
    async handleGetAcademicChats(@MessageBody() payload: { userId: number }): Promise<void> {
        const chats = await this.chatService;
    }

}
