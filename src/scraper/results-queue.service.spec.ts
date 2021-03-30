import { Test, TestingModule } from '@nestjs/testing';
import { ResultsQueueService } from './results-queue.service';

describe('ResultsQueueService', () => {
  let service: ResultsQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultsQueueService],
    }).compile();

    service = module.get<ResultsQueueService>(ResultsQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
