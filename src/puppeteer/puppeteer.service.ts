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
    const demoMessages: AvitoMessage[] = [
      { id: '1', name: 'Анастасия', text: 'Привет!' },
      { id: '2', name: 'Екатерина', text: 'Как дела?' },
      { id: '3', name: 'Мария', text: 'Хорошо, спасибо!' },
    ];    

    for (const msg of demoMessages) {
      const isNew = this.messages.addIfNew(msg.id, msg);
      if (isNew) {
        this.ws.broadcastNewMessage({
          ...msg,
          time: new Date().toISOString(),
          source: 'demo',
        });
      }
    }
  }

  async onModuleDestroy() {
    this.logger.warn('Shutting down demo PuppeteerService...');
    if (this.intervalHandle) clearInterval(this.intervalHandle);
  }
}
