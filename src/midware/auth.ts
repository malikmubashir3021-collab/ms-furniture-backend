import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'ms-furniture-secret-key-2026'

export interface AuthRequest extends Request {
  userId?: number
}

export function generateToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { userId: number }
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
