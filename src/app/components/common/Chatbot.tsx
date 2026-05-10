import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

const E = {
  commercial: ['commercial', 'fagou.be'].join('@'),
  contact:    ['contact',    'fagou.be'].join('@'),
}

interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
}

function getBotResponse(userMessage: string, language: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('produit') || msg.includes('product')) {
    return language === 'fr'
      ? 'Nous proposons 22 produits dans 9 catégories : laitiers, légumes, viandes, poissons, huiles et plus. Visitez notre page Produits pour découvrir notre catalogue complet.'
      : 'We offer 22 products in 9 categories: dairy, vegetables, meats, fish, oils and more. Visit our Products page to discover our full catalogue.'
  }

  if (msg.includes('devis') || msg.includes('quote') || msg.includes('commande') || msg.includes('order')) {
    return language === 'fr'
      ? `Pour obtenir un devis, utilisez le bouton "Devis" sur la page de chaque produit ou contactez-nous à ${E.commercial}. Nous répondons sous 24h.`
      : `To get a quote, use the "Quote" button on each product page or contact us at ${E.commercial}. We respond within 24h.`
  }

  if (msg.includes('contact') || msg.includes('telephone') || msg.includes('phone') || msg.includes('email')) {
    return language === 'fr'
      ? `Vous pouvez nous joindre par email à ${E.contact} ou par téléphone au +32 2 XXX XX XX. Notre équipe est disponible du lundi au vendredi.`
      : `You can reach us by email at ${E.contact} or by phone at +32 2 XXX XX XX. Our team is available Monday to Friday.`
  }

  if (msg.includes('livraison') || msg.includes('delivery') || msg.includes('expédition') || msg.includes('shipping')) {
    return language === 'fr'
      ? 'FAGOU SRL gère la logistique internationale vers l\'Europe et l\'Afrique, y compris le transport réfrigéré et la gestion de conteneurs.'
      : 'FAGOU SRL manages international logistics to Europe and Africa, including refrigerated transport and container management.'
  }

  return language === 'fr'
    ? 'Merci pour votre message ! Pour toute question détaillée, contactez-nous à contact@fagou.be ou consultez notre page Contact. Notre équipe vous répondra rapidement.'
    : 'Thank you for your message! For detailed questions, contact us at contact@fagou.be or visit our Contact page. Our team will respond quickly.'
}

export function Chatbot() {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: language === 'fr'
        ? 'Bonjour ! Je suis l\'assistant FAGOU SRL. Comment puis-je vous aider ?'
        : 'Hello! I am the FAGOU SRL assistant. How can I help you?',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const text = inputValue.trim()
    if (!text) return

    const userMessage: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text }
    const botMessage: ChatMessage = {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: getBotResponse(text, language),
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setInputValue('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t('Ouvrir le chat', 'Open chat')}
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#1A5C1A',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(26,92,26,0.4)',
          zIndex: 9998,
          transition: 'transform 200ms ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={t('Chat avec FAGOU SRL', 'Chat with FAGOU SRL')}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '340px',
            maxHeight: '460px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
            zIndex: 9997,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #E5E7EB',
          }}
        >
          <div style={{ backgroundColor: '#1A5C1A', padding: '16px', color: '#FFFFFF' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '15px' }}>
              FAGOU SRL
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', opacity: 0.85 }}>
              {t('Assistant en ligne', 'Online assistant')}
            </p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    backgroundColor: msg.sender === 'user' ? '#1A5C1A' : '#F3F4F6',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#1A1A1A',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    lineHeight: 1.5,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('Écrivez un message…', 'Write a message…')}
              aria-label={t('Message', 'Message')}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              aria-label={t('Envoyer', 'Send')}
              style={{
                backgroundColor: '#1A5C1A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
