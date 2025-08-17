
import { useEffect, useState } from 'react'

export default function Account() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('/api/orders?mine=1').then(r=>r.json()).then(d=>setOrders(d.items||[]))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">ប្រវត្តិបញ្ជាទិញ</h2>
      <div className="space-y-3">
        {orders.map(o=> (
          <div key={o._id} className="border rounded p-3">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Status: {o.status}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">កាលបរិច្ឆេទ: {new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="font-bold">${o.total?.toFixed(2)}</div>
            </div>
            {o.slipUrl ? <img src={o.slipUrl} className="mt-2 w-40 rounded" /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
