'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UserCircle } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import useUserStore from '@/lib/userstore'

export default function Navbar() {
  const { username, setUsername } = useUserStore() // ✅ Now includes setUsername
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const decoded = jwtDecode(token)
          setUsername(decoded.username || 'User') // ✅ Zustand setter
          setIsLoggedIn(true)
        } catch (err) {
          console.error('Invalid token:', err)
        }
      }
    }
  }, [setUsername])

  const toggleDropdown = () => setShowDropdown(!showDropdown)

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        El1te Market
      </Link>

      <div className="flex items-center gap-4 relative">
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <UserCircle size={24} />
              <span>{username}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded p-2 z-10">
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token')
                    window.location.reload()
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
