
import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { signToken, setAuthCookie } from '@/lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  await dbConnect()
  // ensure default admin
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    let admin = await User.findOne({ email: process.env.ADMIN_EMAIL })
    if (!admin) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
      admin = await User.create({ name: 'Admin', email: process.env.ADMIN_EMAIL, password: hash, role: 'admin' })
    }
  }
  const u = await User.findOne({ email, role: 'admin' })
  if (!u) return res.json({ ok: false, message: 'Admin មិនត្រឹមត្រូវ' })
  const ok = await bcrypt.compare(password, u.password)
  if (!ok) return res.json({ ok: false, message: 'Password ខុស' })
  const token = signToken({ id: u._id, email: u.email, role: u.role })
  setAuthCookie(res, token)
  res.json({ ok: true })
}
