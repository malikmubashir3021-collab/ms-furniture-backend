import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Package, UserPlus, LogOut } from 'lucide-react'

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/products', icon: Package, label: 'Products', end: false },
  { to: '/admin/admins', icon: UserPlus, label: 'Admins', end: false },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-jet flex">
      <aside className="w-56 bg-jet-light border-r border-stone-800 flex flex-col">
        <div className="p-4 border-b border-stone-800">
          <h2 className="text-gold text-sm font-medium tracking-wider">MS Admin</h2>
          <p className="text-stone-600 text-xs mt-0.5">{user?.username}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map(l => (
            <NavLink
              key={l.to} to={l.to} end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 text-xs tracking-wide rounded transition-colors ${
                  isActive ? 'bg-gold/10 text-gold border border-gold/20' : 'text-stone-400 hover:text-stone-200 border border-transparent'
                }`
              }
            >
              <l.icon size={14} />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-stone-500 hover:text-stone-300 text-xs border-t border-stone-800 transition-colors">
          <LogOut size={14} />
          Sign Out
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
