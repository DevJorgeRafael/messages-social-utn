import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMensajeDto } from './chats/dto/create-mensaje.dto';
import { CreateChatDto } from './chats/dto/create-chat.dto';
import { MensajeService } from './chats/services/mensajes.service';
import { AuthService } from './auth/auth.service';
import { EstudianteDetalle } from './academico/interfaces/estudiante-detalle.interface';
import { ProfesorDetalle } from './academico/interfaces/profesor-detalle.interface';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private readonly mensajeService: MensajeService,
        private readonly authService: AuthService,
    ) { }

    async handleConnection(client: Socket) {
        const token = client.handshake.query.token as string;

        if (!token) {
            console.log('No se proporcionó un token en la conexión WebSocket');
            client.disconnect(true);
            return;
        }

        try {
            const user = await this.authService.getUserFromToken(token);
            client.data.user = user; // Guardamos el usuario en los datos del cliente para uso futuro
            console.log(user)
            let welcomeMessage = '';
            if ('estudiante' in user) {
                welcomeMessage = `¡Bienvenido ${user.estudiante.est_nombre}!`;
                console.log(`Estudiante conectado: ${user.estudiante.est_usuario}`);
            } else if ('profesor' in user) {
                welcomeMessage = `¡Bienvenido ${user.profesor.pr_nombre}!`;
                console.log(`Docente conectado: ${user.profesor.pr_usuario}`);
            }

            // Enviar un mensaje de bienvenida
            client.emit('connected', welcomeMessage);

        } catch (error) {
            console.error(`Error al conectar usuario: ${error.message}`);
            client.disconnect(true);
        }
    }

    handleDisconnect(client: Socket) {
        if (client.data.user) {
            const userId = 'estudiante' in client.data.user ? client.data.user.estudiante.est_id : client.data.user.profesor.pr_id;
            console.log(`Usuario desconectado: ${userId}`);
        }
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: { mensaje: CreateMensajeDto, chat?: CreateChatDto }): Promise<void> {
        const { mensaje, chat } = payload;
        const newMensaje = await this.mensajeService.create(mensaje, chat);
        console.log(newMensaje)
        this.server.emit('messageReceived', newMensaje);
    }
}
