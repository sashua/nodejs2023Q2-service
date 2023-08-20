export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithUserId extends Request {
  userId: string;
}
