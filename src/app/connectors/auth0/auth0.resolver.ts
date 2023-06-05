import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Auth0Service, UserInfo } from '@/app/connectors/auth0/auth0.service';
// import { OauthService } from '@/app/oauth/oauth.service';

@Resolver()
export class Auth0Resolver {
  constructor(
    // private readonly oauthService: OauthService,
    private readonly auth0Service: Auth0Service,
  ) {}

  @Query(() => String, { name: 'generateUrlAuth0' })
  async generateUrl(@Args('redirectUri') redirectUri: string) {
    return await this.auth0Service.generateUrl(redirectUri);
  }

  @Mutation(() => UserInfo, { name: 'getUserInfo' })
  async getUserInfo(
    @Args('code') code: string,
    @Args('redirectUri') redirectUri: string,
  ): Promise<UserInfo> {
    const { accessToken } = await this.auth0Service.getTokens(
      code,
      redirectUri,
    );

    return await this.auth0Service.getUserInfo(accessToken);
  }
}
