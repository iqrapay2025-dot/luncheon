# Figma Make Prompt — MSSN UNILORIN Grand Luncheon Registration Site

Copy everything below into Figma Make as your build prompt.

---

## PROJECT OVERVIEW

Design and build a responsive registration website for "The First Grand Luncheon" hosted by MSSN UNILORIN (Muslim Students' Society of Nigeria, University of Ilorin Branch). This is an Islamic student organization event combining a graduating-students send-forth, awards presentation, madrasah graduation (haflah), alumni association launch, bus donation drive, and new executive council introduction. The site must feel warm, dignified, and celebratory — not corporate, not generic SaaS. Think: mosque architecture, festive gathering, gratitude and honor, not "startup landing page."

Build 4 pages: **Landing Page**, **Registration Form** (multi-step, 8 sections), **Confirmation Page**, **FAQ Page**.

---

## DESIGN SYSTEM

### Color Palette
- `--purple-deep`: #3D1550 — primary brand color, hero backgrounds, headers
- `--purple-royal`: #5B2C74 — gradient partner to purple-deep, hover states
- `--gold`: #FFC153 — accents, borders, CTAs, icons, dividers
- `--gold-light`: #E8C784 — hover states on gold elements, subtle highlights
- `--cream`: #F5EDE0 — main light background for form/content sections
- `--off-white`: #FDF8F0 — cards on cream background, text on dark backgrounds
- `--ink`: #1A1A2E — body text color (not pure black — softer, warmer)
- `--success-green`: #4A7C59 — verified/success states only, muted not neon
- `--error-red`: #A63D40 — validation errors, muted brick tone not alarm-red

### Typography
- **Display font** (headings, hero text): A serif with flourish and warmth — use "Playfair Display" or similar elegant serif with high-contrast strokes, evoking the calligraphic feel of "Grand Luncheon" lettering
- **Body font** (all UI text, form labels, paragraphs): "Inter" or "Manrope" — clean, highly legible sans-serif, used at generous line-height for readability in long-form registration
- **Utility font**: same sans-serif, smaller weight, for captions/helper text
- **Type scale**:
  - H1: 56px/64px (desktop) / 36px (mobile), Display font, weight 700
  - H2: 36px/44px / 28px mobile, Display font, weight 600
  - H3: 24px/32px, Display font, weight 600
  - Body Large: 18px/28px, Body font, weight 400
  - Body: 16px/24px, Body font, weight 400
  - Caption/Label: 13px/18px, Body font, weight 500, letter-spacing 0.02em

### Layout Motifs (derived from the event flyer)
- **Arch shape**: a pointed mosque-arch silhouette (like a mihrab/window) used as a recurring container shape — hero section background, card tops, success page badge frame, section dividers
- **Gold hairline borders**: 1px gold rules separating sections, echoing the flyer's gold pillar borders
- **Minaret/dome silhouettes**: subtle, low-opacity (5–8%) background illustrations on section edges — never competing with content
- **Generous whitespace**: padding of at least 80px vertical between major sections on desktop, 48px on mobile

### Signature Element
The **arch-topped card** — every card (package card, FAQ item, confirmation summary) has a subtle pointed-arch top edge instead of a plain rectangle corner, tying every component back to the mosque architecture theme without being literal or overdone.

### Motion
- Hero section: gentle fade-up + stagger reveal on page load (logo → headline → subhead → CTA, 100ms stagger)
- Package cards: subtle lift + gold glow on hover (`transform: translateY(-4px)`, box-shadow gold at 20% opacity)
- Form step transitions: horizontal slide (next = slide left, back = slide right), 300ms ease
- Success page: arch badge draws in with a checkmark path animation on load
- Respect `prefers-reduced-motion` — disable slide/stagger, keep only opacity fades

---

## PAGE 1: LANDING PAGE

### Navbar (sticky)
- Left: MSSN UNILORIN logo lockup (crescent-and-book emblem + university crest, as shown on flyer)
- Center/Right: nav links — Home, About, Packages, FAQ, Contact
- Far right: "Register Now" button, gold fill, purple text, pill-shaped
- On scroll past hero: navbar background transitions from transparent to solid `--purple-deep` with subtle shadow

### Hero Section
- Full-bleed background: `--purple-deep` to `--purple-royal` gradient, with faint arch/minaret line-art pattern at low opacity
- Centered content, arch-shaped light glow behind the logo lockup
- Eyebrow text: "MUSLIM STUDENTS' SOCIETY OF NIGERIA — UNIVERSITY OF ILORIN BRANCH" — small caps, gold, letter-spaced
- "PRESENTS" — thin, wide-tracked, off-white
- H1: "The First Grand Luncheon" — Display font, off-white with gold underline flourish beneath "Grand Luncheon"
- Subhead: "A celebration of send-forth, achievement, and giving back" — Body Large, off-white at 85% opacity
- Event info row (3 pill badges side by side): Date: Coming Soon | Time: Coming Soon | Venue: Coming Soon — gold outline, transparent fill, small icon each (calendar, clock, pin)
- Two CTAs: "Register Now" (solid gold, primary) and "See What's Included" (ghost/outline, off-white border) — side by side, stack on mobile

### Featuring Section (background: cream)
- Section eyebrow: "WHAT TO EXPECT"
- H2: "Featuring"
- 6-item grid (3x2 desktop, 1 column mobile), each item as an arch-topped card:
  1. Send-forth for Graduating Students
  2. Awards & Certificate Presentation
  3. Haflah for Madrasah Graduands
  4. Launch of the MSSN Alumni Association
  5. MSSN Bus Donation Drive
  6. Introduction of the New Executive Council
- Each card: small gold icon top (graduation cap, certificate ribbon, open book, handshake, bus, podium respectively), bold title, one-line description in muted ink color
- Cards have the signature arch-top shape, off-white fill, thin gold border

### Package Selection Section (background: purple-deep, inverted contrast from surrounding cream sections)
- H2: "Choose Your Package" — off-white
- Subtext: clarify free-attendance policy here (placeholder pending committee confirmation)
- 4 cards in a row (desktop), horizontal scroll or stacked (mobile): Barakah, Fadl, Ihsan, Ikram
- Each card: off-white background, arch-top, gold price tag badge, package name in Display font, included items as a short bullet list ("Food" + "[Tier] Souvenir"), "Select [Name]" button at bottom (gold outline, fills solid gold on hover)
- Ikram card visually distinguished: gold border instead of thin outline, small "VIP" ribbon badge in corner

### Alumni & Bus Donation Teaser (background: cream)
- Two-column layout (stack on mobile)
- Left: "Join the MSSN Alumni Association 1.0" — short paragraph, "Learn More" link scrolling to relevant form section
- Right: "Support the Bus Donation Drive" — short paragraph, same link treatment
- Each side has a small relevant icon (graduation cap / bus)

### Sponsorship & Enquiries Section (background: purple-deep)
- H3: "For Sponsorship and Enquiries" — off-white
- Three contact cards side by side: Chairman (08160909017), Ameer (09077479849), Vice Chairman (09071107564) — each as a small pill with a phone icon
- Social row below: Facebook / Telegram / X icons, linking to @MssnUnilorin, gold icon color

### Footer (background: ink/near-black purple, darkest tone on page)
- Logo + "MSSN UNILORIN" wordmark
- Quick links column: Home, Register, FAQ, Contact
- "Questions? Visit our FAQ" text link
- Bottom bar: "© 2026 MSSN UNILORIN. All rights reserved." — small, muted gold-grey

---

## PAGE 2: REGISTRATION FORM

### Layout Shell
- Cream background throughout
- Top: slim progress stepper bar — 8 segments (dynamically 7 if Ikram not selected), filled gold for completed/current steps, outline for upcoming, with step label visible on desktop ("1. Attendee Info," "2. Package," etc.) and just numbered dots on mobile
- Below stepper: current section title (H2, purple-deep) + short helper subtext
- Main content area: centered card, max-width ~640px, off-white background, arch-top shape, generous internal padding (48px desktop / 24px mobile)
- **Desktop only**: right-hand sticky sidebar (280px wide) — "Your Selection" summary panel, purple-deep background, off-white text, updates live: Package name + price, Meal choice, running total. Sticks in viewport as user scrolls/steps through form.
- **Mobile**: summary becomes a collapsible bottom sheet, tap to expand, shows same info
- Bottom of card: "Back" (ghost button, left) and "Next"/"Submit" (solid gold, right) — Next disabled (greyed, 40% opacity) until required fields valid

### Section 1 — Attendee Information
- Form fields stacked vertically, generous spacing (24px between fields)
- Full Name — text input, gold focus ring
- Phone/WhatsApp Number — tel input with Nigerian flag prefix icon
- Email Address — text input, labeled "(optional)" in muted caption text
- Gender — two-option toggle/segmented control (Male/Female)
- Department — text input or searchable dropdown
- Level — segmented control or dropdown: Student / Graduate Alumni / Haflah Graduate
- Matric Number — text input; if Level = Haflah Graduate, this field disables and shows placeholder "N/A" with a strikethrough label

### Section 2 — Package Selection
- 4 large selectable cards, stacked vertically on mobile, 2x2 grid on tablet, single row on desktop
- Each card: radio-style selection (entire card clickable), selected state = gold border + gold checkmark badge top-right + subtle gold-tinted background fill
- Card content: package name (Display font), price (large, bold), included items list
- Selecting updates the sticky sidebar total instantly with a brief highlight animation

### Section 3 — Meal Selection
- 5 selectable pill/card options in a wrap-grid, single-select
- Simple: meal name + small food icon per option (rice bowl icon variants, or a generic plate icon if custom icons aren't available)
- Selected state: gold fill, off-white text

### Section 4 — Ikram Customization (conditional)
- Only renders in the flow if Package = Ikram; otherwise this step is entirely skipped (stepper auto-adjusts numbering)
- Yes/No toggle: "Would you like special name customization on your souvenir?"
- If Yes: text field reveals with slide-down animation, character counter (0/50), placeholder: "e.g., your preferred name or short inscription"

### Section 5 — Payment Information
- Read-only display block (gold-bordered box, cream fill) showing:
  - Amount to Pay: large, bold, auto-populated from Section 2
  - Bank: GTBank
  - Account Number: 0588812694 (with a small "Copy" icon button beside it)
  - Account Name: Zakariyah Habeeb-llahi Mukadam
- Below: "Name Used for Payment" text input
- Below: File upload dropzone — dashed gold border, upload icon, "Drag & drop your receipt, or click to browse" — accepts .jpg/.png/.pdf, shows thumbnail preview + filename + remove(x) button once uploaded
- Helper caption below: "Please ensure your name and amount are visible in the receipt. Verification may take up to 24 hours."

### Section 6 — Alumni Group Interest
- Visually distinct sub-background (subtle cream-to-gold-tint gradient) to signal "optional, separate from payment"
- Yes/No toggle: "Are you interested in joining the MSSN Alumni Group 1.0?"
- If Yes: two fields reveal — Graduation Year (dropdown, range 1990–2026) and Current Occupation/Field (text input)

### Section 7 — Bus Donation Drive
- Same distinct sub-background treatment as Section 6
- Yes/No toggle: "Would you like to contribute to the bus donation fund?"
- If Yes: Pledge Amount (numeric input) OR checkbox "I'll decide on the day" (checking this disables/clears the numeric field)

### Section 8 — Final Confirmation
- Full summary displayed as a receipt-style list: label/value pairs for every prior section's answers, grouped under mini-headers (Attendee Info / Package / Meal / Payment / Alumni / Bus Donation)
- Each group has a small "Edit" text link (gold) that jumps back to that section without losing other data
- Uploaded receipt thumbnail shown in the Payment group
- Confirmation checkbox (large, easy to tap on mobile): "By submitting this form, I confirm that the information provided is accurate and that I have selected the package and meal option I intend to receive. There would be no change after submission."
- "Submit Registration" button — solid gold, full-width on mobile, disabled until checkbox checked, shows spinner + "Submitting..." state on click, disabled after first click to prevent double-submit

---

## PAGE 3: CONFIRMATION PAGE

- Full-bleed `--purple-deep` background
- Centered content, max-width 480px
- Large arch-shaped badge at top with a gold checkmark icon inside, drawn-in animation on load
- H2: "Registration Received" — off-white
- Subtext: "Pending Payment Verification" — gold, medium weight
- Off-white summary card below (arch-top shape): Registration Reference ID (large, monospace-style font for easy reading/copying), Name, Package, Meal, Amount
- Explanation text: "You'll receive a WhatsApp notification once your payment is verified by the committee, typically within 24 hours. Please keep your reference ID for any enquiries."
- Two buttons: "Register Another Person" (ghost, off-white outline) and "Share via WhatsApp" (solid gold, WhatsApp icon) — shares a generic event link/message, not personal registration data

---

## PAGE 4: FAQ PAGE

- Cream background
- H1: "Frequently Asked Questions" — centered, top of page
- Accordion list, each item arch-topped when expanded, gold "+"/"–" icon toggle
- Suggested questions (write full answers matching earlier context):
  1. Is the event free to attend?
  2. What's included in each package tier?
  3. How do I pay for my package?
  4. How long does payment verification take?
  5. Can I change my package or meal after submitting?
  6. What if my receipt upload fails?
  7. Can I register if I'm not a current student?
  8. How do I join the Alumni Group or pledge to the Bus Donation Drive?
  9. Who do I contact if I have an issue?
- Bottom of page: "Still have questions?" — contact card repeating Chairman/Ameer/Vice Chairman numbers

---

## RESPONSIVE REQUIREMENTS
- Fully responsive from 375px (mobile) to 1440px+ (desktop)
- Touch targets minimum 44x44px on all interactive elements
- Form sections single-column full-width below 768px
- Sticky sidebar summary converts to bottom sheet below 768px
- Package/meal selection cards stack vertically below 480px

## ACCESSIBILITY REQUIREMENTS
- Visible keyboard focus rings (gold, 2px offset) on all interactive elements
- Color contrast minimum WCAG AA for all text/background combinations
- Form fields have proper labels (not placeholder-only)
- Respect `prefers-reduced-motion` — disable slide/stagger animations, retain simple opacity fades only
- Error states use icon + color + text (not color alone) for validation messages
