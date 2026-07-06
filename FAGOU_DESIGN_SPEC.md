# FAGOU — Complete UI/UX Design Specification & Rebuild Prompt

> **Purpose of this document.** This is a precise, exhaustive description of the *current* Fagou website design — every color, font, spacing rule, component, motion, and image-usage pattern exactly as it is built today. Use it as a master prompt to recreate the design in Claude (or any design tool) **without changing what is already in place**: the same image placements, the same layout grammar, the same content structure. This is a faithful re-description, not a redesign brief.

---

## 0. How to use this prompt

When rebuilding, treat the rules below as **hard constraints**:

- Do **not** introduce new fonts, colors, or component styles outside the token set in §2.
- Do **not** change how images are used (§7) — full-bleed hero, card covers, square gallery, striped placeholders, portrait auto-detection all stay.
- Do **not** change page structure, section order, or content (§8).
- Keep the editorial, Swiss-minimal, "agro-industrial luxury" tone: serif display + monospace labels, hairline borders, generous whitespace, restrained green palette, slow cinematic motion.
- Everything is **bilingual (FR/EN)** — every visible string has two versions toggled at runtime.
- Layout is built with **inline React style objects + a small global CSS design-system layer** (Tailwind v4 is imported but the visual system is custom CSS variables + utility classes prefixed `fg-`). No component UI library drives the public look.

---

## 1. Brand identity & art direction

**Who:** FAGOU SRL — a Brussels-based (Rhode-Saint-Genèse, Belgium) agro-food trading house, founded 2013. B2B import/export between Europe and Africa across five departments, plus industrial cold-storage projects.

**Design personality:** Editorial / Swiss-minimalist / "industrial luxury."
- Think high-end architecture monograph crossed with a Kinfolk-style serif editorial.
- Confident negative space, hairline 1px rules everywhere, oversized Fraunces serif headlines with an italic muted-grey accent word, monospace "technical" micro-labels with a `↗` arrow motif.
- Deep forest green as the single brand color; warm off-white paper background. No bright/secondary accent except a muted red reserved for errors/badges.
- Motion is slow, smooth, and cinematic — never bouncy or playful.

**Signature recurring motifs (the "Fagou grammar"):**
1. **`↗` arrow prefix** on eyebrows, section labels, form labels, and "visit/see" links.
2. **Italic muted accent word** inside serif headlines, e.g. *"Cinq départements,* one house.*"* — the second clause is `font-style: italic; color: #6B7280` (or `rgba(255,255,255,0.45)` on dark).
3. **Monospace uppercase micro-labels** with wide letter-spacing for codes, dates, metadata, eyebrows.
4. **Numbered circles** `01 02 03…` (`String(i+1).padStart(2,'0')`) in pale-green discs for steps, partners, advantages.
5. **Hairline dividers** — 1px `#E5E7EB` borders define grids, stat rows, spec tables, list rows. Borders, not cards, do most of the structural work.
6. **Section eyebrow numbering** like `↗ 01 / 06 · Maison` indicating position in the site.

---

## 2. Design tokens (exact values)

### 2.1 Colors
```
--color-primary:        #1A5C1A   (forest green — primary brand, links, eyebrows)
--color-primary-hover:  #154d15
--color-primary-light:  #F2F7F2   (pale green tint — chips, disc backgrounds, hover fills)
--color-secondary:      #2E8B2E   (lighter green — accents, gradient stops)
--color-accent:         #C0392B   (muted red — errors, "new" badge only)
--color-bg:             #FAFAF8   (warm off-white paper — default page background)
--color-bg-alt:         #F5F5F0
--color-text:           #1A1A1A   (near-black body/heading text)
--color-text-muted:     #6B7280   (grey — secondary text, italic accent word, captions)
--color-border:         #E5E7EB   (hairline grey — all dividers/borders)
--color-border-subtle:  #F0F0EC
--color-dark / admin-navy:      #0F3D14   (deep green — dark sections, footer, CTAs)
--color-dark-deep / navy-dark:  #0A2D0C
--color-white:          #FFFFFF
```
Greyscale on dark green uses an off-white `#F2F7F2` and white alphas: `rgba(255,255,255,0.7 / 0.6 / 0.55 / 0.45 / 0.12)`.

### 2.2 Radii
```
--radius-sm: 6px   --radius-md: 10px   --radius-lg: 16px   --radius-xl: 24px   --radius-full: 999px
```
Cards = 10–12px. Buttons & pills = 999px. Inputs = 8px. Badges/chips = 4px.

### 2.3 Shadows
```
--shadow-soft:        0 2px 12px rgba(0,0,0,0.06)
--shadow-card:        0 4px 24px rgba(0,0,0,0.08)
--shadow-card-hover:  0 20px 60px rgba(15,61,20,0.12), 0 4px 16px rgba(15,61,20,0.06)
--shadow-elevated:    0 32px 80px rgba(15,61,20,0.14), 0 8px 24px rgba(15,61,20,0.08)
--shadow-glow:        0 0 40px rgba(26,92,26,0.15)
```
Green-tinted shadows (not neutral black) on hover for cards.

### 2.4 Easing & transitions
```
--transition-fast:    200ms cubic-bezier(0.25,0.46,0.45,0.94)
--transition-normal:  350ms cubic-bezier(0.25,0.46,0.45,0.94)
--transition-slow:    600ms cubic-bezier(0.22,1,0.36,1)
--transition-spring:  500ms cubic-bezier(0.34,1.56,0.64,1)
--ease-out-expo:      cubic-bezier(0.16,1,0.3,1)   ← the signature reveal/hover curve
--ease-out-back:      cubic-bezier(0.34,1.56,0.64,1)
--ease-smooth:        cubic-bezier(0.25,0.46,0.45,0.94)
```
Default hover curve across buttons/cards: `cubic-bezier(0.22,1,0.36,1)`. Reveals use `cubic-bezier(0.16,1,0.3,1)`.

### 2.5 Spacing scale
```
--space-xs:4  sm:8  md:16  lg:24  xl:40  2xl:64  3xl:96  4xl:128 (px)
```
**Horizontal page padding (`px`)**: `20px` mobile / `64px` desktop — used on virtually every section.
**Vertical section padding**: hero `100–180px` top; standard sections `56–120px`; CTA `72–128px`. Mobile values roughly halve.

---

## 3. Typography system (4 fonts, strict roles)

```
--font-display: 'Fraunces', Georgia, serif        → all big headlines (class .fg-fr)
--font-mono:    'JetBrains Mono', ui-monospace     → eyebrows, labels, codes, dates, metadata (class .fg-mono)
--font-body:    'Inter', sans-serif                → paragraphs, descriptions, button text, form inputs
--font-title:   'Montserrat', sans-serif           → legacy/admin only; NOT used on the upgraded public pages
```

**`.fg-fr` (Fraunces display) — the hero of the type system:**
```css
font-family: 'Fraunces', Georgia, serif;
font-weight: 400;            /* always regular weight, never bold */
letter-spacing: -0.035em;    /* headlines tighten to -0.04/-0.045em */
line-height: 0.92;           /* very tight; hero uses 0.90, sections 0.96 */
```
Headline sizing is always fluid `clamp()`:
- Page H1 hero: `clamp(48px, 9vw, 132px)` (home up to `clamp(48px,10vw,144px)`).
- Section H2: `clamp(32px, 4–5vw, 64–76px)`.
- Card H3: `24–44px` fixed.
- Stat numbers: `clamp(28px, 4–5vw, 60–64px)`.

**`.fg-eyebrow`:**
```css
font-family:'JetBrains Mono'; font-size:11px; letter-spacing:0.16em;
text-transform:uppercase; color:#1A5C1A; font-weight:500;
```
`.fg-eyebrow.dark` → `color:#F2F7F2; opacity:0.85`. Always prefixed with `↗` and often a number: `↗ 02 / 06 · Catalogue`.

**Mono micro-labels:** `font-size:9–11px; letter-spacing:0.12–0.18em; text-transform:uppercase; color:#6B7280`. Used for product codes, dates, "references", country names, spec keys.

**Body:** Inter, `font-size:14–18px; line-height:1.55–1.75; color:#6B7280` (muted) or `#1A1A1A` (emphasis). Lead paragraphs 16–18px.

**The headline pattern (use everywhere):**
```
<h2 class="fg-fr">
  Plain first clause,
  <span style="font-style:italic; color:#6B7280">muted italic second clause.</span>
</h2>
```

---

## 4. Buttons (exact CSS)

All buttons: `inline-flex; align-items:center; gap:10px; border-radius:999px; font-family:Inter; font-size:14px; font-weight:500; transition:all 350ms cubic-bezier(0.22,1,0.36,1)`. Hover lifts `translateY(-2px)`; active returns to `0`. Labels frequently end with a trailing `→`.

- **`.btn-primary`** — green fill `#1A5C1A`, white text, `padding:14px 28px`, `box-shadow:0 2px 8px rgba(26,92,26,0.2)`. Has a `::before` diagonal white-gradient sheen that fades in on hover. Hover → bg `#0F3D14`, lift, `box-shadow:0 8px 24px rgba(26,92,26,0.3)`.
- **`.btn-light`** — white fill, green text `#1A5C1A`, used on dark/photo backgrounds. Hover → bg `#F2F7F2`.
- **`.btn-ghost`** — transparent, 1px green border, green text, `padding:13px 27px`. Hover → fills green, white text. `.btn-ghost.dark` → off-white text + `rgba(242,247,242,0.4)` border for dark sections.

**Badges/chips** (`.badge`): mono, `font-size:10px; letter-spacing:0.14em; uppercase; padding:4px 10px; radius:4px`. `.badge-green` = pale-green bg + green text. `.badge-outline` = white bg + hairline border. Product "En stock / In stock" sits as `.badge-green` absolutely positioned top-left over card photos.

---

## 5. Core components

### 5.1 Navigation (`Nav`, fixed, glass-on-scroll)
- **Position:** `fixed; top:0; z-index:20`, full width. Overlays the hero (pages add top padding `100–220px` to compensate).
- **Two variants:** `dark` prop (white text, for hero/photo pages: Home, Brands) vs default (near-black text, for inner pages).
- **Scroll behavior:** transparent at top → on `scrollY>40` becomes frosted glass: bg `rgba(250,250,248,0.85)` (light) / `rgba(15,61,20,0.88)` (dark), `backdrop-filter:blur(16px) saturate(180%)`, 1px bottom border appears, `box-shadow:0 4px 30px rgba(0,0,0,0.06)`. Padding shrinks `24px 64px → 16px 64px`; logo shrinks `40→34`; the `SRL · Bruxelles` tagline fades opacity `1→0`. Transition `400ms cubic-bezier(0.22,1,0.36,1)`.
- **Desktop layout (`fg-desktop-only`, ≥1025px):** left = logo + hairline-divided mono tagline; center = 7 nav links; right = FR/EN pill toggle + a primary/​light "Request a quotation" button.
- **Nav links:** mono, `font-size:11px; letter-spacing:0.14em; uppercase; font-weight:500`. Class `fg-underline-reveal` draws a 1px underline left→right on hover (`width 0→100%, 500ms ease-out-expo`). Active link is full-opacity green/white.
- **Nav items (order):** Maison/House · Catalogue · Marques/Brands · Chambre froide/Cold storage · À propos/About · Conditions/Terms · Contact.
- **Mobile (`fg-mobile-only`, ≤1024px):** compact bar (logo + FR/EN + hamburger). Hamburger is 3 × 22px×1.5px bars that morph into an X (`translateY ± rotate 45°`). Drawer slides open with `max-height 0→80vh; opacity 0→1; 450ms cubic-bezier(0.22,1,0.36,1)`, frosted bg, stacked mono links over hairline borders + full-width primary button.

### 5.2 Footer (deep green, 4-column)
- Background `#0F3D14`, full-width, white text.
- **Top edge:** `.fg-gradient-separator` — a 2px animated gradient line `transparent → #1A5C1A → #2E8B2E → #1A5C1A → transparent`, `background-size:200%`, shifting on a 4s loop.
- Two faint radial-gradient overlays for ambient depth (`opacity 0.015`).
- **Logo + mono tagline** ("Négoce agro-alimentaire, Bruxelles") with hairline left divider.
- **4 columns** (mobile 2): House · Catalogue (mapped from departments) · Capabilities · Legal. Column headers are mono `10px/0.18em uppercase, rgba(242,247,242,0.40)` preceded by a tiny 4px `#2E8B2E` dot.
- **Footer links** (`.fg-footer-link`): **Fraunces serif 18px** (16px mobile), `rgba(255,255,255,0.7)`, with an underline-reveal on hover that brightens to white.
- **Contact row:** phone + `trading@fagou.be` as mono uppercase links + address line; separated by a `rgba(242,247,242,0.12)` hairline.
- **Bottom bar:** copyright `© 2013–{year} Fagou SRL · Rhode-Saint-Genèse, Belgique` and `TVA · BE 0542.382.824 · RPM Bruxelles`, mono 10px.

### 5.3 Cards
- **Standard card:** `background:#fff; border:1px solid #E5E7EB; border-radius:10–12px; overflow:hidden`. Hover → green-tinted shadow (`0 8px 24px rgba(15,61,20,0.08)`), sometimes border turns green.
- **`.fg-card-3d`:** adds `translateY(-4px)` + `0 24px 64px rgba(15,61,20,0.10)` shadow lift on hover (400ms).
- **`TiltCard`** (mouse-parallax): wraps department & brand cards. On mousemove computes pointer offset and applies `perspective(900px) rotateX/rotateY(±intensity deg) translateZ(10px)` plus a directional shadow; resets on leave. `intensity` 5–8 desktop, `0` (disabled) on mobile.
- **Card image hover:** `.fg-card-img` inside `.fg-card-img-wrap` scales `1 → 1.06` over `700ms cubic-bezier(0.22,1,0.36,1)` when the card is hovered.

### 5.4 Forms (Contact, Suppliers)
- **Input style:** `width:100%; padding:14px 16px; border:1px solid #E5E7EB; border-radius:8px; background:#fff; font:Inter 14px; outline:none`.
- **Focus state (signature):** `border-color:#1A5C1A; box-shadow:0 0 0 3px rgba(26,92,26,0.1)` — a soft green focus ring. Applied via `onFocus/onBlur` inline handlers (or `.fg-input:focus`).
- **Labels:** mono `10px/0.14em uppercase #6B7280`, prefixed `↗`, required marked with ` *`.
- **Select/textarea** share the input style; textarea `height:120px; resize:vertical`.
- **Department interest** = toggle pills (mono, rounded-999) that flip to green-filled when active.
- **Submit:** `.btn-primary` with `→`; disabled state `opacity:0.6`. Inline error text muted-red `#C0392B 12px`. A mono helper note sits beside the button. Contact uses Cloudflare Turnstile CAPTCHA (light theme) above submit; success swaps the form for a big Fraunces "Merci. / Thank you." confirmation block.

### 5.5 The `Photo` component (image system — see §7)
Reused on Home, Products, ProductDetail, ColdStorage. Renders an image into a fixed-aspect box (`aspect-ratio` prop, default `4/3`) with `object-fit:cover`. **Auto-detects portrait images** on load (`naturalHeight > naturalWidth`) and switches them to `object-fit:contain` on a pale-green `#EEF2EE` backdrop so packshots never crop awkwardly. When **no image** exists it renders a **diagonal-striped placeholder** (`repeating-linear-gradient(135deg, transparent 0 7px, rgba(15,61,20,0.08) 7px 8px)`) centered with a mono uppercase caption. Dark variant uses `#0F3D14` bg + white stripes.

### 5.6 Page loader
Centered `.fg-loader` (36px ring, 2px `#E5E7EB` track, green `#1A5C1A` top, spinning 0.8s) above a mono "Fagou" wordmark — shown as Suspense fallback for lazy routes.

---

## 6. Motion system

- **Scroll reveal:** an `IntersectionObserver` adds `.sr-visible` when a section enters view (threshold 0.08–0.15), firing `fg-slide-up` (`opacity 0→1, translateY 36px→0, 800ms cubic-bezier(0.16,1,0.3,1)`). Variants: `.sr-left`, `.sr-right`, `.sr-scale`. Staggered children via `.sr-d1…d5` (100–500ms delays). Observer disconnects after first reveal (one-shot).
- **Floating orbs:** decorative blurred radial-gradient circles in hero/CTA sections animate with `fg-float` (7s) / `fg-float-slow` (11s) — gentle `translateY` + micro-rotation loops. Used as ambient depth, `pointer-events:none`.
- **Stat counters:** `.fg-stat` runs `fg-count` (`opacity+translateY+scale`) with `.fg-stat-d1…d4` stagger.
- **Hover lifts:** buttons `-2px`, cards `-4px`, card images `scale 1.06`.
- **Underline reveals:** nav links & "visit" links grow a 1px underline L→R (`fg-underline-reveal`, 500ms).
- **Shimmer/gradient:** `.fg-gradient-text` (animated white shimmer on hero text option), `.fg-gradient-separator` (footer line).
- **Accessibility:** a global `@media (prefers-reduced-motion: reduce)` collapses all animation/transition durations to `0.01ms` and disables smooth scroll. **Always keep this.**

---

## 7. Image usage patterns (KEEP EXACTLY)

This is critical: do not change *where* or *how* images appear.

1. **Full-bleed hero image (Home):** the hero section background is `linear-gradient(160deg, rgba(10,45,12,0.92), rgba(15,61,20,0.85) 50%, rgba(26,92,26,0.80)) , url(cargo) center/cover`. Below the headline a **full-bleed `Photo`** spans edge-to-edge (negative `margin-left/right: -px`) at `21/9` desktop / `4/3` mobile, with a top+bottom green gradient scrim and a mono caption chip ("export · reefer containers · port of antwerp") bottom-left on a blurred dark pill.
2. **Department cards (Home):** each of the 5 department cards leads with a `Photo` cover at `16/10`, image zoom on hover, over a white card with a code/eyebrow, Fraunces title, lede, and a hairline-separated product list.
3. **Cold-storage teaser (Home) & hero (ColdStorage):** a green-overlaid background photo (`linear-gradient(rgba(15,61,20,0.90)…) , url`) with a dot-grid texture overlay and a side photo column; ColdStorage detail page shows a `21/9` main facility photo full-width under the hero.
4. **Product photo band (Home):** a 3-up edge-to-edge row of `Photo`s (volaille / poissons / oignons) at `4/3` (3/2 mobile), revealed with `.sr-scale`.
5. **Product gallery (Home):** a 4-col (2-col mobile) grid of **square (`1/1`)** product packshots, `border-radius:8px`, each with a bottom gradient + mono caption; `loading="lazy"`.
6. **Brand logos (Home teaser + Brands page):** logos centered in white tiles on `#FAFAF8`, constrained by per-brand `logo_max_height/width`, `object-fit:contain`; fallback = brand name in Fraunces.
7. **News cards / detail:** 16:9 cover images via `ImageWithFallback`, `object-fit:cover`, zoom-on-hover in the upgraded card.
8. **Striped placeholders:** anywhere an image is missing, the diagonal-stripe + mono-caption placeholder from §5.5 appears (also used for the About "team" band and Contact map panel as a grid-lined motif with a pulsing green dot).
9. **Portrait packshots** auto-switch to `contain` on `#EEF2EE` (never crop bottles/bags).
10. **Images come from Supabase `site_settings`** with hard-coded `/assets/*.png` fallbacks — keep the settings-key → fallback pattern.

---

## 8. Page-by-page structure (order & content preserved)

> Common: every public page renders `<Nav>` (dark on Home/Brands), a warm `#FAFAF8` body, hairline-bordered sections, and the shared `<Footer>`. Inner pages open with a "sub-hero": `↗ NN / 06 · Label` eyebrow + a `clamp(48px,8–9vw,128px)` Fraunces H1 (plain + italic-muted clause) beside a 17px muted lead.

### 8.1 Home (`dark` nav)
1. **Hero** — eyebrow `↗ 01 / 06 · Maison`; FAGOU logo + identity block; giant H1 *"Négoce **agro-alimentaire,** depuis Bruxelles"* (`clamp(48px,10vw,144px)`, line-height 0.90); two-col lead + CTA buttons (Catalogue → / Download catalogue PDF); 3 floating orbs; full-bleed hero photo w/ caption chip.
2. **Stats row** — 4 cells (2×2 mobile) over hairline borders: 2013 / 5 / Monde / 48 h, each Fraunces number + label + mono sub. `.fg-stat` stagger.
3. **Departments grid** — header (eyebrow + H2 *"Cinq départements, une seule maison."* + lead + PDF button); 2-col grid of `TiltCard` department cards (photo, code, count, Fraunces title, lede, product list).
4. **Cold-storage teaser** — green photo bg + dot grid + orb; left text (eyebrow, H2, copy, 3 inline stats 3 100 t / −24 °C / 2 927 m², CTA), right facility photo.
5. **Brands teaser** — left text + "Discover the brands"; right 2-col grid of brand logo tiles (TiltCard, hover green border + lift).
6. **Testimonials** — 3 cards, each with a top accent gradient hairline (`#1A5C1A / #2E8B2E / #0F3D14`), 5 green ★, italic quote, name + mono role · country.
7. **Process** — eyebrow + H2 *"Sourcer, agréger, expédier."*; 3 columns over a top hairline, each with a numbered green disc + gradient divider line, big Fraunces step title, copy.
8. **Product photo band** — 3 full-bleed photos (`.sr-scale`).
9. **Product gallery** — header + "Browse full catalogue →"; 4-col square packshot grid.
10. **Final CTA** — green-overlaid photo bg + orb; eyebrow `↗ Parler à Fagou`; huge H2 *"Une demande, une cotation sous 48 h."*; lead + Get in touch / Download PDF.

### 8.2 Catalogue / Products
Sub-hero `↗ 02 / 06 · Catalogue`, H1 *"Catalogue Fagou."*. Toolbar: reference count (mono) + PDF download + **Grid/List toggle** (rounded pill segmented control, active = green). Desktop = sticky left **department filter rail** (hairline list, active green/bold, counts) + product area; mobile = horizontal filter pills. **Grid view** = 3-col (2 mobile) `ProductCard` (photo 4/3 w/ "In stock" badge, mono code, Fraunces name, ref). **List view** = hairline rows (`120px 80px 1fr 1fr 110px` desktop / `72px 1fr` mobile) with hover `#F9FAFB` wash.

### 8.3 Product detail
Breadcrumb "← Back to catalogue" (mono) + `↗ {deptCode} · {dept}` eyebrow. Main 2-col: left `Photo 4/3`; right = optional badge (export/premium/new) + availability dot, mono reference, big Fraunces name (`clamp(36px,5vw,76px)`), ref line, pre-line description, **format chips** (bordered), a 2-col **Origin / Incoterms** hairline block, and CTAs (Request a quotation → / Terms PDF). Then a **spec table** (hairline `1fr 2fr` rows, mono keys) if specs exist, and a **related products** 3-col grid (dashed placeholders fill empty slots). 404 state = `↗ Product not found` + Fraunces "404" + back button.

### 8.4 Brands (`dark` nav)
Deep-green hero (`#0F3D14`, eyebrow, H1 *"Des marques que nous distribuons."* + lead). Auto-fill grid (min 280px) of brand `article` cards: top **logo plate** on `#FAFAF8` (min-height 140–160px, contained logo or Fraunces name fallback) over a hairline, then content (Fraunces name, pale-green mono tag chip, description, mono product chips). Loading = green spinner. Bottom legal note in mono.

### 8.5 Cold storage
Sub-hero `↗ 03 / 06 · Chambre froide · équipée par FAGOU`, H1 *"Chambre froide, au Congo."* + client block. Full-width `21/9` facility photo. 4-stat row (3 100 t / −24 °C / 2 927 m² / 24/7, Fraunces value + small unit). **Three rooms** A/B/C: colored numbered disc (`#0F3D14 / #1A5C1A / #2E8B2E`), zone label + Fraunces name, big Fraunces temperature, Volume/Pallets hairline sub-grid, bulleted contents. **Technical spec** hairline table (`1fr 2fr`, mono `↗` keys). **Certifications** chips + **operator (LCC)** card + CTAs. Dark green final CTA *"Besoin de froid en Afrique ?"*.

### 8.6 About
Sub-hero `↗ 04 / 06`, H1 *"Une maison belge, depuis 2013."*. Sections: **Mission** (asymmetric `1fr 1.4fr`), **History** (2-col prose + a 4-step **timeline** over hairlines, green years), **Products** (7 hairline rows: mono index, label, detail, code), **International network** (2-col country grid with flag emoji + Fraunces country + products), **Manifesto** 2×2 (numbered, Fraunces titles), **What we do** (5 hairline service rows), **Commitments** (✓-numbered hairline rows), a **team placeholder band** (striped + Fagou "F" monogram disc), and a dark-green CTA with orb.

### 8.7 Contact
Sub-hero `↗ 06 / 06 · Contact`, H1 *"Parler à Fagou."*. Two-col (`1.4fr 1fr`): left **form** (Company/Country/Email/Phone grid, department interest pills, Volume/Incoterm selects, Message, Turnstile, primary submit + required note) with the green focus-ring inputs; success → Fraunces "Merci."; right **sidebar** = grid-lined map motif with pulsing green dot + hairline contact rows (Head office, Hours, Email, Tel, Web).

### 8.8 Suppliers
Sub-hero `↗ B2B · Fournisseurs`, H1 *"Devenir fournisseur."*. **Advantages** 2×2 hairline grid (numbered disc + gradient line, Fraunces title, copy). **Application form** in a bordered card (`1fr 1.4fr` split, left description, right react-hook-form with green focus rings, inline errors, submit + "Reply within 48 h"). Dark-green CTA.

### 8.9 Enterprises / Partners
Sub-hero `↗ Partenaires`, H1 *"FAGOU & partenaires."*. Auto-fill grid (min 340px) of `.fg-card-3d` partner cards: numbered green disc + Fraunces name + mono country, description, underline-reveal "Visit website →". Dark-green CTA with orb *"Rejoignez notre réseau."*.

### 8.10 News & News detail
**News:** sub-hero `↗ Actualités`, H1 *"Actualités Fagou."*; category **filter pills** (mono rounded, active green) over a hairline; auto-fill (min 340px) article cards (16:9 cover w/ zoom, mono category · dot · date, Fraunces title, 2-line clamp summary). **Detail:** centered 800px column, back link, mono category/date, Fraunces H1, 16:9 hero image, justified prose paragraphs; related-articles grid on a `#F3F4F6` band.

### 8.11 Legal pages (Legal / Terms / Privacy / Cookies)
Centered single-column (`800–900px`), `64px` padding. H1 + (where relevant) "last updated" mono note + PDF download pill. **Terms** = numbered hairline article rows (`48px 1fr`, mono `01…` index in green). **Privacy/Cookies** = sectioned prose with **green-headed hairline tables** (`th` green 13px uppercase w/ 2px green underline; `td` 14px hairline rows), pale-green info call-out boxes, bulleted rights lists. These are the most "document-like" pages — keep them clean, readable, restrained.

### 8.12 404 (NotFound)
`<Nav>` + section with eyebrow `↗ Erreur`, giant green Fraunces "404" (`clamp(80px,15vw,200px)`), H2 *"Page introuvable."*, muted copy, primary "← Back to home".

---

## 9. Responsive rules
- Breakpoint **1024/1025px** splits desktop vs mobile (`fg-desktop-only` / `fg-mobile-only`, plus a `useIsMobile()` hook driving `px` and grid columns).
- Multi-col grids collapse to 1 col (or 2 for stats/galleries/footer) on mobile.
- Section padding and font `clamp()` minimums shrink on mobile; `px` 64→20.
- TiltCard tilt disabled on mobile; tables get `overflow-x:auto`.
- Touch targets stay ≥ ~40–44px (pills, buttons, nav).

## 10. Accessibility & i18n (keep)
- Every visible string is bilingual via `t('fr','en')`; FR/EN pill toggles `LanguageContext`, persisted (`fagou_language`).
- `:focus-visible` → 2px green outline, 2px offset.
- `prefers-reduced-motion` neutralizes all motion.
- `aria-label`/`aria-expanded` on the mobile menu; `aria-pressed` on filter pills; semantic `<article>/<section>/<nav>/<footer>`.
- Cookie consent banner + privacy-first cookie policy; Turnstile (not reCAPTCHA) for spam.

---

## 11. One-paragraph summary prompt (if you need a short version)

> Build a bilingual (FR/EN) editorial B2B website for **Fagou**, a Brussels agro-food trading house, in a Swiss-minimal "industrial-luxury" style. Single brand color **forest green `#1A5C1A`** (+ deep `#0F3D14` for dark sections/footer/CTAs) on warm off-white **`#FAFAF8`**, near-black text **`#1A1A1A`**, grey muted **`#6B7280`**, hairline borders **`#E5E7EB`**. Four-font system: **Fraunces** serif (regular 400, tight `-0.035em`, line-height ~0.92) for all oversized `clamp()` headlines — each headline has a plain clause + an *italic muted-grey* accent clause; **JetBrains Mono** uppercase wide-tracked micro-labels/eyebrows always prefixed `↗` and often numbered (`↗ 02 / 06 · Catalogue`); **Inter** for body and buttons. Rounded-999 buttons that lift `-2px` on hover with green-tinted shadows; white cards with 1px borders, image-zoom (`scale 1.06`) and `-4px` lift on hover, plus mouse-parallax tilt on feature cards. Fixed nav that turns to frosted glass on scroll; deep-green footer with an animated gradient top line and Fraunces serif links. Slow cinematic motion: IntersectionObserver slide-up reveals (`cubic-bezier(0.16,1,0.3,1)`), floating blurred orbs, numbered `01/02/03` green discs for steps, hairline grids/spec-tables, square product galleries, full-bleed green-scrimmed hero photos with mono caption chips, and striped placeholders + portrait auto-`contain` for any image. Respect `prefers-reduced-motion`. Keep all image placements, page structure, and content exactly as specified above.
