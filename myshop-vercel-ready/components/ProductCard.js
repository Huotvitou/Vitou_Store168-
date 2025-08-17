
export default function ProductCard({ p, onAdd }) {
  return (
    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition">
      <img src={p.image} alt={p.title} className="w-full h-56 object-cover" />
      <div className="p-4 space-y-1">
        <h3 className="font-semibold">{p.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{p.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-bold">${p.price.toFixed(2)}</span>
          <button onClick={() => onAdd(p)} className="px-3 py-1 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">បូកក្នុងកន្ត្រក</button>
        </div>
      </div>
    </div>
  )
}
