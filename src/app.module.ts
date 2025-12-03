import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { WsModule } from './ws/ws.module';
import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PuppeteerModule,
    WsModule,
    MessagesModule,
  ],
  controllers: [AppController], 
})
export class AppModule {}
