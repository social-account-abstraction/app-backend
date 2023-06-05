// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import process from 'node:process';

import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import axios from 'axios';

interface TokenPair {
  accessToken: string;
  refreshToken: string | undefined;
}

@ObjectType()
export class UserInfo {
  @Field()
  sub: string;
}

@Injectable()
export class Auth0Service {
  async generateUrl(redirectUri: string): Promise<string> {
    // https://dev-pqvbe3y0djn7ccoa.us.auth0.com/authorize?response_type=code&client_id=iTjLUV8droepK6WGbsgDY5Ikjd6amPMt&redirect_uri=http://localhost:4000/callback&scope=openid%20profile%20email&state=abcd1234&nonce=abcd5678
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const responseType = 'code';
    const scope = 'openid profile email';

    return `https://${domain}/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }

  async getTokens(code: string, redirectUri: string): Promise<TokenPair> {
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    const url = `https://${domain}/oauth/token`;

    const data = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    };

    const response = await axios.post(url, data);

    const { access_token } = response.data;

    return {
      accessToken: access_token,
      refreshToken: undefined,
    };
  }

  async getUserInfo(accessToken: string): Promise<UserInfo> {
    const domain = process.env.AUTH0_DOMAIN;

    const url = `https://${domain}/userinfo`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { sub } = response.data;

    return {
      sub,
    };
  }
}
