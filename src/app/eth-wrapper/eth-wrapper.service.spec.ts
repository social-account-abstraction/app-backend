import { Test, TestingModule } from '@nestjs/testing';

import { EthWrapperService } from './eth-wrapper.service';

describe('EthWrapperService', () => {
  let service: EthWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EthWrapperService],
    }).compile();

    service = module.get<EthWrapperService>(EthWrapperService);
  });

  test('should be work', async () => {
    expect(service).toBeDefined();

    const VALUE = 'Hello World';
    await service.setHelloWorldValue(VALUE);

    const value = await service.getHelloWorldValue();
    expect(value).toBe(VALUE);
  });
});
