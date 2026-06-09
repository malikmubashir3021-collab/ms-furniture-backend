import { useState } from 'react'
import { api } from '../api'

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
      <h1 className="text-stone-200 text-lg font-light tracking-wide mb-6">Create Admin</h1>
      <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
        <input
          type="text" value={username} onChange={e => setUsername(e.target.value)}
          placeholder="New username"
          className="w-full bg-jet-light border border-stone-700 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
        />
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password (min 6 chars)"
          className="w-full bg-jet-light border border-stone-700 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-gold/50"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        {message && <p className="text-green-400 text-xs">{message}</p>}
        <button type="submit" disabled={busy} className="w-full bg-gold text-jet text-sm tracking-widest uppercase font-medium py-3 hover:bg-gold-light transition-colors disabled:opacity-50">
          {busy ? 'Creating...' : 'Create Admin'}
        </button>
      </form>
    </div>
  )
}
