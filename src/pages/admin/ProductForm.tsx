import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { Product } from '../../data/products'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/select'

const categories = ['bags', 'tech', 'apparel', 'tools', 'home', 'accessories']
const artTypes = ['tote', 'torch', 'jacket', 'multitool', 'beanie', 'mug', 'satchel', 'lamp', 'sunglasses']
const artColors = ['#C9BFA6', '#3A362E', '#5B5842', '#8A8377', '#B75A32', '#B7B7AE', '#6C6B4C', '#1C1A16', '#2B2A26']

export function ProductForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    slug: '',
    brand: '',
    name: '',
    category: '',
    price: '',
    compareAt: '',
    art: 'tote',
    artColor: '#3A362E',
    variantKind: 'COLORS',
    variants: '',
    description: '',
    sku: '',
    stockQuantity: '',
    lowStockThreshold: '5',
    new: false,
    bestSeller: false,
    rating: '',
    reviewCount: '',
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchProduct()
    }
  }, [id, isEdit])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await api.get<{ product: any }>(`/api/products/${id}`)
      const p: Product = res.product
      setFormData({
        slug: p.slug,
        brand: p.brand,
        name: p.name,
        category: p.category,
        price: String(p.price),
        compareAt: p.compareAt ? String(p.compareAt) : '',
        art: p.art,
        artColor: p.artColor,
        variantKind: p.variantKind,
        variants: p.variants.map((v) => v.label).join(', '),
        description: p.description,
        sku: p.sku || '',
        stockQuantity: String(p.stockQuantity),
        lowStockThreshold: String(p.lowStockThreshold),
        new: Boolean(p.new),
        bestSeller: Boolean(p.bestSeller),
        rating: String(p.rating || ''),
        reviewCount: String(p.reviewCount || ''),
      })
    } catch (err: any) {
      setError(err.message || 'Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    const variantList = formData.variants
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
      .map((label) => ({ label }))

    const payload: any = {
      slug: formData.slug,
      brand: formData.brand,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      art: formData.art,
      artColor: formData.artColor,
      variantKind: formData.variantKind,
      variants: variantList,
      description: formData.description,
      sku: formData.sku || null,
      stockQuantity: Number(formData.stockQuantity),
      lowStockThreshold: Number(formData.lowStockThreshold),
      new_flag: formData.new ? 1 : 0,
      best_seller: formData.bestSeller ? 1 : 0,
    }

    if (formData.compareAt) {
      payload.compareAt = Number(formData.compareAt)
    }
    if (formData.rating) {
      payload.rating = Number(formData.rating)
    }
    if (formData.reviewCount) {
      payload.reviewCount = Number(formData.reviewCount)
    }

    try {
      if (isEdit) {
        const product = await api.put<{ product: any }>(`/api/products/${id}`, payload)
      } else {
        const product = await api.post<{ product: any }>('/api/products', payload)
      }
      setSuccess(isEdit ? 'Product updated' : 'Product created')
      setTimeout(() => {
        if (isEdit) {
          navigate('/admin/products')
        } else {
          navigate('/admin/products')
        }
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-border/30" />
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 w-full rounded bg-border/30" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium text-text">
          {isEdit ? 'Edit product' : 'Add product'}
        </h1>
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/products')}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Input
              label="Product name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Slug"
              required
              placeholder="lowercase-with-dashes"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              helperText="Used in the URL"
            />
            <Input
              label="Brand"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-4">
            <Input
              label="Price"
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              label="Compare at price"
              type="number"
              step="0.01"
              placeholder="Optional"
              value={formData.compareAt}
              onChange={(e) => setFormData({ ...formData, compareAt: e.target.value })}
            />
            <Input
              label="SKU"
              placeholder="Optional"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
            <Input
              label="Stock quantity"
              type="number"
              min="0"
              required
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
            />
            <Input
              label="Low stock threshold"
              type="number"
              min="0"
              value={formData.lowStockThreshold}
              onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
              helperText="Shows as LOW STOCK when below this"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Description"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Input
            label="Variants"
            placeholder='e.g., "Sand, Ink, Rust" (comma separated)'
            value={formData.variants}
            onChange={(e) => setFormData({ ...formData, variants: e.target.value })}
            helperText="Comma-separated variant names"
          />
          <Input
            label="Variant kind"
            value={formData.variantKind}
            onChange={(e) => setFormData({ ...formData, variantKind: e.target.value })}
            helperText="e.g., COLORS, SIZES, FINISHES"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Select
              label="Art type"
              value={formData.art}
              onChange={(e) => setFormData({ ...formData, art: e.target.value })}
            >
              {artTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
            <Input
              label="Art color"
              value={formData.artColor}
              onChange={(e) => setFormData({ ...formData, artColor: e.target.value })}
              helperText="Hex color for the product illustration"
            />
          </div>
          <div className="flex items-end gap-6">
            <label className="flex items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={formData.new}
                onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
                className="h-4 w-4 rounded border-border bg-modal text-accent focus:ring-accent"
              />
              <span className="text-text-secondary">New arrival</span>
            </label>
            <label className="flex items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={formData.bestSeller}
                onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                className="h-4 w-4 rounded border-border bg-modal text-accent focus:ring-accent"
              />
              <span className="text-text-secondary">Best seller</span>
            </label>
          </div>
        </div>

        {error && <p className="text-[13px] text-error">{error}</p>}
        {success && <p className="text-[13px] text-success">{success}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update product' : 'Create product'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
