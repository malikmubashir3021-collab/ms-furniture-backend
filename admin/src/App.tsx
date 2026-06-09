import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductForm from './pages/ProductForm'
import Layout from './pages/Layout'

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-screen bg-jet"><div className="w-6 h-6 border border-gold/30 border-t-gold rounded-full animate-spin" /></div>
  if (!user) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Protected><Layout /></Protected>}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id/edit" element={<ProductForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
