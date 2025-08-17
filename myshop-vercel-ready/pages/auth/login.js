
import { useState } from 'react'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  async function submit(e){
    e.preventDefault()
    const r = await fetch('/api/auth/login',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})})
    const j = await r.json()
    if (j.ok) window.location.href='/'; else alert(j.message||'login failed')
  }
  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">ចូលគណនី</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded p-2 bg-transparent" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded p-2 bg-transparent" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">ចូល</button>
      </form>
      <p className="mt-3 text-sm">មិនទាន់មានគណនី? <a href="/auth/register" className="underline">ចុះឈ្មោះ</a></p>
    </div>
  )
}
