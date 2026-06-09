import { useEffect, useState } from 'react'
import { api } from '../api'

interface Stats {
  totalProducts: number
  categories: number
  latestProduct: string | null
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    api('/api/products').then(products => {
      const arr = Array.isArray(products) ? products : []
      setStats({
        totalProducts: arr.length,
        categories: new Set(arr.map((p: any) => p.category)).size,
        latestProduct: arr.length > 0 ? arr[arr.length - 1].name : null,
      })
    })
  }, [])

  if (!stats) return <div className="text-stone-500 text-sm">Loading...</div>

  return (
    <div>
      <h1 className="text-xl font-light text-stone-200 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-jet-light border border-stone-800 p-5 rounded">
          <p className="text-gold text-2xl font-light">{stats.totalProducts}</p>
          <p className="text-stone-500 text-xs tracking-wider uppercase mt-1">Total Products</p>
        </div>
        <div className="bg-jet-light border border-stone-800 p-5 rounded">
          <p className="text-gold text-2xl font-light">{stats.categories}</p>
          <p className="text-stone-500 text-xs tracking-wider uppercase mt-1">Categories</p>
        </div>
        <div className="bg-jet-light border border-stone-800 p-5 rounded">
          <p className="text-stone-200 text-sm font-light truncate">{stats.latestProduct || '—'}</p>
          <p className="text-stone-500 text-xs tracking-wider uppercase mt-1">Latest Product</p>
        </div>
      </div>
    </div>
  )
}
