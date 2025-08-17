
import Link from 'next/link'

export default function Navbar({ theme, onToggle }) {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">MyShop</Link>
        <nav className="flex items-center gap-4">
          <Link href="/">ទំព័រដើម</Link>
          <Link href="/checkout">ទិញទំនិញ</Link>
          <Link href="/account">គណនី</Link>
          <Link href="/admin">Admin</Link>
          <button onClick={onToggle} className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}
