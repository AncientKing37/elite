'use client'
import useUserStore from '@/lib/userstore'

export default function Dashboard() {
  const { username, userId } = useUserStore()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
      <p>Your user ID: {userId}</p>
      {/* Add listings, favorites, etc. here */}
    </div>
  )
}