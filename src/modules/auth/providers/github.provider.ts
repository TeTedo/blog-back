import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import {
  OAuthProvider,
  OAuthUser,
} from '../interfaces/oauth-provider.interface';

interface GithubUserResponse {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

interface GithubEmailResponse {
  email: string;
  primary: boolean;
}

interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

@Injectable()
export class GithubProvider implements OAuthProvider {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly provider = 'github';

  constructor() {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('GitHub OAuth 설정이 누락되었습니다.');
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async getAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post<GithubTokenResponse>(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      return response.data.access_token;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 에러';
      throw new UnauthorizedException(
        `GitHub 액세스 토큰을 가져오는데 실패했습니다: ${errorMessage}`,
      );
    }
  }

  async getUserInfo(token: string): Promise<OAuthUser> {
    try {
      const userResponse = await axios.get<GithubUserResponse>(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const emailResponse = await axios.get<GithubEmailResponse[]>(
        'https://api.github.com/user/emails',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const primaryEmail = emailResponse.data.find(
        (email) => email.primary,
      )?.email;

      if (!primaryEmail) {
        throw new UnauthorizedException(
          'GitHub 이메일 정보를 가져올 수 없습니다.',
        );
      }

      return {
        id: userResponse.data.id.toString(),
        email: primaryEmail,
        username: userResponse.data.login,
        displayName: userResponse.data.name,
        avatarUrl: userResponse.data.avatar_url,
        provider: this.provider,
        providerId: userResponse.data.id.toString(),
        rawData: userResponse.data,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 에러';
      throw new UnauthorizedException(
        `GitHub 사용자 정보를 가져오는데 실패했습니다: ${errorMessage}`,
      );
    }
  }
}
