import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TURNSTILE_SECRET = Deno.env.get('TURNSTILE_SECRET_KEY')!
const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!
const SUPABASE_KEY     = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const RATE_LIMIT_MAX    = 5   // max submissions per IP
const RATE_LIMIT_WINDOW = 60  // per hour (in minutes)

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'content-type, authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const body = await req.json()
    const { turnstileToken, ...fields } = body

    // ── 1. Verify Turnstile token ────────────────────────────────
    if (!turnstileToken) return json({ error: 'Missing CAPTCHA token' }, 400)

    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: TURNSTILE_SECRET, response: turnstileToken }),
    })
    const result = await verification.json()
    if (!result.success) return json({ error: 'CAPTCHA verification failed' }, 403)

    // ── 2. IP-based rate limiting ────────────────────────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
              ?? req.headers.get('cf-connecting-ip')
              ?? 'unknown'

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    if (ip !== 'unknown') {
      const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW * 60 * 1000).toISOString()
      const { count } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('source_ip', ip)
        .gte('created_at', windowStart)

      if ((count ?? 0) >= RATE_LIMIT_MAX) {
        return json({ error: 'Too many requests. Please try again later.' }, 429)
      }
    }

    // ── 3. Insert into contact_messages ─────────────────────────
    const row = {
      name:      fields.name      ?? null,
      email:     fields.email     ?? null,
      phone:     fields.phone     ?? null,
      country:   fields.country   ?? null,
      subject:   fields.subject   ?? 'Contact',
      message:   fields.message   ?? null,
      interests: fields.interests ?? null,
      volume:    fields.volume    ?? null,
      incoterm:  fields.incoterm  ?? null,
      source_ip: ip,
    }

    const { error } = await supabase.from('contact_messages').insert(row)

    if (error) {
      console.error('DB insert error:', JSON.stringify(error))
      return json({ error: 'Database error', detail: error.message }, 500)
    }

    return json({ ok: true })
  } catch (err) {
    console.error('Function error:', err)
    return json({ error: String(err) }, 500)
  }
})
