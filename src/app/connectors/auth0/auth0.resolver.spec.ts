import { Test, TestingModule } from '@nestjs/testing';

import { Auth0Resolver } from './auth0.resolver';

describe('Auth0Resolver', () => {
  let resolver: Auth0Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth0Resolver],
    }).compile();

    resolver = module.get<Auth0Resolver>(Auth0Resolver);
  });

  test('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
