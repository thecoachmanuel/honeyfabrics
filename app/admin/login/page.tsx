"use client"
import { useState } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (res.ok) router.push('/admin')
    else setError('Invalid credentials')
  }

  return (
    <div>
      <Header />
      <section className="container py-12 flex flex-col items-center">
        <h1 className="text-3xl font-display font-bold text-cocoa">Admin Login</h1>
        <form onSubmit={onSubmit} className="card p-4 mt-4 w-full max-w-md">
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border rounded p-2 mb-3 w-full" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border rounded p-2 mb-3 w-full" />
          <button className="btn btn-primary w-full" type="submit">Login</button>
        </form>
      </section>
      <Footer />
    </div>
  )
}
