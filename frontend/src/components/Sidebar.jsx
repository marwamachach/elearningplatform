import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  GraduationCap, LayoutDashboard, BookOpen, FolderOpen,
  Bell, Users, Settings, LogOut, ChevronLeft, Menu,
  BookMarked, FileText, Layers
} from 'lucide-react'

const NAV_ITEMS = {
  STUDENT: [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/student/modules',   icon: BookOpen,         label: 'Mes Modules' },
    { to: '/student/documents', icon: FileText,         label: 'Documents' },
    { to: '/student/annonces',  icon: Bell,             label: 'Annonces' },
  ],
  PROFESSOR: [
    { to: '/professor/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/professor/modules',   icon: BookOpen,        label: 'Mes Modules' },
    { to: '/professor/documents', icon: FileText,        label: 'Documents' },
    { to: '/professor/annonces',  icon: Bell,            label: 'Annonces' },
  ],
  ADMIN: [
    { to: '/admin/dashboard',   icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/admin/filieres',    icon: Layers,           label: 'Filières' },
    { to: '/admin/modules',     icon: BookOpen,         label: 'Modules' },
    { to: '/admin/professeurs', icon: BookMarked,       label: 'Professeurs' },
    { to: '/admin/etudiants',   icon: Users,            label: 'Étudiants' },
    { to: '/admin/annonces',    icon: Bell,             label: 'Annonces' },
    { to: '/admin/documents',   icon: FolderOpen,       label: 'Documents' },
  ],
}

const ROLE_LABELS = {
  STUDENT: 'Étudiant',
  PROFESSOR: 'Professeur',
  ADMIN: 'Administrateur',
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const items = NAV_ITEMS[user?.role] ?? []

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user ? `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}`.toUpperCase() : '?'

  return (
    <aside
      className="h-screen flex flex-col transition-all duration-300 sticky top-0 flex-shrink-0"
      style={{
        width: collapsed ? '72px' : '240px',
        background: 'rgba(15,12,41,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Logo ── */}
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className={`flex items-center gap-2.5 overflow-hidden ${collapsed ? 'opacity-0 w-0' : 'opacity-100'} transition-all duration-200`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={17} className="text-navy-950" />
          </div>
          <span className="font-display text-base font-semibold text-white whitespace-nowrap">EduLearn</span>
        </div>
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto">
            <GraduationCap size={17} className="text-navy-950" />
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
                className="text-slate-500 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-white/5 ml-auto flex-shrink-0"
                style={{ marginLeft: collapsed ? 0 : 'auto' }}>
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ── User info ── */}
      <div className={`p-3 mx-2 mt-3 rounded-xl transition-all duration-300`}
           style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.prenom} {user?.nom}</p>
              <p className="text-xs text-amber-400/80">{ROLE_LABELS[user?.role]}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 p-2 space-y-0.5 mt-2 overflow-y-auto">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={17} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── Logout ── */}
      <div className="p-2 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={handleLogout}
                className={`sidebar-item w-full text-red-400/70 hover:text-red-300 hover:bg-red-500/10 ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? 'Déconnexion' : undefined}>
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}
