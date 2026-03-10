import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import LoginPage from './pages/LoginPage'
import StudentDashboard from './pages/student/StudentDashboard'
import ProfessorDashboard from './pages/professor/ProfessorDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Student */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute roles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          {/* Alias pages pour la navigation */}
          <Route path="/student/modules"   element={<ProtectedRoute roles={['STUDENT']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/documents" element={<ProtectedRoute roles={['STUDENT']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/annonces"  element={<ProtectedRoute roles={['STUDENT']}><StudentDashboard /></ProtectedRoute>} />

          {/* Professor */}
          <Route path="/professor/dashboard" element={
            <ProtectedRoute roles={['PROFESSOR']}>
              <ProfessorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/professor/modules"   element={<ProtectedRoute roles={['PROFESSOR']}><ProfessorDashboard /></ProtectedRoute>} />
          <Route path="/professor/documents" element={<ProtectedRoute roles={['PROFESSOR']}><ProfessorDashboard /></ProtectedRoute>} />
          <Route path="/professor/annonces"  element={<ProtectedRoute roles={['PROFESSOR']}><ProfessorDashboard /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin/dashboard"   element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/filieres"    element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/modules"     element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/professeurs" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/etudiants"   element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/annonces"    element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/documents"   element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
