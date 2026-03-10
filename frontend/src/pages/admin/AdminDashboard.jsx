import { useState } from 'react'
import { Users, BookOpen, Layers, Bell, TrendingUp, Plus, ChevronRight, Trash2, Edit2 } from 'lucide-react'
import Layout from '../../components/Layout'

const MOCK_FILIERES = [
  { id: 1, nom: 'GLSID', fullName: 'Génie Logiciel et Systèmes Informatiques Distribués', modules: 12, etudiants: 84 },
  { id: 2, nom: 'GINF',  fullName: 'Génie Informatique',   modules: 10, etudiants: 72 },
  { id: 3, nom: 'GRT',   fullName: 'Génie des Réseaux et Télécommunications', modules: 9, etudiants: 60 },
  { id: 4, nom: 'GESI',  fullName: 'Génie des Systèmes Industriels', modules: 8, etudiants: 55 },
]

const MOCK_PROFS = [
  { id: 1, nom: 'Alami',  prenom: 'Hassan', email: 'h.alami@edu.ma',  modules: 3, filiere: 'GLSID' },
  { id: 2, nom: 'Benali', prenom: 'Fatima', email: 'f.benali@edu.ma', modules: 2, filiere: 'GINF' },
  { id: 3, nom: 'Chakir', prenom: 'Omar',   email: 'o.chakir@edu.ma', modules: 4, filiere: 'GLSID' },
]

export default function AdminDashboard() {
  const [showFiliereModal, setShowFiliereModal] = useState(false)
  const [showProfModal, setShowProfModal]       = useState(false)
  const [newFiliere, setNewFiliere] = useState({ nom: '', fullName: '' })
  const [newProf,    setNewProf]    = useState({ nom: '', prenom: '', email: '', motDePasse: '' })
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <Layout>
      <div className="p-6 lg:p-8 space-y-8 max-w-[1400px]">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-slate-400 text-sm mb-1">Panneau d'administration</p>
            <h1 className="font-display text-3xl font-bold text-white">
              Tableau de <span className="gradient-text">bord</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowFiliereModal(true)} className="btn-secondary flex items-center gap-2 text-sm">
              <Layers size={15} /> Filière
            </button>
            <button onClick={() => setShowProfModal(true)} className="btn-primary flex items-center gap-2 text-sm">
              <Plus size={15} /> Professeur
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Filières actives',  value: MOCK_FILIERES.length, icon: Layers,      color: '#6366f1', bg: 'rgba(99,102,241,0.12)', trend: '+1 ce mois' },
            { label: 'Modules au total',  value: 39,                    icon: BookOpen,    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', trend: '+3 ce mois' },
            { label: 'Professeurs',       value: MOCK_PROFS.length,     icon: Users,       color: '#10b981', bg: 'rgba(16,185,129,0.12)', trend: 'Actifs' },
            { label: 'Étudiants inscrits',value: 271,                   icon: TrendingUp,  color: '#ef4444', bg: 'rgba(239,68,68,0.12)', trend: '+15 ce semestre' },
          ].map(({ label, value, icon: Icon, color, bg, trend }, i) => (
            <div key={i} className="stat-card">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full text-emerald-400" style={{ background: 'rgba(16,185,129,0.12)' }}>
                  {trend}
                </span>
              </div>
              <p className="text-3xl font-display font-bold text-white mb-1">{value}</p>
              <p className="text-slate-400 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {[
            { key: 'overview', label: 'Vue d\'ensemble' },
            { key: 'filieres', label: 'Filières' },
            { key: 'professeurs', label: 'Professeurs' },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setActiveTab(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-300 border border-amber-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Filières summary */}
            <div>
              <h2 className="font-display text-lg font-semibold text-white mb-4">Filières</h2>
              <div className="space-y-2">
                {MOCK_FILIERES.map((f) => (
                  <div key={f.id} className="glass-card p-4 flex items-center justify-between hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/25 flex items-center justify-center text-indigo-300 font-bold text-sm">
                        {f.nom[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{f.nom}</p>
                        <p className="text-slate-500 text-xs">{f.etudiants} étudiants · {f.modules} modules</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-amber-400 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professors summary */}
            <div>
              <h2 className="font-display text-lg font-semibold text-white mb-4">Professeurs récents</h2>
              <div className="space-y-2">
                {MOCK_PROFS.map((p) => (
                  <div key={p.id} className="glass-card p-4 flex items-center justify-between hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/25 flex items-center justify-center text-amber-300 font-bold text-sm">
                        {p.prenom[0]}{p.nom[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Pr. {p.prenom} {p.nom}</p>
                        <p className="text-slate-500 text-xs">{p.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-gold text-xs">{p.filiere}</span>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filieres' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-white">Toutes les filières</h2>
              <button onClick={() => setShowFiliereModal(true)} className="btn-primary text-sm flex items-center gap-2">
                <Plus size={14} /> Ajouter
              </button>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-5 table-header">
                <span>Sigle</span><span className="col-span-2">Intitulé complet</span><span>Modules</span><span>Étudiants</span>
              </div>
              {MOCK_FILIERES.map((f) => (
                <div key={f.id} className="grid grid-cols-5 table-row items-center">
                  <span className="font-mono text-amber-400 font-bold">{f.nom}</span>
                  <span className="col-span-2 text-white text-sm">{f.fullName}</span>
                  <span className="text-slate-300">{f.modules}</span>
                  <div className="flex items-center justify-between pr-4">
                    <span className="text-slate-300">{f.etudiants}</span>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-amber-400 transition-colors"><Edit2 size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'professeurs' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-white">Tous les professeurs</h2>
              <button onClick={() => setShowProfModal(true)} className="btn-primary text-sm flex items-center gap-2">
                <Plus size={14} /> Ajouter
              </button>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-5 table-header">
                <span>Professeur</span><span className="col-span-2">Email</span><span>Filière</span><span>Modules</span>
              </div>
              {MOCK_PROFS.map((p) => (
                <div key={p.id} className="grid grid-cols-5 table-row items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold">
                      {p.prenom[0]}{p.nom[0]}
                    </div>
                    <span className="text-white text-sm font-medium">Pr. {p.prenom} {p.nom}</span>
                  </div>
                  <span className="col-span-2 text-slate-400 text-sm">{p.email}</span>
                  <span className="badge badge-gold text-xs w-fit">{p.filiere}</span>
                  <div className="flex items-center justify-between pr-4">
                    <span className="text-slate-300">{p.modules}</span>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-amber-400 transition-colors"><Edit2 size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Add Filière Modal ── */}
      {showFiliereModal && (
        <div className="modal-overlay" onClick={() => setShowFiliereModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-white mb-6">Nouvelle Filière</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Filière créée !'); setShowFiliereModal(false); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Sigle (ex: GLSID)</label>
                <input className="input-field" placeholder="GLSID" value={newFiliere.nom}
                       onChange={e => setNewFiliere({...newFiliere, nom: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Intitulé complet</label>
                <input className="input-field" placeholder="Génie Logiciel et…" value={newFiliere.fullName}
                       onChange={e => setNewFiliere({...newFiliere, fullName: e.target.value})} required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowFiliereModal(false)} className="btn-secondary flex-1">Annuler</button>
                <button type="submit" className="btn-primary flex-1">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Professor Modal ── */}
      {showProfModal && (
        <div className="modal-overlay" onClick={() => setShowProfModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-white mb-6">Ajouter un Professeur</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Professeur ajouté !'); setShowProfModal(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Prénom</label>
                  <input className="input-field" placeholder="Hassan" value={newProf.prenom}
                         onChange={e => setNewProf({...newProf, prenom: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Nom</label>
                  <input className="input-field" placeholder="Alami" value={newProf.nom}
                         onChange={e => setNewProf({...newProf, nom: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input type="email" className="input-field" placeholder="h.alami@edu.ma" value={newProf.email}
                       onChange={e => setNewProf({...newProf, email: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Mot de passe initial</label>
                <input type="password" className="input-field" placeholder="••••••••" value={newProf.motDePasse}
                       onChange={e => setNewProf({...newProf, motDePasse: e.target.value})} required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowProfModal(false)} className="btn-secondary flex-1">Annuler</button>
                <button type="submit" className="btn-primary flex-1">Créer le compte</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
