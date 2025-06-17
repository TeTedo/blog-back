export interface OAuthUser {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  provider: string;
  providerId: string;
  rawData?: Record<string, any>;
}

export interface OAuthProvider {
  getAccessToken(code: string): Promise<string>;
  getUserInfo(token: string): Promise<OAuthUser>;
}
