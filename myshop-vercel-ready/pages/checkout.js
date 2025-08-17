
import { useEffect, useState } from 'react'

export default function Checkout() {
  const [cart, setCart] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [slip, setSlip] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    let slipUrl = ''
    if (slip) {
      try {
        if (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || process.env.CLOUDINARY_UPLOAD_URL) {
          const url = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || process.env.CLOUDINARY_UPLOAD_URL
          const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET
          const fd = new FormData()
          fd.append('file', slip)
          if (preset) fd.append('upload_preset', preset)
          const up = await fetch(url, { method: 'POST', body: fd })
          const j = await up.json()
          slipUrl = j.secure_url || ''
        } else {
          const b64 = await new Promise(res => {
            const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(slip);
          })
          slipUrl = b64
        }
      } catch (err) {}
    }
    const resp = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, items: cart, total, slipUrl })
    })
    const j = await resp.json()
    setLoading(false)
    if (j.ok) {
      localStorage.removeItem('cart')
      alert('បានដាក់បញ្ជាទិញរួច!')
      window.location.href = '/account'
    } else {
      alert(j.message || 'មានបញ្ហា')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">បង់ប្រាក់</h2>
      <div className="mb-4 p-4 border rounded">
        <p className="font-semibold mb-2">ABA QR (Static)</p>
        <img src="/aba-qr-sample.png" alt="ABA QR" className="w-56 h-56 object-contain" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">សូមស្កេន QR បង់ប្រាក់ ហើយ upload slip ខាងក្រោម។</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border rounded p-2 bg-transparent" placeholder="ឈ្មោះ" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="w-full border rounded p-2 bg-transparent" placeholder="លេខទូរស័ព្ទ" value={phone} onChange={e=>setPhone(e.target.value)} required />
        <input type="file" accept="image/*" onChange={e=>setSlip(e.target.files[0])} />
        <div className="border rounded p-3">
          <h3 className="font-semibold mb-2">កន្ត្រកទំនិញ</h3>
          {cart.map((c,i)=>(
            <div key={i} className="flex justify-between text-sm py-1">
              <span>{c.title} × {c.qty}</span>
              <span>${(c.price*c.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-2 border-t mt-2">
            <span>សរុប</span><span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button disabled={loading} className="px-4 py-2 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
          {loading ? 'កំពុងដាក់បញ្ជាទិញ...' : 'ដាក់បញ្ជាទិញ'}
        </button>
      </form>
    </div>
  )
}
