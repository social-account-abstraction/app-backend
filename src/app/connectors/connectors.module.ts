import { Module } from '@nestjs/common';

import { CryptoModule } from '@/common/crypto/crypto.module';

import { Auth0Controller } from './auth0/auth0.controller';
// import { OauthModule } from '@/app/oauth/oauth.module';
import { Auth0Resolver } from './auth0/auth0.resolver';
import { Auth0Service } from './auth0/auth0.service';

@Module({
  imports: [CryptoModule],
  providers: [Auth0Resolver, Auth0Service],
  controllers: [Auth0Controller],
})
export class ConnectorsModule {}
