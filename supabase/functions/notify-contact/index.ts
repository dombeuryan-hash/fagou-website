import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const TO_EMAIL      = 'trading@fagou.be'
const FROM_EMAIL    = 'noreply@mail.fagou.be'

serve(async (req) => {
  try {
    const payload = await req.json()
    const record  = payload.record

    if (!record?.email) {
      return new Response('no record', { status: 200 })
    }

    const isQuote = typeof record.subject === 'string' && record.subject.startsWith('Devis')

    const rows: [string, string][] = [
      ['Société / Nom', record.name                   ?? '—'],
      ['Email',         record.email                  ?? '—'],
      ['Téléphone',     record.phone                  ?? null],
      ['Pays',          record.country                ?? null],
      ['Sujet',         record.subject                ?? null],
      ['Volume',        record.volume                 ?? null],
      ['Incoterm',      record.incoterm               ?? null],
      ['Intérêts',      record.interests?.join(', ')  ?? null],
      ['Message',       record.message                ?? null],
    ].filter((r): r is [string, string] => r[1] !== null)

    const tableRows = rows.map(([k, v], i) => `
      <tr style="background:${i % 2 === 0 ? '#ffffff' : '#F9FAFB'};">
        <td style="padding:10px 14px;font-weight:600;color:#6B7280;width:150px;font-family:sans-serif;font-size:13px;vertical-align:top;">${k}</td>
        <td style="padding:10px 14px;color:#1A1A1A;font-family:sans-serif;font-size:13px;white-space:pre-wrap;">${
          k === 'Email'
            ? `<a href="mailto:${v}" style="color:#1A5C1A;">${v}</a>`
            : v
        }</td>
      </tr>`).join('')

    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F3F4F6;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <div style="background:#0F3D14;padding:24px 28px;">
      <p style="margin:0;font-family:sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);">FAGOU SRL — Administration</p>
      <h1 style="margin:8px 0 0;font-family:sans-serif;font-size:20px;font-weight:700;color:#ffffff;">
        ${isQuote ? '📋 Nouvelle demande de devis' : '📩 Nouveau message contact'}
      </h1>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;">
      ${tableRows}
    </table>
    <div style="padding:16px 28px;background:#F9FAFB;border-top:1px solid #E5E7EB;">
      <p style="margin:0;font-family:sans-serif;font-size:11px;color:#9CA3AF;">
        Reçu le ${new Date(record.created_at ?? Date.now()).toLocaleString('fr-BE', { timeZone: 'Europe/Brussels' })}
      </p>
    </div>
  </div>
</body>
</html>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:     `FAGOU SRL <${FROM_EMAIL}>`,
        to:       [TO_EMAIL],
        reply_to: record.email,
        subject:  isQuote
          ? `📋 Devis — ${record.name} (${record.country ?? '?'})`
          : `📩 Message — ${record.name} (${record.country ?? '?'})`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return new Response(JSON.stringify({ error: err }), { status: 500 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('Function error:', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})
