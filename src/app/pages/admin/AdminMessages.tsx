import { useState, useEffect } from 'react'
import { MessageSquare, Trash2, Mail, MailOpen, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'

interface Message {
  id: string
  name: string
  country: string | null
  email: string
  phone: string | null
  subject: string | null
  interests: string[] | null
  volume: string | null
  incoterm: string | null
  message: string | null
  read: boolean
  created_at: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(data ?? [])
    setLoading(false)
  }

  async function markRead(msg: Message) {
    if (msg.read) return
    await supabase.from('contact_messages').update({ read: true }).eq('id', msg.id)
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m))
    if (selected?.id === msg.id) setSelected({ ...msg, read: true })
  }

  async function handleDelete(id: string) {
    await supabase.from('contact_messages').delete().eq('id', id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (selected?.id === id) setSelected(null)
    toast.success('Message supprimé')
  }

  function handleOpen(msg: Message) {
    setSelected(msg)
    markRead(msg)
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <span className="fg-eyebrow" style={{ display: 'block', marginBottom: 8 }}>Boîte de réception</span>
        <h1 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 28, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Messages contact
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-gray)' }}>
          {unread > 0 ? `${unread} message${unread > 1 ? 's' : ''} non lu${unread > 1 ? 's' : ''}` : 'Tous les messages sont lus'}
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader2 size={24} color="#6B7280" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      ) : messages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-gray)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
          <MessageSquare size={32} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          Aucun message pour le moment.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: 20, alignItems: 'start' }}>

          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpen(msg)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${selected?.id === msg.id ? 'var(--color-admin-navy)' : msg.read ? 'var(--color-border)' : '#1A5C1A'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {!msg.read && <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#1A5C1A', flexShrink: 0 }} />}
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {msg.name}
                    </p>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-gray)', flexShrink: 0 }}>{msg.country}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-gray)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.email}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span className="fg-mono" style={{ fontSize: 10, color: 'var(--color-gray)', letterSpacing: '0.08em' }}>
                    {new Date(msg.created_at).toLocaleDateString('fr-BE')}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(msg.id) }}
                    style={{ padding: 6, border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', borderRadius: 4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C0392B')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', boxShadow: 'var(--shadow-soft)', position: 'sticky', top: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 20, color: 'var(--color-text)', margin: '0 0 4px' }}>{selected.name}</h2>
                  <p className="fg-mono" style={{ fontSize: 11, color: 'var(--color-gray)', letterSpacing: '0.1em' }}>{selected.country}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {selected.read
                    ? <MailOpen size={16} color="var(--color-gray)" />
                    : <Mail size={16} color="#1A5C1A" />}
                  <button onClick={() => handleDelete(selected.id)} style={{ padding: 6, border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {(
                [
                  ['Email', selected.email],
                  selected.phone ? ['Téléphone', selected.phone] : null,
                  selected.volume ? ['Volume', selected.volume] : null,
                  selected.incoterm ? ['Incoterm', selected.incoterm] : null,
                  selected.interests?.length ? ['Intérêts', selected.interests.join(', ')] : null,
                ] as ([string, string] | null)[]
              ).filter((r): r is [string, string] => r !== null).map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                  <span className="fg-mono" style={{ fontSize: 10, color: 'var(--color-gray)', letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'center' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text)' }}>{v}</span>
                </div>
              ))}

              {selected.message && (
                <div style={{ marginTop: 20 }}>
                  <p className="fg-mono" style={{ fontSize: 10, color: 'var(--color-gray)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Message</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-text)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>
              )}

              <a
                href={`mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent(`Re: Demande FAGOU — ${selected.name}`)}`}
                className="btn-primary"
                style={{ display: 'inline-flex', marginTop: 24, fontSize: 13 }}
              >
                Répondre par email →
              </a>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
