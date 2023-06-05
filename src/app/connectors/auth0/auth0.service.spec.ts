import { Test, TestingModule } from '@nestjs/testing';

import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let service: Auth0Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth0Service],
    }).compile();

    service = module.get<Auth0Service>(Auth0Service);
  });

  test('should generate url', () => {
    const url = service.generateUrl('http://localhost:4000/callback');
    console.log(url);

    expect(url).toBeDefined();
  });

  test('should get tokens', async () => {
    const tokens = await service.getTokens(
      'acRVzk-fyXfFYgpboZL15DZ1NFZs9M3fZ1DeKhXw4eyhI',
      'http://localhost:4000/callback',
    );
    console.log(tokens);

    expect(tokens).toBeDefined();
  });

  test('should get user info', async () => {
    const userInfo = await service.getUserInfo(
      'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtcHF2YmUzeTBkam43Y2NvYS51cy5hdXRoMC5jb20vIn0..Bwa9kpjU6KWZ0gR7.6FxqAFn3H4j_i7fw-oyj3-TplG_GH3CQ_Bb5tRWa0ePMhfHcaoWhBbD9XXaDwoYVA4JytYFeoSc_LvqBBqizGg4YnTbWE1zjjmz25hs_E66r60sXoFkH3SjJmr0ZrQPeSW-JnXQrK2l5QNhmlhRox_VdKZ5h7eHLEW-0tkoFV7rKWsNmekLx4sEvb2musjcxHkkU_xC-jVV2sE2SMzUfAI8XXOS1tLTgWU0yad4zcWJvgI6y55v2k8lBhDF1NWWmy7KIVMFhwMSSkMEcTj-tirdJHkN1CIBPMf5aOCtKdxPzPnwQyWgmPk8po4NxOFWzaPnxqPCL8fUp3G4K.1nmfFi9IRN4esSlqs66jGQ',
    );
    console.log(userInfo);

    expect(userInfo).toBeDefined();
  });
});
