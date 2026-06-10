import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, apiUrl } from '../api'
import { Pencil, Trash2, Plus, Search } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  image: string
  model_number: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')

  const load = () => {
    api('/api/products').then(data => setProducts(Array.isArray(data) ? data : []))
  }
  useEffect(load, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    await api(`/api/products/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.model_number?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Products</h1>
          <p className="text-text-secondary text-sm mt-0.5">{products.length} products total</p>
        </div>
        <Link to="/admin/products/new" className="shopify-btn-primary inline-flex items-center gap-1.5">
          <Plus size={15} />
          Add Product
        </Link>
      </div>

      <div className="shopify-card overflow-hidden">
        <div className="p-4 border-b border-page-border">
          <div className="relative max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="shopify-input pl-9"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-page-border text-text-secondary text-xs font-medium uppercase tracking-wider">
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Model</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-page-border last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded border border-page-border overflow-hidden shrink-0">
                        {p.image ? (
                          <img src={apiUrl(p.image)} alt={p.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">N/A</div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{p.name}</p>
                        <p className="text-text-muted text-xs">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-shopify/5 text-shopify">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{p.model_number || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/admin/products/${p.id}/edit`} className="p-2 text-text-muted hover:text-shopify hover:bg-shopify/5 rounded-md transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package size={32} className="text-text-muted/30" />
                      <p className="text-text-secondary text-sm">
                        {search ? 'No products match your search' : 'No products yet'}
                      </p>
                      {!search && (
                        <Link to="/admin/products/new" className="text-shopify text-sm font-medium hover:underline">
                          Add your first product
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Package(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  )
}
