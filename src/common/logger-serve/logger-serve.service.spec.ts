import { HttpAdapterHost } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '@/common/logger/logger.module';

import { LoggerServeService } from './logger-serve.service';

describe('LoggerServeService', () => {
  let service: LoggerServeService;

  beforeEach(async () => {
    const adapterHostMock = {
      httpAdapter: {
        getInstance: jest.fn(() => {
          return {
            use: jest.fn(),
          };
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        {
          provide: HttpAdapterHost,
          useValue: adapterHostMock,
        },
        {
          provide: 'ROUTE',
          useValue: '/logs',
        },
        LoggerServeService,
      ],
    }).compile();

    service = module.get<LoggerServeService>(LoggerServeService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
