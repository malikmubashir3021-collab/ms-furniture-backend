import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Store } from 'lucide-react'

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
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="shopify-card p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-shopify/10 rounded-full mb-4">
              <Store size={24} className="text-shopify" />
            </div>
            <h1 className="text-xl font-semibold text-text-primary">MS Furniture</h1>
            <p className="text-text-secondary text-sm mt-1">Sign in to your admin panel</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="shopify-label">Username</label>
              <input
                type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="shopify-input"
              />
            </div>
            <div>
              <label className="shopify-label">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="shopify-input"
              />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded px-3 py-2">{error}</p>}
            <button type="submit" className="shopify-btn-primary w-full">
              Sign In
            </button>
          </form>
        </div>
        <p className="text-center text-text-muted text-xs mt-6">MS Furniture Store Admin Panel</p>
      </div>
    </div>
  )
}
