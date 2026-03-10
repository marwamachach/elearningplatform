import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/api'
import { BookOpen, Eye, EyeOff, GraduationCap, Lock, Mail } from 'lucide-react'

// ── Demo users for testing without backend ──────────────
const DEMO_USERS = {
  'admin@edu.ma':     { id: 1, nom: 'Admin', prenom: 'Super', role: 'ADMIN',    token: 'demo-admin-token' },
  'prof@edu.ma':      { id: 2, nom: 'Alami', prenom: 'Hassan', role: 'PROFESSOR', token: 'demo-prof-token' },
  'etudiant@edu.ma':  { id: 3, nom: 'Benali', prenom: 'Sara', role: 'STUDENT',  token: 'demo-student-token' },
}

const ROLE_ROUTES = {
  ADMIN:     '/admin/dashboard',
  PROFESSOR: '/professor/dashboard',
  STUDENT:   '/student/dashboard',
}

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // ── Try demo users first (works without backend) ──
    if (DEMO_USERS[email]) {
      await new Promise(r => setTimeout(r, 700))
      const { token, ...userData } = DEMO_USERS[email]
      login(userData, token)
      navigate(ROLE_ROUTES[userData.role])
      setLoading(false)
      return
    }

    // ── Otherwise call real API ────────────────────────
    try {
      const res = await authService.login({ email, password })
      const { token, ...userData } = res.data
      login(userData, token)
      navigate(ROLE_ROUTES[userData.role] ?? '/')
    } catch (err) {
      setError(err.response?.data?.message ?? 'Email ou mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (role) => {
    const map = { ADMIN: 'admin@edu.ma', PROFESSOR: 'prof@edu.ma', STUDENT: 'etudiant@edu.ma' }
    setEmail(map[role])
    setPassword('demo123')
    setError('')
  }

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 relative z-10">

        {/* ── Left: Branding ── */}
        <div className="hidden lg:flex flex-col justify-between p-12 glass-card rounded-r-none border-r-0"
             style={{ borderRadius: '20px 0 0 20px' }}>
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <GraduationCap size={22} className="text-navy-950" />
              </div>
              <span className="font-display text-xl font-semibold text-white">EduLearn</span>
            </div>

            <h1 className="font-display text-4xl font-bold text-white leading-tight mb-4">
              La connaissance<br />
              <span className="gradient-text">sans frontières</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Plateforme d'apprentissage en ligne pour étudiants, professeurs et administrateurs.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { icon: '📚', text: 'Accès illimité aux cours et ressources' },
              { icon: '👨‍🏫', text: 'Gestion des modules par filière' },
              { icon: '📢', text: 'Annonces et notifications en temps réel' },
              { icon: '📁', text: 'Téléchargement de documents pédagogiques' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                   style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xl">{item.icon}</span>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Login form ── */}
        <div className="glass-card p-10 flex flex-col justify-center"
             style={{ borderRadius: '0 20px 20px 0' }}>
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <GraduationCap size={20} className="text-navy-950" />
            </div>
            <span className="font-display text-xl font-semibold text-white">EduLearn</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-white mb-2">Connexion</h2>
          <p className="text-slate-400 text-sm mb-8">Bienvenue ! Entrez vos identifiants.</p>

          {/* Demo buttons */}
          <div className="mb-6">
            <p className="text-xs text-slate-500 mb-2 font-mono uppercase tracking-wider">Démo rapide →</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'ADMIN', label: 'Admin', color: 'rgba(99,102,241,0.2)', border: 'rgba(99,102,241,0.4)' },
                { role: 'PROFESSOR', label: 'Prof', color: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)' },
                { role: 'STUDENT', label: 'Étudiant', color: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)' },
              ].map(({ role, label, color, border }) => (
                <button key={role} onClick={() => fillDemo(role)}
                        className="py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                        style={{ background: color, border: `1px solid ${border}`, color: '#e2e8f0' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg text-sm text-red-300 flex items-center gap-2"
                   style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <span>⚠️</span> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
                    className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                  Connexion…
                </>
              ) : 'Se connecter'}
            </button>
          </form>

          <p className="text-xs text-slate-600 text-center mt-8">
            © 2024 EduLearn — GLSID Platform
          </p>
        </div>

      </div>
    </div>
  )
}
