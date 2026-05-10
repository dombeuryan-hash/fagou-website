import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Select } from '../ui/Select'
import { useLanguage } from '../../hooks/useLanguage'
import type { QuoteRequest } from '../../types'
import { QUOTE_UNITS } from '../../constants'

const SUBMIT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string

interface QuoteModalProps {
  productName: string
  productId: string
  onClose: () => void
}

type QuoteFormValues = Omit<QuoteRequest, 'productId'>

export function QuoteModal({ productName, productId, onClose }: QuoteModalProps) {
  const { t } = useLanguage()
  const overlayRef = useRef<HTMLDivElement>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuoteFormValues>()

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement
    overlayRef.current?.focus()
    return () => previousFocus?.focus()
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  async function onSubmit(data: QuoteFormValues) {
    if (!captchaToken) {
      toast.error(t('Veuillez compléter le CAPTCHA.', 'Please complete the CAPTCHA.'))
      return
    }
    const res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        turnstileToken: captchaToken,
        name: `${data.contactName} (${data.company})`,
        email: data.email,
        phone: data.phone || null,
        subject: `Devis — ${productName} [${productId}]`,
        volume: `${data.quantity} ${data.unit}`,
        message: data.message || null,
        interests: [productId],
      }),
    })
    turnstileRef.current?.reset()
    setCaptchaToken(null)
    if (!res.ok) {
      toast.error(t('Une erreur est survenue. Veuillez réessayer.', 'An error occurred. Please try again.'))
      return
    }
    toast.success(t('Votre demande de devis a été envoyée !', 'Your quote request has been sent!'))
    onClose()
  }

  const unitOptions = QUOTE_UNITS.map((u) => ({ value: u, label: u }))

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('Demander un devis', 'Request a quote')}
      tabIndex={-1}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF', borderRadius: '16px', maxWidth: '560px', width: '100%',
          maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px' }}>
              {t('Demander un devis', 'Request a quote')}
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
              {productName}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t('Fermer', 'Close')}
            style={{ padding: '6px', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: 'transparent', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              id="contactName"
              label={t('Nom complet *', 'Full name *')}
              error={errors.contactName?.message}
              {...register('contactName', { required: t('Champ requis', 'Required field') })}
            />
            <Input
              id="company"
              label={t('Entreprise *', 'Company *')}
              error={errors.company?.message}
              {...register('company', { required: t('Champ requis', 'Required field') })}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              id="email"
              type="email"
              label={t('Email *', 'Email *')}
              error={errors.email?.message}
              {...register('email', {
                required: t('Champ requis', 'Required field'),
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('Email invalide', 'Invalid email') },
              })}
            />
            <Input
              id="phone"
              type="tel"
              label={t('Téléphone *', 'Phone *')}
              error={errors.phone?.message}
              {...register('phone', { required: t('Champ requis', 'Required field') })}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              id="quantity"
              type="number"
              label={t('Quantité *', 'Quantity *')}
              min="1"
              error={errors.quantity?.message}
              {...register('quantity', { required: t('Champ requis', 'Required field'), min: { value: 1, message: t('Minimum 1', 'Minimum 1') } })}
            />
            <Select
              id="unit"
              label={t('Unité *', 'Unit *')}
              options={unitOptions}
              {...register('unit', { required: true })}
            />
          </div>
          <Textarea
            id="message"
            label={t('Message (optionnel)', 'Message (optional)')}
            placeholder={t('Précisez vos besoins, délais, conditionnement souhaité…', 'Specify your needs, lead times, desired packaging…')}
            {...register('message')}
          />

          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
            onError={() => setCaptchaToken(null)}
            options={{ theme: 'light' }}
          />

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('Annuler', 'Cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('Envoi…', 'Sending…') : t('Envoyer le devis', 'Send quote request')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
