
import { useEffect, useState } from 'react'

export default function Admin() {
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)

  const fetchOrders = () => {
    setLoading(true)
    fetch('/api/admin/orders').then(r=>r.json()).then(d=>{ setOrders(d.items||[]); setLoading(false)})
  }

  useEffect(() => { fetchOrders() }, [])

  const update = async (id, status) => {
    const r = await fetch('/api/admin/orders', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, status }) })
    const j = await r.json()
    if (j.ok) fetchOrders(); else alert(j.message||'error')
  }

  if (loading) return <div>កំពុងផ្ទុក...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Orders</h2>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o._id} className="border rounded p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{o.name} • {o.phone}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Items: {o.items?.map(i=>i.title + '×'+i.qty).join(', ')}</div>
                <div className="text-sm">Status: <span className="font-semibold">{o.status}</span></div>
                <div className="text-sm">Total: <span className="font-semibold">${o.total?.toFixed(2)}</span></div>
              </div>
              <div className="flex items-center gap-2">
                {o.slipUrl ? <img src={o.slipUrl} className="w-20 h-20 object-cover rounded border" /> : <div className="text-sm">No Slip</div>}
                <select defaultValue={o.status} onChange={e=>update(o._id, e.target.value)} className="border rounded p-1 bg-transparent">
                  <option>Pending</option>
                  <option>Verified</option>
                  <option>Complete</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
