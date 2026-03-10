import { useState } from 'react'
import { BookOpen, Users, FileText, Bell, Plus, ChevronRight, Upload } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Layout from '../../components/Layout'

const MOCK_MODULES = [
  { id: 1, nom: 'Algorithmique Avancée', code: 'INF301', filiere: 'GLSID', etudiants: 42, documents: 8 },
  { id: 2, nom: 'Bases de Données', code: 'INF302', filiere: 'GLSID', etudiants: 42, documents: 12 },
  { id: 3, nom: 'Structures de Données', code: 'INF201', filiere: 'GLSID', etudiants: 38, documents: 6 },
]

const MOCK_ANNONCES = [
  { id: 1, titre: 'Report TP du 20 mars', date: '15/03/2024', module: 'Bases de Données' },
  { id: 2, titre: 'Nouveau TD – Chapitre 5', date: '14/03/2024', module: 'Algorithmique' },
]

export default function ProfessorDashboard() {
  const { user } = useAuth()
  const [showAnnonceModal, setShowAnnonceModal] = useState(false)
  const [newAnnonce, setNewAnnonce] = useState({ titre: '', contenu: '', moduleId: '' })

  const handleCreateAnnonce = (e) => {
    e.preventDefault()
    alert(`Annonce créée : ${newAnnonce.titre}`)
    setShowAnnonceModal(false)
    setNewAnnonce({ titre: '', contenu: '', moduleId: '' })
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8 space-y-8 max-w-[1400px]">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-slate-400 text-sm mb-1">Espace Professeur</p>
            <h1 className="font-display text-3xl font-bold text-white">
              Pr. <span className="gradient-text">{user?.prenom} {user?.nom}</span>
            </h1>
          </div>
          <button onClick={() => setShowAnnonceModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Nouvelle annonce
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Modules enseignés', value: MOCK_MODULES.length, icon: BookOpen, color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
            { label: 'Étudiants total',   value: 122,                 icon: Users,    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
            { label: 'Documents publiés', value: 26,                  icon: FileText, color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
            { label: 'Annonces actives',  value: MOCK_ANNONCES.length,icon: Bell,     color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
          ].map(({ label, value, icon: Icon, color, bg }, i) => (
            <div key={i} className="stat-card">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
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
              <a href="/professor/modules" className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1">
                Gérer <ChevronRight size={14} />
              </a>
            </div>
            <div className="space-y-3">
              {MOCK_MODULES.map((mod) => (
                <div key={mod.id} className="glass-card p-5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 border border-indigo-500/25 flex items-center justify-center text-lg font-bold text-indigo-300">
                      {mod.nom[0]}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{mod.nom}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="badge badge-blue text-xs">{mod.code}</span>
                        <span className="text-slate-500 text-xs">{mod.filiere}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <p className="text-white font-semibold">{mod.etudiants}</p>
                      <p className="text-slate-500 text-xs">étudiants</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{mod.documents}</p>
                      <p className="text-slate-500 text-xs">documents</p>
                    </div>
                    <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1.5">
                      <Upload size={13} /> Ajouter doc
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Annonces ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-white">Mes Annonces</h2>
              <a href="/professor/annonces" className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1">
                Tout voir <ChevronRight size={14} />
              </a>
            </div>
            <div className="space-y-3">
              {MOCK_ANNONCES.map((ann) => (
                <div key={ann.id} className="glass-card p-4">
                  <p className="text-white text-sm font-medium mb-1">{ann.titre}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="badge badge-gold text-xs">{ann.module}</span>
                    <span className="text-slate-500 text-xs">{ann.date}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => setShowAnnonceModal(true)}
                      className="w-full p-4 rounded-xl border border-dashed border-white/10 text-slate-500 text-sm hover:border-amber-400/30 hover:text-amber-400 transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> Nouvelle annonce
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Create Annonce Modal ── */}
      {showAnnonceModal && (
        <div className="modal-overlay" onClick={() => setShowAnnonceModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-white mb-6">Nouvelle Annonce</h2>
            <form onSubmit={handleCreateAnnonce} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Titre</label>
                <input className="input-field" placeholder="Titre de l'annonce"
                  value={newAnnonce.titre} onChange={e => setNewAnnonce({...newAnnonce, titre: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Module concerné</label>
                <select className="input-field" value={newAnnonce.moduleId}
                        onChange={e => setNewAnnonce({...newAnnonce, moduleId: e.target.value})}>
                  <option value="">-- Sélectionner un module --</option>
                  {MOCK_MODULES.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Contenu</label>
                <textarea className="input-field" rows={4} placeholder="Contenu de l'annonce…"
                  value={newAnnonce.contenu} onChange={e => setNewAnnonce({...newAnnonce, contenu: e.target.value})} required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAnnonceModal(false)} className="btn-secondary flex-1">Annuler</button>
                <button type="submit" className="btn-primary flex-1">Publier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
