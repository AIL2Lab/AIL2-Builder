import 'server-only';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const SECRET_KEY = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(SECRET_KEY);

export interface UserPayload extends JWTPayload {
  userId: string;
  address: string;
}

/**
 * 签发 Token
 */
export async function signToken(payload: UserPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // Header 模式通常过期时间较短，配合 Refresh Token 使用（这里简化为2小时）
    .sign(key);
}

/**
 * 验证 Token
 */
export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as UserPayload;
  } catch (error) {
    return null;
  }
}