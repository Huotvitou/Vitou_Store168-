
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60*60*24*7
  }));
}

export function getUserFromReq(req) {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    if (!cookies.token) return null;
    const user = jwt.verify(cookies.token, process.env.JWT_SECRET);
    return user;
  } catch (e) {
    return null;
  }
}
