'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User } from 'lucide-react'

export default function AuthForm({ type }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/signup'
    const body = type === 'signup'
      ? { email, password, username }
      : { email, password }

    console.log(`Submitting to ${endpoint}`, body)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const text = await res.text()
      console.log(`Raw response from ${endpoint}:`, text)

      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        throw new Error('Invalid JSON response from server')
      }

      if (!res.ok) {
        setError(data.error || `${type} failed`)
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username || 'User')

      router.replace('/dashboard')
    } catch (err) {
      console.error('Submit error:', err)
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1E293B] p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          {type === 'login' ? 'Log in' : 'Sign up'}
        </h2>

        {type === 'signup' && (
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition duration-200"
        >
          {type === 'login' ? 'LOG IN' : 'SIGN UP'}
        </button>

        {type === 'login' && (
          <div className="flex justify-end">
            <a href="#" className="text-yellow-400 text-sm hover:underline">
              Forgot password?
            </a>
          </div>
        )}

        <div className="border-t border-gray-600 mt-6 pt-4">
          <p className="text-sm text-center text-gray-400">
            {type === 'login' ? (
              <>
                Don’t have an account?{' '}
                <a href="/signup" className="text-yellow-400 hover:underline font-medium">
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a href="/login" className="text-yellow-400 hover:underline font-medium">
                  Log in
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  )
}
