import { Navigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants'

const MOCK_USERS = [
  { id: 1, name: 'Admin FAGOU', email: 'admin@fagou.be', role: 'Super Admin', lastLogin: '2024-11-22' },
  { id: 2, name: 'Commercial Manager', email: 'commercial@fagou.be', role: 'Commercial', lastLogin: '2024-11-21' },
  { id: 3, name: 'Export Manager', email: 'export@fagou.be', role: 'Export', lastLogin: '2024-11-20' },
]

export default function AdminUsers() {
  const { user } = useAuth()
  if (user?.role !== 'Super Admin') return <Navigate to={ROUTES.ADMIN} replace />

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Users size={24} color="#1F3864" />
        <div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '28px' }}>Utilisateurs</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280' }}>Gestion des accès back-office</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              {['Nom', 'Email', 'Rôle', 'Dernière connexion'].map((h) => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#6B7280', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user, index) => (
              <tr key={user.id} style={{ borderBottom: index < MOCK_USERS.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1F3864', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', color: '#FFFFFF' }}>{user.name[0]}</span>
                    </div>
                    {user.name}
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280' }}>{user.email}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ backgroundColor: '#1F386420', color: '#1F3864', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '12px', padding: '3px 10px', borderRadius: '12px' }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B7280' }}>{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
