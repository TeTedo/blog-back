import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { OauthLoginDto } from './dto/oauth-login.dto';
import { OAuthProvider } from './interfaces/oauth-provider.interface';
import { GithubProvider } from './providers/github.provider';
import { AUTH_PROVIDER } from './const/auth-provider.const';

@Injectable()
export class AuthService {
  private providers: Map<string, OAuthProvider>;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly githubProvider: GithubProvider,
  ) {
    this.providers = new Map([[AUTH_PROVIDER.GITHUB, this.githubProvider]]);
  }

  async oauthLogin(oauthLoginDto: OauthLoginDto) {
    const provider = this.providers.get(oauthLoginDto.provider);
    if (!provider) {
      throw new UnauthorizedException('지원하지 않는 OAuth 프로바이더입니다.');
    }

    const oauthAccessToken = await provider.getAccessToken(oauthLoginDto.code);
    const userInfo = await provider.getUserInfo(oauthAccessToken);

    let user = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });

    if (!user) {
      user = this.userRepository.create({
        email: userInfo.email,
        username: userInfo.username,
        avatarUrl: userInfo.avatarUrl,
      });
      await this.userRepository.save(user);
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
