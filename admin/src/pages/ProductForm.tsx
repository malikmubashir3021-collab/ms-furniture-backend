import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api, apiUrl } from '../api'

const CATEGORIES = ['Coffee Tables', 'Coffee Sets', 'Sofa Set', 'Bed Set']

interface FormData {
  name: string
  category: string
  description: string
  material: string
  finishing: string
  sizing: string
  color_scheme: string
  top_type: string
  model_number: string
  badge: string
  image: string
}

const empty: FormData = {
  name: '', category: 'Coffee Tables', description: '', material: '',
  finishing: '', sizing: '', color_scheme: '', top_type: '',
  model_number: '', badge: '', image: '',
}

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [form, setForm] = useState<FormData>(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) {
      api(`/api/products/${id}`).then(data => {
        setForm({
          name: data.name || '',
          category: data.category || 'Coffee Tables',
          description: data.description || '',
          material: data.material || '',
          finishing: data.finishing || '',
          sizing: data.sizing || '',
          color_scheme: data.color_scheme || '',
          top_type: data.top_type || '',
          model_number: data.model_number || '',
          badge: data.badge || '',
          image: data.image || '',
        })
      })
    }
  }, [id])

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isEdit) {
        await api(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(form) })
      } else {
        await api('/api/products', { method: 'POST', body: JSON.stringify(form) })
      }
      navigate('/admin/products')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-light text-stone-200 mb-6">{isEdit ? 'Edit Product' : 'New Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Name</label>
            <input value={form.name} onChange={set('name')} required className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Category</label>
            <select value={form.category} onChange={set('category')} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Description</label>
          <textarea value={form.description} onChange={set('description')} rows={3} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Material</label>
            <input value={form.material} onChange={set('material')} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Finishing</label>
            <input value={form.finishing} onChange={set('finishing')} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Dimensions</label>
            <input value={form.sizing} onChange={set('sizing')} placeholder='e.g. 48" × 30" × 17"' className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Color Scheme</label>
            <input value={form.color_scheme} onChange={set('color_scheme')} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Top Type</label>
            <input value={form.top_type} onChange={set('top_type')} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Model Number</label>
            <input value={form.model_number} onChange={set('model_number')} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Badge</label>
            <select value={form.badge} onChange={set('badge')} className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50">
              <option value="">None</option>
              <option value="new">New</option>
              <option value="best-seller">Best Seller</option>
            </select>
          </div>
          <div>
            <label className="block text-stone-500 text-xs tracking-wider uppercase mb-1">Image Path</label>
            <input value={form.image} onChange={set('image')} placeholder="/images/1.webp" className="w-full bg-jet-light border border-stone-700 text-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-gold text-jet text-xs tracking-wider uppercase font-medium px-6 py-3 rounded hover:bg-gold-light transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="border border-stone-700 text-stone-400 text-xs tracking-wider uppercase px-6 py-3 rounded hover:text-stone-200 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
