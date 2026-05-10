import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CheckCircle, Globe, Award, TrendingUp } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../hooks/useLanguage'
import type { SupplierApplication } from '../types'

export default function Suppliers() {
  const { t } = useLanguage()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SupplierApplication>()

  function onSubmit(_data: SupplierApplication) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success(t('Votre candidature a été envoyée ! Nous vous contacterons sous 48h.', 'Your application has been sent! We will contact you within 48h.'))
        reset()
        resolve()
      }, 800)
    })
  }

  return (
    <div>
      <section style={{ backgroundColor: '#1A5C1A', padding: '72px 24px', textAlign: 'center', color: '#FFFFFF' }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: '16px' }}>
          {t('B2B Fournisseurs', 'B2B Suppliers')}
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          {t(
            'Vous êtes producteur ou fournisseur de produits agroalimentaires ? Rejoignez notre réseau et exportez vos produits vers l\'Afrique et l\'Europe.',
            'Are you a producer or supplier of agri-food products? Join our network and export your products to Africa and Europe.'
          )}
        </p>
      </section>

      <section style={{ backgroundColor: '#F3F4F6', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' }}>
          {[
            { icon: <Globe size={28} color="#1A5C1A" />, titleFr: 'Accès marchés africains', titleEn: 'Access to African markets', descFr: 'Distribuez vos produits dans nos marchés partenaires en Afrique centrale et occidentale.', descEn: 'Distribute your products in our partner markets in Central and West Africa.' },
            { icon: <Award size={28} color="#1A5C1A" />, titleFr: 'Certifications reconnues', titleEn: 'Recognized certifications', descFr: 'Nous valorisons les fournisseurs certifiés CE, ISO, GlobalGAP, RSPO et autres standards.', descEn: 'We value suppliers certified CE, ISO, GlobalGAP, RSPO, and other standards.' },
            { icon: <TrendingUp size={28} color="#1A5C1A" />, titleFr: 'Volumes B2B', titleEn: 'B2B volumes', descFr: 'Commandes en tonnes, palettes et conteneurs complets. Contrats annuels possibles.', descEn: 'Orders in tonnes, pallets, and full containers. Annual contracts possible.' },
            { icon: <CheckCircle size={28} color="#1A5C1A" />, titleFr: 'Partenariat long terme', titleEn: 'Long-term partnership', descFr: '13+ ans d\'expérience. Nous construisons des relations durables avec nos fournisseurs.', descEn: '13+ years of experience. We build lasting relationships with our suppliers.' },
          ].map(({ icon, titleFr, titleEn, descFr, descEn }) => (
            <div key={titleFr} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB' }}>
              <div style={{ marginBottom: '12px' }}>{icon}</div>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{t(titleFr, titleEn)}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>{t(descFr, descEn)}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px' }}>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '28px', textAlign: 'center', marginBottom: '36px' }}>
          {t('Candidater comme fournisseur', 'Apply as a supplier')}
        </h2>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input id="sup-company" label={t('Entreprise *', 'Company *')} error={errors.company?.message} {...register('company', { required: t('Requis', 'Required') })} />
              <Input id="sup-country" label={t('Pays *', 'Country *')} error={errors.country?.message} {...register('country', { required: t('Requis', 'Required') })} />
            </div>
            <Input id="sup-products" label={t('Produits proposés *', 'Products offered *')} error={errors.products?.message} {...register('products', { required: t('Requis', 'Required') })} />
            <Input id="sup-cert" label={t('Certifications', 'Certifications')} placeholder="CE, ISO 22000, GlobalGAP, RSPO…" {...register('certifications')} />
            <Input id="sup-volume" label={t('Volume annuel estimé', 'Estimated annual volume')} placeholder={t('ex: 500 tonnes/an', 'e.g.: 500 tonnes/year')} {...register('annualVolume')} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input id="sup-contact" label={t('Nom contact *', 'Contact name *')} error={errors.contactName?.message} {...register('contactName', { required: t('Requis', 'Required') })} />
              <Input id="sup-phone" type="tel" label={t('Téléphone *', 'Phone *')} error={errors.phone?.message} {...register('phone', { required: t('Requis', 'Required') })} />
            </div>
            <Input id="sup-email" type="email" label={t('Email *', 'Email *')} error={errors.email?.message} {...register('email', { required: t('Requis', 'Required'), pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('Email invalide', 'Invalid email') } })} />
            <Textarea id="sup-message" label={t('Message complémentaire', 'Additional message')} {...register('message')} />
            <Button type="submit" size="lg" disabled={isSubmitting} style={{ width: '100%' }}>
              {isSubmitting ? t('Envoi…', 'Sending…') : t('Envoyer ma candidature', 'Submit my application')}
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
