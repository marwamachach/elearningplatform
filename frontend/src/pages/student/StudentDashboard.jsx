import { useState, useEffect } from 'react'
import { BookOpen, FileText, Bell, TrendingUp, Clock, ChevronRight, Star } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Layout from '../../components/Layout'

// Mock data – replace with real API calls
const MOCK_MODULES = [
  { id: 1, nom: 'Algorithmique Avancée', code: 'INF301', professeur: 'Pr. Alami', documents: 8, couleur: '#6366f1' },
  { id: 2, nom: 'Bases de Données', code: 'INF302', professeur: 'Pr. Benali', documents: 12, couleur: '#f59e0b' },
  { id: 3, nom: 'Développement Web', code: 'INF303', professeur: 'Pr. Chakir', documents: 5, couleur: '#10b981' },
  { id: 4, nom: 'Systèmes d\u2019Exploitation', code: 'INF304', professeur: 'Pr. Driss', documents: 9, couleur: '#ef4444' },
]

const MOCK_ANNONCES = [
  { id: 1, titre: 'Report de la séance TP du 20 mars', date: '15 mars 2024', module: 'Bases de Données', urgent: true },
  { id: 2, titre: 'Nouveau TD disponible – Chapitre 5', date: '14 mars 2024', module: 'Algorithmique Avancée', urgent: false },
  { id: 3, titre: 'Examen de mi-semestre – planning', date: '12 mars 2024', module: 'Général', urgent: false },
]

const MOCK_DOCS = [
  { id: 1, nom: 'Cours Chap 4 – Graphes', module: 'Algorithmique', date: '2024-03-14', type: 'PDF' },
  { id: 2, nom: 'TD3 – Jointures SQL', module: 'Bases de Données', date: '2024-03-13', type: 'PDF' },
  { id: 3, nom: 'Projet Final – Consignes', module: 'Dév. Web', date: '2024-03-11', type: 'DOCX' },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const hour = time.getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'

  return (
    <Layout>
      <div className="p-6 lg:p-8 space-y-8 max-w-[1400px]">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4 animate-fade-up">
          <div>
            <p className="text-slate-400 text-sm mb-1">{greeting},</p>
            <h1 className="font-display text-3xl font-bold text-white">
              {user?.prenom} <span className="gradient-text">{user?.nom}</span>
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              {time.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="glass-card-gold px-5 py-3 flex items-center gap-3">
            <Star size={16} className="text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Filière GLSID — S5</span>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Modules inscrits',  value: MOCK_MODULES.length, icon: BookOpen,  color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
            { label: 'Documents dispo.',  value: 34,                  icon: FileText,  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
            { label: 'Annonces récentes', value: MOCK_ANNONCES.length,icon: Bell,      color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
            { label: 'Semaine en cours',  value: 'S5',                icon: TrendingUp,color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
          ].map(({ label, value, icon: Icon, color, bg }, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                     style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-2xl font-display font-bold text-white">{value}</span>
              </div>
              <p className="text-slate-400 text-sm">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Modules ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-white">Mes Modules</h2>
              <a href="/student/modules" className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1 transition-colors">
                Voir tout <ChevronRight size={14} />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {MOCK_MODULES.map((mod) => (
                <div key={mod.id} className="glass-card p-5 cursor-pointer hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                         style={{ background: `${mod.couleur}25`, border: `1px solid ${mod.couleur}40` }}>
                      {mod.nom[0]}
                    </div>
                    <span className="badge badge-blue text-xs font-mono">{mod.code}</span>
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1 leading-tight">{mod.nom}</h3>
                  <p className="text-slate-500 text-xs mb-3">{mod.professeur}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FileText size={12} />
                    <span>{mod.documents} documents</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Annonces ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-white">Annonces</h2>
              <a href="/student/annonces" className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1 transition-colors">
                Tout voir <ChevronRight size={14} />
              </a>
            </div>
            <div className="space-y-3">
              {MOCK_ANNONCES.map((ann) => (
                <div key={ann.id} className="glass-card p-4 cursor-pointer hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ann.urgent ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    <div>
                      <p className="text-white text-sm font-medium leading-tight mb-1">{ann.titre}</p>
                      <p className="text-slate-500 text-xs">{ann.module}</p>
                      <div className="flex items-center gap-1 mt-2 text-slate-600 text-xs">
                        <Clock size={11} />
                        <span>{ann.date}</span>
                      </div>
                    </div>
                  </div>
                  {ann.urgent && <span className="badge badge-red text-xs mt-2 ml-4">Urgent</span>}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Recent Documents ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-white">Documents récents</h2>
            <a href="/student/documents" className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1 transition-colors">
              Tous les docs <ChevronRight size={14} />
            </a>
          </div>
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-4 table-header">
              <span>Nom du document</span>
              <span>Module</span>
              <span>Date</span>
              <span>Type</span>
            </div>
            {MOCK_DOCS.map((doc) => (
              <div key={doc.id} className="grid grid-cols-4 table-row items-center cursor-pointer hover:text-amber-300 group">
                <span className="text-white text-sm font-medium group-hover:text-amber-300 transition-colors flex items-center gap-2">
                  <FileText size={14} className="text-slate-500" />
                  {doc.nom}
                </span>
                <span className="text-slate-400 text-sm">{doc.module}</span>
                <span className="text-slate-500 text-sm">{doc.date}</span>
                <span className={`badge text-xs w-fit ${doc.type === 'PDF' ? 'badge-red' : 'badge-blue'}`}>{doc.type}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  )
}


