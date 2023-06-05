import process from 'node:process';

import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { Auth0Service } from '@/app/connectors/auth0/auth0.service';
import { CryptoService } from '@/common/crypto/crypto.service';

@Controller('auth0')
export class Auth0Controller {
  constructor(
    private readonly auth0Service: Auth0Service,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get()
  async getHello(
    @Query('code') code: string,
    @Req() request: Request,
  ): Promise<unknown> {
    const redirectUri = `${request.protocol}://${request.get('Host')}${
      request.originalUrl
    }`;

    const { accessToken } = await this.auth0Service.getTokens(
      code,
      redirectUri,
    );

    const userInfo = await this.auth0Service.getUserInfo(accessToken);
    const hashedUserInfo = await this.cryptoService.hash(
      JSON.stringify(userInfo),
      process.env.SALT as string,
    );

    return {
      userInfo,
      hashedUserInfo,
    };
  }
}
