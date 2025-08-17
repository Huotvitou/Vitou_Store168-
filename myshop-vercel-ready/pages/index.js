
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.items || []))
  }, [])

  const add = (p) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const found = cart.find(c => c.title === p.title)
    if (found) found.qty += 1; else cart.push({ ...p, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('បានបន្ថែមទៅកន្ត្រក!')
  }

  return (
    <div>
      <section className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">ហាងលក់ទំនិញ UI ស្អាត</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Modern • Fast • Khmer Ready</p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p, i) => <ProductCard key={i} p={p} onAdd={add} />)}
      </div>
    </div>
  )
}
