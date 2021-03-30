import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class ResultsQueueService {
  private readonly replyQueue: ClientRMQ;

  constructor(private readonly configService: ConfigService) {
    const urls = this.configService
      .get('RMQ_URLS')
      .split(',')
      .map((url) => url.trim());
    this.replyQueue = new ClientRMQ({
      urls,
      noAck: true,
      queueOptions: {
        durable: true,
      },
      queue: this.configService.get('RMQ_QUEUE_RESULT_NAME'),
    });
  }

  public async publishResults(payload: any) {
    await this.replyQueue.send('scrape_result', payload).toPromise();
  }
}
