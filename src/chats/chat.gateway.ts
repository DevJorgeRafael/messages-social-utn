import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { MensajeService } from './services/mensajes.service';
import { ConnectionGateway } from '../connection.gateway';

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
        private readonly connectionGateway: ConnectionGateway // Inyectar el ConnectionGateway
    ) { }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(@MessageBody() payload: { mensaje: CreateMensajeDto, chat?: CreateChatDto }): Promise<void> {
        const { mensaje, chat } = payload;
        console.log('Mensaje recibido:', mensaje); // Agrega este log para verificar si el mensaje se recibe
        console.log('Chat recibido:', chat); // Agrega este log para verificar si el chat se recibe
        const newMensaje = await this.mensajeService.create(mensaje, chat);
        console.log('Nuevo mensaje creado:', newMensaje);
        this.connectionGateway.server.emit('messageReceived', newMensaje);
    }


    // Otros métodos para manejar eventos de chat pueden ir aquí
}
