import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { router } from './routes'

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </LanguageProvider>
    </AuthProvider>
  )
}
