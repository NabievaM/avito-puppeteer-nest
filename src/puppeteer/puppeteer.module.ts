import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { WsModule } from '../ws/ws.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [WsModule, MessagesModule],
  providers: [PuppeteerService],
})
export class PuppeteerModule {}
