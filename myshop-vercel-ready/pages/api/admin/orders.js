
import { dbConnect } from '@/lib/db'
import Order from '@/models/Order'
import { getUserFromReq } from '@/lib/auth'

export default async function handler(req, res) {
  await dbConnect()
  const user = getUserFromReq(req)
  if (!user || user.role !== 'admin') return res.json({ ok: false, message: 'Admin only' })
  if (req.method === 'GET') {
    const items = await Order.find().sort({ createdAt: -1 }).lean()
    return res.json({ ok: true, items })
  } else if (req.method === 'PUT') {
    const { id, status } = req.body
    await Order.findByIdAndUpdate(id, { status })
    return res.json({ ok: true })
  }
  res.status(405).end()
}
