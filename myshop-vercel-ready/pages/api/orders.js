
import { dbConnect } from '@/lib/db'
import Order from '@/models/Order'
import Product from '@/models/Product'
import { getUserFromReq } from '@/lib/auth'

export default async function handler(req, res) {
  await dbConnect()
  if (req.method === 'POST') {
    const user = getUserFromReq(req)
    const { name, phone, items, total, slipUrl } = req.body
    const fixed = []
    for (const it of items || []) {
      const p = await Product.findOne({ title: it.title })
      fixed.push({ productId: p?._id, title: it.title, price: it.price, qty: it.qty })
    }
    const o = await Order.create({
      userId: user?.id || null, name, phone, items: fixed, total, slipUrl
    })
    return res.json({ ok: true, id: o._id })
  }
  if (req.method === 'GET') {
    const user = getUserFromReq(req)
    if (req.query.mine && user) {
      const items = await Order.find({ userId: user.id }).sort({createdAt:-1}).lean()
      return res.json({ ok: true, items })
    }
    return res.json({ ok: false, message: 'Unauthorized' })
  }
  res.status(405).end()
}
