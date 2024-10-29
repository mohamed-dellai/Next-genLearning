import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = 'HS256';

export async function generateToken(user) {
  return new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('1h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}
