import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// New deployments should set ADMIN_PASSWORD_HASH to a bcrypt hash, generated
// once on a trusted host:
//   node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"
// The hashed form is what gets stored on the server; the plaintext never
// touches disk. ADMIN_PASSWORD (plaintext) is still honored for backward
// compatibility but logs a warning every time it's used so operators get
// nudged to migrate.
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const loginSchema = z.object({
  password: z.string().min(1).max(256),
});

async function passwordMatches(submitted: string): Promise<boolean> {
  if (ADMIN_PASSWORD_HASH) {
    return bcrypt.compare(submitted, ADMIN_PASSWORD_HASH);
  }
  if (ADMIN_PASSWORD) {
    console.warn(
      'ADMIN_PASSWORD is set in plaintext; migrate to ADMIN_PASSWORD_HASH (bcrypt) — this fallback will be removed.'
    );
    return submitted === ADMIN_PASSWORD;
  }
  return false;
}

export async function POST(request: Request) {
  if (!ADMIN_PASSWORD_HASH && !ADMIN_PASSWORD) {
    console.error('Neither ADMIN_PASSWORD_HASH nor ADMIN_PASSWORD is set');
    return NextResponse.json({ error: '服务器配置错误' }, { status: 500 });
  }

  let parsed;
  try {
    const body = await request.json();
    parsed = loginSchema.safeParse(body);
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json({ error: '密码格式错误' }, { status: 400 });
  }

  const ok = await passwordMatches(parsed.data.password);
  if (!ok) {
    // Generic failure message — don't tell the attacker whether the password
    // was wrong, the env was misconfigured, or the hash format is unexpected.
    return NextResponse.json({ error: '密码错误' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_session');
  return response;
}
