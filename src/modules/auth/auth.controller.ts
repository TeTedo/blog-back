import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OauthLoginDto } from './dto/oauth-login.dto';
import { OAuthExceptionFilter } from './filters/oauth-exception.filter';

@Controller('/v1/auth')
@UseFilters(OAuthExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async oauthLogin(@Body() oauthLoginDto: OauthLoginDto) {
    return this.authService.oauthLogin(oauthLoginDto);
  }
}
