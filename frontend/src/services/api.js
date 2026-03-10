import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 -> redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ───────────────────────────────────────────────
export const authService = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
}

// ─── Users ──────────────────────────────────────────────
export const userService = {
  getAll:    ()        => api.get('/users'),
  getById:   (id)      => api.get(`/users/${id}`),
  create:    (data)    => api.post('/users', data),
  update:    (id, data)=> api.put(`/users/${id}`, data),
  delete:    (id)      => api.delete(`/users/${id}`),
  getStudents:  ()     => api.get('/users/students'),
  getProfessors:()     => api.get('/users/professors'),
}

// ─── Filières ───────────────────────────────────────────
export const filiereService = {
  getAll:  ()         => api.get('/filieres'),
  getById: (id)       => api.get(`/filieres/${id}`),
  create:  (data)     => api.post('/filieres', data),
  update:  (id, data) => api.put(`/filieres/${id}`, data),
  delete:  (id)       => api.delete(`/filieres/${id}`),
}

// ─── Modules ────────────────────────────────────────────
export const moduleService = {
  getAll:        ()        => api.get('/modules'),
  getById:       (id)      => api.get(`/modules/${id}`),
  getByFiliere:  (id)      => api.get(`/modules/filiere/${id}`),
  getByProfessor:(id)      => api.get(`/modules/professor/${id}`),
  create:        (data)    => api.post('/modules', data),
  update:        (id, data)=> api.put(`/modules/${id}`, data),
  delete:        (id)      => api.delete(`/modules/${id}`),
}

// ─── Documents ──────────────────────────────────────────
export const documentService = {
  getAll:       ()        => api.get('/documents'),
  getByModule:  (id)      => api.get(`/documents/module/${id}`),
  upload:       (formData)=> api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete:       (id)      => api.delete(`/documents/${id}`),
  download:     (id)      => api.get(`/documents/${id}/download`, { responseType: 'blob' }),
}

// ─── Annonces ───────────────────────────────────────────
export const annonceService = {
  getAll:      ()         => api.get('/annonces'),
  getRecent:   ()         => api.get('/annonces/recent'),
  create:      (data)     => api.post('/annonces', data),
  update:      (id, data) => api.put(`/annonces/${id}`, data),
  delete:      (id)       => api.delete(`/annonces/${id}`),
}

export default api
