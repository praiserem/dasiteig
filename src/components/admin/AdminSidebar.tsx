import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const adminNav = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin' },
  { id: 'products', label: 'Products', icon: ShoppingCart, path: '/admin/products' },
  { id: 'inventory', label: 'Inventory', icon: Package, path: '/admin/inventory' },
]

export function AdminSidebar({ mobileOpen, onMobileClose }: { mobileOpen: boolean; onMobileClose: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-nav-bg transition-transform duration-300 ease-fast lg:translate-x-0 lg:static lg:w-60 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link to="/" className="font-display text-xl font-semibold text-text">KEPT</Link>
          <span className="font-mono text-[10px] uppercase tracking-wide text-accent">Admin</span>
        </div>

        <nav className="py-4">
          {adminNav.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.id === 'overview' && location.pathname === '/admin')
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  isActive ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-surface hover:text-text'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[10px] font-medium text-accent">
              {(user?.name || user?.email || '?')[0].toUpperCase()}
            </div>
            <span className="text-sm text-text truncate">{user?.name || user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-[13px] font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}
