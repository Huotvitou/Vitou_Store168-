
import { dbConnect } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password } = req.body
  await dbConnect()
  const exists = await User.findOne({ email })
  if (exists) return res.json({ ok: false, message: 'Email មានរួចហើយ' })
  const hash = await bcrypt.hash(password, 10)
  const u = await User.create({ name, email, password: hash, role: 'user' })
  res.json({ ok: true, id: u._id })
}
