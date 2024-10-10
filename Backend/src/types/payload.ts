export interface JWTPayload {
  sub: number;
  username: string;
  accountId: string;
  iat?: string;
  exp?: string;
}
