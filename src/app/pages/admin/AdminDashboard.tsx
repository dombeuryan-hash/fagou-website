import { Package, ShoppingCart, MessageSquare, Users, TrendingUp, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getAllProducts, getAllCategories } from '../../services/productService'
import { getAllArticles } from '../../services/newsService'
import { useAuth } from '../../hooks/useAuth'

const CHART_DATA = [
  { month: 'Jan', commandes: 12 },
  { month: 'Fév', commandes: 19 },
  { month: 'Mar', commandes: 15 },
  { month: 'Avr', commandes: 25 },
  { month: 'Mai', commandes: 22 },
  { month: 'Jun', commandes: 30 },
]

const RECENT_ACTIVITY = [
  { label: 'Devis reçu — AfriCom Distribution', sub: 'Poulet entier congelé · 5 tonnes', time: 'Il y a 2h', dot: '#1A5C1A' },
  { label: 'Nouveau message contact', sub: 'Aminata Diallo · Partenariat Sénégal', time: 'Il y a 5h', dot: '#0F3D14' },
  { label: 'Commande expédiée — Lagos Foods', sub: 'Lait concentré · 2 conteneurs', time: 'Hier', dot: '#B7860B' },
  { label: 'Devis reçu — Dakar Imports', sub: 'Huile de palme · 20 tonnes', time: 'Hier', dot: '#1A5C1A' },
]

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  sub?: string
  accentColor: string
}

function StatCard({ icon, label, value, sub, accentColor }: StatCardProps) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-soft)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: `${accentColor}14`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
        }}>
          {icon}
        </div>
        <ArrowUpRight size={14} color="var(--color-border)" />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '30px', color: 'var(--color-text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {value}
        </p>
        <p className="fg-mono" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gray)', marginTop: '6px' }}>
          {label}
        </p>
        {sub && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-gray)', marginTop: '4px', opacity: 0.7 }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const products = getAllProducts()
  const categories = getAllCategories()
  const articles = getAllArticles()
  const { user } = useAuth()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* En-tête */}
      <div>
        <span className="fg-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
          Tableau de bord
        </span>
        <h1 style={{
          fontFamily: 'var(--font-title)',
          fontWeight: 800,
          fontSize: '28px',
          color: 'var(--color-text)',
          letterSpacing: '-0.02em',
          marginBottom: '4px',
        }}>
          Bienvenue{user ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-gray)' }}>
          Vue d'ensemble de l'activité FAGOU SRL
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard icon={<Package size={20} />}      label="Produits catalogue"  value={products.length}   sub={`${categories.length} catégories`}  accentColor="var(--color-admin-navy)" />
        <StatCard icon={<ShoppingCart size={20} />} label="Commandes & devis"   value={47}                sub="Ce mois-ci"                           accentColor="var(--color-primary)" />
        <StatCard icon={<MessageSquare size={20} />} label="Messages en attente" value={3}                sub="2 non lus"                            accentColor="var(--color-accent)" />
        <StatCard icon={<Users size={20} />}         label="Utilisateurs"        value={3}                sub="Tous actifs"                          accentColor="#B7860B" />
        <StatCard icon={<TrendingUp size={20} />}    label="Articles publiés"    value={articles.length}  sub="Actualités"                          accentColor="var(--color-secondary)" />
      </div>

      {/* Graphique + Activité récente */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>

        {/* Graphique commandes */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-soft)',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <span className="fg-eyebrow" style={{ display: 'block', marginBottom: '6px' }}>Évolution</span>
            <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '18px', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
              Commandes par mois
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={CHART_DATA} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-gray)', letterSpacing: '0.08em' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-gray)' }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
                cursor={{ fill: 'var(--color-bg)' }}
              />
              <Bar dataKey="commandes" fill="var(--color-admin-navy)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activité récente */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-soft)',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <span className="fg-eyebrow" style={{ display: 'block', marginBottom: '6px' }}>En temps réel</span>
            <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '18px', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
              Activité récente
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '14px',
                paddingBottom: i < RECENT_ACTIVITY.length - 1 ? '18px' : '0',
                marginBottom: i < RECENT_ACTIVITY.length - 1 ? '18px' : '0',
                borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <div style={{ paddingTop: '4px', flexShrink: 0 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.dot }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-gray)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.sub}
                  </p>
                  <p className="fg-mono" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--color-border)', marginTop: '4px' }}>
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note mock */}
      <p className="fg-mono" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--color-border)', textAlign: 'right' }}>
        Données mock — connecter à l'API backend pour les données réelles
      </p>
    </div>
  )
}
