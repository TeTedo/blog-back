import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AUTH_PROVIDER } from '../const/auth-provider.const';
export class OauthLoginDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(AUTH_PROVIDER)
  @IsNotEmpty()
  provider: AUTH_PROVIDER;
}
