import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { WsGateway } from '../ws/ws.gateway';
import { MessagesService, AvitoMessage } from '../messages/messages.service';

@Injectable()
export class PuppeteerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PuppeteerService.name);
  private intervalHandle: NodeJS.Timeout | null = null;
  private isChecking = false;

  constructor(
    private readonly ws: WsGateway,
    private readonly messages: MessagesService,
  ) {}

  async onModuleInit() {
    this.logger.log('Starting PuppeteerService in demo mode...');
    this.intervalHandle = setInterval(() => void this.safeCheck(), 5000);
  }

  private async safeCheck() {
    if (this.isChecking) return;
    this.isChecking = true;

    try {
      await this.checkForNewMessages();
    } catch (err) {
      this.logger.error('Demo polling error: ' + (err as Error).message);
    } finally {
      this.isChecking = false;
    }
  }

  private async checkForNewMessages() {
    const names = ['Анастасия', 'Екатерина', 'Мария'];
    const texts = [
      'Привет!',
      'Как дела?',
      'Вы на связи?',
      'Можно задать вопрос?',
      'Спасибо за ответ!',
    ];

    const msg: AvitoMessage = {
      id: Date.now().toString(), // HAR DOIM YANGI
      name: names[Math.floor(Math.random() * names.length)],
      text: texts[Math.floor(Math.random() * texts.length)],
      time: new Date().toISOString(),
      source: 'demo',
    };

    this.ws.broadcastNewMessage(msg);

    this.logger.log(`Demo message sent: ${msg.name}: ${msg.text}`);
  }

  async onModuleDestroy() {
    this.logger.warn('Shutting down demo PuppeteerService...');
    if (this.intervalHandle) clearInterval(this.intervalHandle);
  }
}
