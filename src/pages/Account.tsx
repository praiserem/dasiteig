import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Shield, User, LogOut } from 'lucide-react'

export function AccountLayout() {
  const { user, logout, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const currentTab = location.pathname.match(/account\/(.+)/)?.[1] || 'profile'

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="shell py-24">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-border/30" />
          <div className="h-4 w-64 rounded bg-border/30" />
          <div className="mt-8 h-10 w-full rounded bg-border/30" />
          <div className="h-10 w-32 rounded bg-border/30" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="shell py-24 text-center">
        <p className="font-display text-xl text-text">You need to be signed in for this.</p>
        <Link to="/login" className="link-underline mt-4 inline-block text-sm">
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="shell py-12 lg:py-16">
      <div className="flex gap-8 lg:gap-12">
        <div className="hidden w-56 shrink-0 lg:block">
          <nav className="space-y-1">
            <button
              onClick={() => navigate('/account/profile')}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                currentTab === 'profile'
                  ? 'bg-accent text-bg'
                  : 'text-text-secondary hover:bg-surface hover:text-text'
              }`}
            >
              <User size={16} />
              Profile
            </button>
            <button
              onClick={() => navigate('/account/security')}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                currentTab === 'security'
                  ? 'bg-accent text-bg'
                  : 'text-text-secondary hover:bg-surface hover:text-text'
              }`}
            >
              <Shield size={16} />
              Security
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-text-secondary hover:bg-surface hover:text-text"
            >
              <LogOut size={16} />
              Log out
            </button>
          </nav>
        </div>

        <div className="flex-1">
          {currentTab === 'profile' && <ProfileTab user={user} />}
          {currentTab === 'security' && <SecurityTab />}
        </div>
      </div>
    </div>
  )
}

function ProfileTab({ user }: { user: any }) {
  const [name, setName] = useState(user.name || '')
  const [email] = useState(user.email)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      await api.put('/api/user', { name })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-text">Profile</h2>
        <p className="mt-1 text-[14px] text-text-secondary">Manage your personal information.</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          disabled
          helperText="Email cannot be changed."
        />
      </div>

      {error && <p className="text-[13px] text-error">{error}</p>}
      {saved && <p className="text-[13px] text-success">Profile saved</p>}

      <div className="flex gap-3 pt-2">
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}

function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setSaving(true)
    setError('')
    try {
      await api.post('/api/auth/password', { currentPassword, newPassword })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message || 'Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-medium text-text">Security</h2>
        <p className="mt-1 text-[14px] text-text-secondary">Update your password and security settings.</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Current password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current password"
        />
        <Input
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
        <Input
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
      </div>

      {error && <p className="text-[13px] text-error">{error}</p>}
      {saved && <p className="text-[13px] text-success">Password updated</p>}

      <div className="flex gap-3 pt-2">
        <Button variant="primary" onClick={handleSave} disabled={saving || !currentPassword || !newPassword}>
          {saving ? 'Saving...' : 'Update password'}
        </Button>
      </div>
    </div>
  )
}
