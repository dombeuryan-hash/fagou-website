import { ShoppingCart } from 'lucide-react'

const MOCK_ORDERS = [
  { id: 'ORD-001', client: 'AfriCom Distribution', product: 'Poulet Entier Congelé', quantity: '5 tonnes', status: 'En cours', date: '2024-11-20' },
  { id: 'ORD-002', client: 'Sénégal Fresh', product: 'Oignons Rouges', quantity: '10 tonnes', status: 'Expédié', date: '2024-11-18' },
  { id: 'ORD-003', client: 'Lagos Foods Ltd', product: 'Lait Concentré Entier', quantity: '2 conteneurs', status: 'Livré', date: '2024-11-15' },
  { id: 'ORD-004', client: 'Dakar Imports', product: 'Huile de Palme Raffinée', quantity: '20 tonnes', status: 'En attente', date: '2024-11-22' },
]

const STATUS_COLORS: Record<string, string> = {
  'En cours': '#B7860B',
  'Expédié': '#1F3864',
  'Livré': '#1A5C1A',
  'En attente': '#6B7280',
}

export default function AdminOrders() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <ShoppingCart size={24} color="#1F3864" />
        <div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '28px' }}>Commandes & Devis</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280' }}>Données mock — connecter à une API pour les données réelles</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              {['ID', 'Client', 'Produit', 'Quantité', 'Statut', 'Date'].map((h) => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#6B7280', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order, index) => (
              <tr key={order.id} style={{ borderBottom: index < MOCK_ORDERS.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1F3864' }}>{order.id}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>{order.client}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280' }}>{order.product}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280' }}>{order.quantity}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ backgroundColor: `${STATUS_COLORS[order.status] ?? '#6B7280'}20`, color: STATUS_COLORS[order.status] ?? '#6B7280', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '12px', padding: '3px 10px', borderRadius: '12px' }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B7280' }}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
