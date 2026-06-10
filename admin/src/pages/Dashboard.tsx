import { useEffect, useState } from 'react'
import { api } from '../api'
import { Package, Tag, Clock, TrendingUp } from 'lucide-react'

interface Stats {
  totalProducts: number
  categories: number
  latestProduct: string | null
}

const cards = [
  { key: 'totalProducts', icon: Package, label: 'Total Products', color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'categories', icon: Tag, label: 'Categories', color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'latestProduct', icon: Clock, label: 'Latest Product', color: 'text-amber-600', bg: 'bg-amber-50' },
] as const

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

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-shopify/30 border-t-shopify rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-0.5">Overview of your furniture store</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(({ key, icon: Icon, label, color, bg }) => {
          const value = stats[key as keyof Stats]
          return (
            <div key={key} className="shopify-card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-semibold text-text-primary">
                    {key === 'latestProduct' ? '' : value}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {key === 'latestProduct' ? (value || 'No products yet') : label}
                  </p>
                </div>
                <div className={`w-10 h-10 ${bg} ${color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
              </div>
              {key !== 'latestProduct' && (
                <div className="mt-3 pt-3 border-t border-page-border flex items-center gap-1.5 text-xs text-shopify">
                  <TrendingUp size={13} />
                  <span>Current</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
