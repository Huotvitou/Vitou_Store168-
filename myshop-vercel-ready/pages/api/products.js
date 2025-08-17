
import { dbConnect } from '@/lib/db'
import Product from '@/models/Product'
import { seedProducts } from '@/lib/seed'

export default async function handler(req, res) {
  await dbConnect()
  if (req.method === 'GET') {
    const count = await Product.countDocuments()
    if (count === 0) {
      await Product.insertMany(seedProducts)
    }
    const items = await Product.find().sort({ createdAt: -1 }).lean()
    res.json({ ok: true, items })
  } else if (req.method === 'POST') {
    const p = await Product.create(req.body)
    res.json({ ok: true, item: p })
  } else {
    res.status(405).end()
  }
}
