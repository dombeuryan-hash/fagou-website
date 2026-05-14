import { useState, useEffect } from 'react'
import { Package, MessageSquare, BookOpen, ArrowUpRight, MailOpen, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllProducts, getAllCategories } from '../../services/productService'
import { getAllArticles } from '../../services/newsService'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'
import { ROUTES } from '../../constants'

interface RecentMessage {
  id: string
  name: string
  email: string
  country: string | null
  read: boolean
  created_at: string
}

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
  const [messages, setMessages] = useState<RecentMessage[]>([])
  const [loadingMsgs, setLoadingMsgs] = useState(true)

  useEffect(() => {
    supabase
      .from('contact_messages')
      .select('id, name, email, country, read, created_at')
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setMessages(data ?? [])
        setLoadingMsgs(false)
      })
  }, [])

  const unread = messages.filter((m) => !m.read).length
  const recent = messages.slice(0, 5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* En-tête */}
      <div>
        <span className="fg-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>Tableau de bord</span>
        <h1 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '28px', color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Bienvenue{user ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-gray)' }}>
          Vue d'ensemble de l'activité FAGOU SRL
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard icon={<Package size={20} />}      label="Produits catalogue"  value={products.length}    sub={`${categories.length} catégories`}           accentColor="var(--color-admin-navy)" />
        <StatCard icon={<MessageSquare size={20} />} label="Messages reçus"      value={loadingMsgs ? '…' : messages.length} sub="Total boîte de réception" accentColor="var(--color-primary)" />
        <StatCard icon={<MailOpen size={20} />}      label="Non lus"             value={loadingMsgs ? '…' : unread}          sub={unread === 0 ? 'Tout est lu' : `${unread} en attente`} accentColor="var(--color-accent)" />
        <StatCard icon={<BookOpen size={20} />}      label="Articles publiés"    value={articles.length}   sub="Actualités"                                  accentColor="var(--color-secondary)" />
      </div>

      {/* Messages récents */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span className="fg-eyebrow" style={{ display: 'block', marginBottom: '6px' }}>Boîte de réception</span>
            <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '18px', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
              Messages récents
            </h2>
          </div>
          <Link
            to={ROUTES.ADMIN_MESSAGES}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-primary)', fontWeight: 500 }}
          >
            Voir tout <LinkIcon size={13} />
          </Link>
        </div>

        {loadingMsgs ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-gray)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
            Chargement…
          </div>
        ) : recent.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-gray)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
            Aucun message reçu pour le moment.
          </div>
        ) : (
          <div>
            {recent.map((msg, i) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 28px',
                  borderBottom: i < recent.length - 1 ? '1px solid var(--color-border)' : 'none',
                  backgroundColor: msg.read ? 'transparent' : '#F0F7F0',
                }}
              >
                <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, backgroundColor: msg.read ? 'var(--color-border)' : '#1A5C1A' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: msg.read ? 400 : 600, fontSize: 14, color: 'var(--color-text)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-gray)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.email}{msg.country ? ` · ${msg.country}` : ''}
                  </p>
                </div>
                <p className="fg-mono" style={{ fontSize: 10, color: 'var(--color-gray)', letterSpacing: '0.08em', flexShrink: 0 }}>
                  {new Date(msg.created_at).toLocaleDateString('fr-BE')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
