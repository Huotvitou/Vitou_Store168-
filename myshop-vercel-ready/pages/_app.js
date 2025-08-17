
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
    const th = saved || 'light';
    setTheme(th);
    document.documentElement.classList.toggle('dark', th === 'dark');
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof window !== 'undefined') localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <Navbar theme={theme} onToggle={toggle} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
