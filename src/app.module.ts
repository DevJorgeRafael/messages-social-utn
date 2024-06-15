import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'postgres',
      password: 'password',
      database: 'test',
      entities: [__dirname + '/../**/*.entity{.ts}'],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
