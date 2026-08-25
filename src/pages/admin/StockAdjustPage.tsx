import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { api } from '../../lib/api'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Modal } from '../../components/ui/modal'

export function StockAdjustPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const productName = location.state?.productName || ''
  const currentStock = location.state?.currentStock || 0

  const [isOpen, setIsOpen] = useState(true)
  const [adjustmentType, setAdjustmentType] = useState<'ADD' | 'REMOVE' | 'SET'>('ADD')
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const numQty = Number(quantity) || 0
  const newStock = calculateNewStock(adjustmentType, numQty, currentStock)
  const canConfirm = numQty > 0 && newStock >= 0

  function calculateNewStock(type: 'ADD' | 'REMOVE' | 'SET', qty: number, current: number): number {
    switch (type) {
      case 'ADD':
        return current + qty
      case 'REMOVE':
        return current - qty
      case 'SET':
        return qty
      default:
        return current
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => navigate('/admin/inventory'), 200)
  }

  const handleConfirm = async () => {
    if (!canConfirm) return
    setLoading(true)
    setError('')
    try {
      await api.post(`/api/inventory/${id}/adjust`, {
        type: adjustmentType,
        quantity: numQty,
        reason: reason || undefined,
      })
      handleClose()
    } catch (err: any) {
      setError(err.message || 'Failed to adjust stock')
    } finally {
      setLoading(false)
    }
  }

  const footer = (
    <div className="flex gap-3">
      <Button variant="secondary" size="sm" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" size="sm" onClick={handleConfirm} disabled={loading || !canConfirm}>
        {loading ? 'Saving...' : 'Confirm'}
      </Button>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Adjust stock"
      description={productName}
      size="sm"
      footer={footer}
    >
      <div className="space-y-4">
        <div className="text-[14px] text-text-secondary">
          Current stock: <span className="font-mono text-text">{currentStock}</span>
        </div>

        <div className="flex gap-2">
          {(['ADD', 'REMOVE', 'SET'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setAdjustmentType(type)
                setQuantity('')
              }}
              className={`rounded-md border px-4 py-2 text-[13px] font-medium transition-all ${
                adjustmentType === type
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-text-secondary hover:border-accent hover:text-accent'
              }`}
            >
              {type === 'ADD' ? '+ Stock' : type === 'REMOVE' ? '− Stock' : 'Set Stock'}
            </button>
          ))}
        </div>

        <Input
          label="Quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />

        <div
          className={`rounded-md border px-4 py-3 text-[13px] ${
            newStock < 0
              ? 'border-error/30 bg-error/5 text-error'
              : 'border-border bg-surface text-text'
          }`}
        >
          New stock: <span className="font-mono font-medium">{newStock}</span>
        </div>

        {adjustmentType === 'REMOVE' && newStock < 0 && (
          <p className="text-[12px] text-error">
            Cannot reduce stock below 0. Current stock is {currentStock}.
          </p>
        )}

        <Input
          label="Reason (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g., Restock from supplier, Damaged goods"
        />

        {error && <p className="text-[13px] text-error">{error}</p>}
      </div>
    </Modal>
  )
}
