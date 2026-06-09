import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { Pencil, Trash2, Plus } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  image: string
  model_number: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])

  const load = () => {
    api('/api/products').then(data => setProducts(Array.isArray(data) ? data : []))
  }
  useEffect(load, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return
    await api(`/api/products/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-light text-stone-200">Products</h1>
        <Link to="/admin/products/new" className="flex items-center gap-1.5 bg-gold text-jet text-xs tracking-wider uppercase font-medium px-4 py-2.5 rounded hover:bg-gold-light transition-colors">
          <Plus size={14} />
          Add Product
        </Link>
      </div>
      <div className="bg-jet-light border border-stone-800 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800 text-stone-500 text-xs tracking-wider uppercase">
              <th className="text-left p-3 font-medium">ID</th>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Category</th>
              <th className="text-left p-3 font-medium">Model</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                <td className="p-3 text-stone-400">{p.id}</td>
                <td className="p-3 text-stone-200">{p.name}</td>
                <td className="p-3 text-stone-400">{p.category}</td>
                <td className="p-3 text-stone-400">{p.model_number}</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/admin/products/${p.id}/edit`} className="p-1.5 text-stone-500 hover:text-gold transition-colors">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-stone-500 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-stone-600 text-sm">No products found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
