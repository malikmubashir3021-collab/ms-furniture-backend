import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import { ArrowLeft } from 'lucide-react'

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
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/products')} className="p-2 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded-md transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-text-primary">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-text-secondary text-sm mt-0.5">
            {isEdit ? 'Update product details' : 'Create a new product'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="shopify-card p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="shopify-label">Product Name</label>
              <input value={form.name} onChange={set('name')} required className="shopify-input" placeholder="e.g. Premium Coffee Table" />
            </div>
            <div>
              <label className="shopify-label">Category</label>
              <select value={form.category} onChange={set('category')} className="shopify-select">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="shopify-label">Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} className="shopify-input" placeholder="Product description..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="shopify-label">Material</label>
              <input value={form.material} onChange={set('material')} className="shopify-input" placeholder="e.g. Solid Wood" />
            </div>
            <div>
              <label className="shopify-label">Finishing</label>
              <input value={form.finishing} onChange={set('finishing')} className="shopify-input" placeholder="e.g. Polished" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="shopify-label">Dimensions</label>
              <input value={form.sizing} onChange={set('sizing')} className="shopify-input" placeholder='e.g. 48" × 30" × 17"' />
            </div>
            <div>
              <label className="shopify-label">Color Scheme</label>
              <input value={form.color_scheme} onChange={set('color_scheme')} className="shopify-input" placeholder="e.g. Walnut Brown" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="shopify-label">Top Type</label>
              <input value={form.top_type} onChange={set('top_type')} className="shopify-input" placeholder="e.g. Marble Top" />
            </div>
            <div>
              <label className="shopify-label">Model Number</label>
              <input value={form.model_number} onChange={set('model_number')} className="shopify-input" placeholder="e.g. MT-101" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="shopify-label">Badge</label>
              <select value={form.badge} onChange={set('badge')} className="shopify-select">
                <option value="">None</option>
                <option value="new">New</option>
                <option value="best-seller">Best Seller</option>
              </select>
            </div>
            <div>
              <label className="shopify-label">Image Path</label>
              <input value={form.image} onChange={set('image')} className="shopify-input" placeholder="/images/1.webp" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button type="button" onClick={() => navigate('/admin/products')} className="shopify-btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="shopify-btn-primary">
            {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
