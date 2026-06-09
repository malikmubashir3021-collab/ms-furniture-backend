import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import { getDb } from '../db.js'
import { generateToken } from '../midware/auth.js'

const router = Router()

router.post('/login', async (req, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }
  const db = await getDb()
  const stmt = db.prepare('SELECT id, username, password FROM users WHERE username = ?')
  stmt.bind([username])
  let user: { id: number; username: string; password: string } | null = null
  if (stmt.step()) {
    const [id, uname, pw] = stmt.get()
    user = { id: id as number, username: uname as string, password: pw as string }
  }
  stmt.free()
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const match = bcrypt.compareSync(password, user.password)
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = generateToken(user.id)
  res.json({ token, username: user.username })
})

export default router
