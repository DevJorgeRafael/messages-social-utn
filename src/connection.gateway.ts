import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
@Injectable()
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(private readonly authService: AuthService) { }

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
}
