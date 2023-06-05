import { Module } from '@nestjs/common';

import { Auth0Controller } from './auth0/auth0.controller';
// import { OauthModule } from '@/app/oauth/oauth.module';
import { Auth0Resolver } from './auth0/auth0.resolver';
import { Auth0Service } from './auth0/auth0.service';

@Module({
  // imports: [OauthModule],
  providers: [Auth0Resolver, Auth0Service],
  controllers: [Auth0Controller],
})
export class ConnectorsModule {}
