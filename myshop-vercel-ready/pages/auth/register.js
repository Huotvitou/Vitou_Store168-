
import { useState } from 'react'

export default function Register() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  async function submit(e){
    e.preventDefault()
    const r = await fetch('/api/auth/register',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,password})})
    const j = await r.json()
    if (j.ok) window.location.href='/auth/login'; else alert(j.message||'register failed')
  }
  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">ចុះឈ្មោះ</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded p-2 bg-transparent" placeholder="ឈ្មោះ" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded p-2 bg-transparent" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded p-2 bg-transparent" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">ចុះឈ្មោះ</button>
      </form>
    </div>
  )
}
