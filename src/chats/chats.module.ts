import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { TipoChat } from './entities/tipo-chat.entity';
import { NivelChat } from './entities/nivel-chat.entity';
import { UsuarioChat } from './entities/usuarios-chat.entity';
import { Mensaje } from './entities/mensaje.entity';
import { ChatsService } from './services/chats.service';
import { ChatsController } from './controllers/chats.controller';
import { TipoChatService } from './services/tipo-chat.service';
import { NivelChatService } from './services/nivel-chat.service';
import { UsuariosChatService } from './services/usuarios-chat.service';
import { MensajeService } from './services/mensajes.service';
import { TipoChatController } from './controllers/tipo-chat.controller';
import { NivelChatController } from './controllers/nivel-chat.controller';
import { UsuariosChatController } from './controllers/usuarios-chat.controller';
import { MensajesController } from './controllers/mensajes.controller';
import { ChatGateway } from './chat.gateway';
import { ConnectionGateway } from 'src/connection.gateway';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports: [TypeOrmModule.forFeature([
        Chat, TipoChat,
        NivelChat, UsuarioChat,
        Mensaje]),
        AuthModule
    ],
    providers: [
        ChatsService, TipoChatService,
        NivelChatService, UsuariosChatService,
        MensajeService, ChatGateway,
        ConnectionGateway
    ],
    controllers: [ChatsController, TipoChatController,
        NivelChatController, UsuariosChatController,
        MensajesController
    ],
    exports: [MensajeService]
})
export class ChatsModule { }
