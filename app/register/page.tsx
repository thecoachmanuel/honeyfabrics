/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData as any)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/account')
        router.refresh()
      } else {
        const json = await res.json()
        setError(json.error || 'Registration failed')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="container py-12 min-h-[60vh] flex items-center justify-center">
        <div className="card max-w-md w-full p-8">
          <h1 className="text-2xl font-display font-bold text-cocoa text-center mb-6">Create Account</h1>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-cocoa mb-1">Full Name</label>
              <input 
                name="name" 
                required 
                className="input w-full border rounded p-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-cocoa mb-1">Email Address</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="input w-full border rounded p-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-cocoa mb-1">Phone Number</label>
              <input 
                name="phone" 
                type="tel" 
                className="input w-full border rounded p-2"
                placeholder="080..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-cocoa mb-1">Password</label>
              <input 
                name="password" 
                type="password" 
                required 
                className="input w-full border rounded p-2"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              disabled={loading}
              className="btn btn-primary w-full py-3"
            >
              {loading ? 'Create Account' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-cocoa/70">
            Already have an account?{' '}
            <Link href="/login" className="text-caramel font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
