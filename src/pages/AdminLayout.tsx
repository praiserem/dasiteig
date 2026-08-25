import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { AdminSidebar } from '../components/admin/AdminSidebar'
import { useAuth } from '../hooks/useAuth'

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user?.role !== 'OWNER') {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading) {
    return <div className="min-h-screen w-full animate-pulse bg-bg" />
  }

  if (!user || user.role !== 'OWNER') {
    return null
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/3 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-violet/3 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full">
        <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

        <div className="flex-1 overflow-x-hidden">
          <div className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-nav-bg/80 backdrop-blur lg:pl-60">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2.5 text-text-secondary hover:text-accent lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-4 px-5 lg:pr-8">
              <span className="text-sm text-text-secondary">Owner: {user.email}</span>
            </div>
          </div>
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
