// types/jwt-payload.type.ts
export interface JwtPayload {
    sub: string;      // user ID
    email: string;
    role: string;
    iat?: number;     // issued at (optional)
    exp?: number;     // expiration (optional)
}