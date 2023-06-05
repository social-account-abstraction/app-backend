import { Controller, Get, Query } from '@nestjs/common';

@Controller('auth0')
export class Auth0Controller {
  @Get()
  getHello(@Query('code') code: string): string {
    return `Hello World! ${code}`;
  }
}
