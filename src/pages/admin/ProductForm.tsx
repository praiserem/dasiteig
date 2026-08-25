import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Upload, X } from 'lucide-react'
import { api } from '../../lib/api'
import { Product, CATEGORIES } from '../../data/products'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/select'
import { Modal } from '../../components/ui/modal'

const ART_TYPES = ['tote', 'torch', 'jacket', 'multitool', 'beanie', 'mug', 'satchel', 'lamp', 'sunglasses']

interface FormData {
  name: string
  brand: string
  category: string
  price: string
  compareAt: string
  description: string
  details: string
  specs: string
  shipping: string
  sku: string
  stockQuantity: string
  lowStockThreshold: string
  visible: boolean
  imageUrl: string
  art: string
  artColor: string
  variantKind: string
  variants: string
}

const emptyForm: FormData = {
  name: '', brand: '', category: '', price: '', compareAt: '',
  description: '', details: '', specs: '', shipping: 'Ships in 1–2 business days.',
  sku: '', stockQuantity: '0', lowStockThreshold: '5',
  visible: true, imageUrl: '', art: 'tote', artColor: '#3A362E',
  variantKind: 'COLORS', variants: '',
}

export function ProductForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploading, setUploading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    if (isEdit) fetchProduct()
  }, [id, isEdit])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await api.get<{ product: any }>(`/api/products/${id}`)
      const p: Product = res.product
      setFormData({
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: String(p.price),
        compareAt: p.compareAt ? String(p.compareAt) : '',
        description: p.description,
        details: p.details?.join('\n') || '',
        specs: p.specs?.map((s) => `${s.label}: ${s.value}`).join('\n') || '',
        shipping: p.shipping,
        sku: p.sku || '',
        stockQuantity: String(p.stockQuantity),
        lowStockThreshold: String(p.lowStockThreshold),
        visible: p.visible !== false,
        imageUrl: p.imageUrl || '',
        art: p.art || 'tote',
        artColor: p.artColor || '#3A362E',
        variantKind: p.variantKind || 'COLORS',
        variants: p.variants?.map((v) => v.label).join(', ') || '',
      })
    } catch (err: any) {
      setError(err.message || 'Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB')
      return
    }
    setUploading(true)
    setError('')
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      setFormData((prev) => ({ ...prev, imageUrl: data.url }))
    } catch (err: any) {
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    if (!formData.name.trim()) { setError('Product name is required.'); setSaving(false); return }
    if (!formData.brand.trim()) { setError('Brand is required.'); setSaving(false); return }
    if (!formData.category) { setError('Please select a category.'); setSaving(false); return }
    if (!formData.price || Number(formData.price) < 0) { setError('Please enter a valid price.'); setSaving(false); return }
    if (!formData.description.trim()) { setError('Description is required.'); setSaving(false); return }

    const details = formData.details.split('\n').map((s) => s.trim()).filter(Boolean)
    const specsPairs = formData.specs.split('\n').map((s) => s.trim()).filter(Boolean).map((line) => {
      const [label, ...rest] = line.split(':')
      return { label: label.trim(), value: rest.join(':').trim() }
    })
    const variantList = formData.variants.split(',').map((v) => v.trim()).filter(Boolean).map((label) => ({ label }))

    const payload: any = {
      brand: formData.brand.trim(),
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      description: formData.description.trim(),
      details,
      specs: specsPairs,
      shipping: formData.shipping.trim() || 'Ships in 1–2 business days.',
      sku: formData.sku.trim() || null,
      stockQuantity: Number(formData.stockQuantity) || 0,
      lowStockThreshold: Number(formData.lowStockThreshold) || 5,
      visible: formData.visible ? 1 : 0,
      imageUrl: formData.imageUrl || null,
      art: formData.art,
      artColor: formData.artColor,
      variantKind: formData.variantKind,
      variants: variantList,
    }

    if (formData.compareAt) payload.compare_at = Number(formData.compareAt)

    try {
      if (isEdit) {
        await api.put(`/api/products/${id}`, payload)
      } else {
        await api.post('/api/products', payload)
      }
      setSuccess(isEdit ? 'Product updated successfully.' : 'Product created successfully.')
      setTimeout(() => navigate('/admin/products'), 800)
    } catch (err: any) {
      setError(err.message || 'Failed to save product. Please check the required fields and try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.del(`/api/products/${id}`)
      navigate('/admin/products')
    } catch (err: any) {
      setError(err.message || 'Failed to delete product')
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
          {isEdit ? 'Edit product' : 'Add a product'}
        </h1>
        <div className="flex gap-2">
          {isEdit && (
            <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(true)} className="text-error hover:text-error/80">
              Delete
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-text-secondary">Basic information</h2>
            <Input
              label="Product name"
              required
              placeholder="e.g., Canvas Tote Bag"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Brand"
              required
              placeholder="e.g., Fieldrunner"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </Select>
            <div className="space-y-1">
              <label className="text-[13px] font-medium text-text">Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this product is, what it's made of, and who it's for."
                className="w-full rounded-md border border-border bg-modal px-3 py-2.5 text-[14px] text-text placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-medium text-text-secondary">Pricing and inventory</h2>
            <Input
              label="Price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Input
              label="Compare at price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Optional — show as original price"
              value={formData.compareAt}
              onChange={(e) => setFormData({ ...formData, compareAt: e.target.value })}
              helperText="If set, shows as a crossed-out price next to the sale price"
            />
            <Input
              label="SKU"
              placeholder="Optional — your internal stock code"
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
              label="Low stock alert"
              type="number"
              min="0"
              value={formData.lowStockThreshold}
              onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
              helperText="Get an alert when stock falls below this number"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-text-secondary">Product image</h2>
          <div className="flex items-start gap-4">
            {formData.imageUrl ? (
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-border bg-modal">
                <img src={formData.imageUrl} alt="Product" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute right-1 top-1 rounded-full bg-bg/80 p-1 text-text-secondary hover:text-error"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-text-tertiary transition-colors hover:border-accent hover:text-accent"
              >
                <Upload size={20} />
                <span className="text-[12px]">{uploading ? 'Uploading...' : 'Add image'}</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {formData.imageUrl && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-md border border-border px-3 py-2 text-[13px] text-text-secondary hover:border-accent hover:text-accent"
              >
                {uploading ? 'Uploading...' : 'Change image'}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-text-secondary">Variants</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Variant type"
              placeholder='e.g., COLORS, SIZES, FINISHES'
              value={formData.variantKind}
              onChange={(e) => setFormData({ ...formData, variantKind: e.target.value })}
            />
            <Input
              label="Options"
              placeholder='e.g., Sand, Ink, Rust'
              value={formData.variants}
              onChange={(e) => setFormData({ ...formData, variants: e.target.value })}
              helperText="Comma-separated"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-text-secondary">Details</h2>
          <div className="space-y-1">
            <label className="text-[13px] font-medium text-text">Features (one per line)</label>
            <textarea
              rows={3}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder={"Waxed cotton canvas\nInterior zip pocket\nDouble-stitched base"}
              className="w-full rounded-md border border-border bg-modal px-3 py-2.5 text-[14px] text-text placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[13px] font-medium text-text">Specifications (one per line, format: Label: Value)</label>
            <textarea
              rows={3}
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              placeholder={"Capacity: 18L\nWeight: 1.1 lb\nCare: Spot clean"}
              className="w-full rounded-md border border-border bg-modal px-3 py-2.5 text-[14px] text-text placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          <Input
            label="Shipping info"
            value={formData.shipping}
            onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-text-secondary">Visibility</h2>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
              className="h-4 w-4 rounded border-border bg-modal text-accent focus:ring-accent"
            />
            <span className="text-[14px] text-text">Visible on website</span>
          </label>
          <p className="text-[13px] text-text-tertiary">Uncheck to hide this product from the public website without deleting it.</p>
        </div>

        {error && (
          <div className="rounded-md border border-error/30 bg-error/5 px-4 py-3 text-[13px] text-error">{error}</div>
        )}
        {success && (
          <div className="rounded-md border border-success/30 bg-success/5 px-4 py-3 text-[13px] text-success">{success}</div>
        )}

        <div className="flex gap-3 pt-2 border-t border-border">
          <Button type="submit" variant="primary" disabled={saving || uploading}>
            {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Create product'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
        </div>
      </form>

      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete product"
        description="This will permanently remove this product from your catalog."
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleDelete} className="bg-error hover:bg-error/90">Delete</Button>
          </>
        }
      >
        <p className="text-[14px] text-text-secondary">
          Are you sure you want to delete <strong>{formData.name}</strong>? This cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
