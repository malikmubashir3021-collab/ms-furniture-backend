import { useState } from 'react'
import { api } from '../api'
import { Shield } from 'lucide-react'

export default function CreateAdmin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setBusy(true)
    try {
      await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      setMessage(`Admin "${username}" created successfully`)
      setUsername('')
      setPassword('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">Create Admin</h1>
        <p className="text-text-secondary text-sm mt-0.5">Add a new administrator account</p>
      </div>

      <div className="max-w-md">
        <div className="shopify-card p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-page-border">
            <div className="w-10 h-10 bg-shopify/10 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-shopify" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">New Admin Account</p>
              <p className="text-xs text-text-secondary">Set credentials for the new admin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="shopify-label">Username</label>
              <input
                type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                className="shopify-input"
              />
            </div>
            <div>
              <label className="shopify-label">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="shopify-input"
              />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded px-3 py-2">{error}</p>}
            {message && <p className="text-shopify text-sm bg-shopify/5 border border-shopify/10 rounded px-3 py-2">{message}</p>}
            <button type="submit" disabled={busy} className="shopify-btn-primary w-full">
              {busy ? 'Creating...' : 'Create Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
