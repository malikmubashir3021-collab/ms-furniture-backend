import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/admin')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-jet flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-gold text-2xl font-light tracking-wider mb-2">MS Furniture</h1>
          <p className="text-stone-500 text-xs tracking-widest uppercase">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full bg-jet-light border border-stone-700 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
          />
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-jet-light border border-stone-700 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-gold text-jet text-sm tracking-widest uppercase font-medium py-3 hover:bg-gold-light transition-colors">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
