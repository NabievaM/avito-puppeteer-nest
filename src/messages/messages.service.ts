import { Injectable, Logger } from '@nestjs/common';

export interface AvitoMessage {
  id: string;
  name: string;
  text: string;
  time?: string;
  source?: string;
}

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);
  private messages: Record<string, AvitoMessage> = {};

  addIfNew(threadId: string, payload: AvitoMessage): boolean {
    const last = this.messages[threadId]?.text;
    if (last === payload.text) {
      return false;
    }
    this.messages[threadId] = payload;
    this.logger.log(`New message saved for ${threadId}`);
    return true;
  }

  all(): AvitoMessage[] {
    return Object.values(this.messages);
  }
}
