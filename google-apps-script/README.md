# Grand Luncheon — Confirmation Ticket Email (Google Apps Script)

This folder contains the **email version** of the vertical boarding-pass ticket
that registrants see on the Confirmation Page
(`src/components/TicketPreview.tsx`). Both must stay visually identical:
same 340px card, purple header, package pill, 2×2 stats grid, dashed
perforation, attendee + REF ID + QR footer — and the QR encodes the exact same
Reference ID (`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=<refId>`).

## Files

- `TicketEmail.gs` — drop-in Apps Script module (the only file you need to copy)
- `email-preview.html` — rendered sample output, open it in a browser to eyeball the design

## Install (one-time)

1. Open your existing Apps Script project at https://script.google.com
   (the one deployed as the Web App behind `GAS_ENDPOINT` in
   `src/pages/Registration.tsx`).
2. **Files → + → Script**, name it `TicketEmail`, paste the full contents of
   `TicketEmail.gs`, save.
3. If your project uses the old Rhino runtime, switch to **V8**
   (Project Settings → General settings) — though this file is ES5-safe either way.
4. Deploy → **New deployment** (or Manage deployments → Edit → New version) so
   the `/exec` URL picks up the change.

## Wire it into your existing `doPost`

Your deployed script already saves the Sheet row and uploads the receipt to
Drive. Add these lines after that logic (see the marked block in `doPost` at
the bottom of `TicketEmail.gs`):

```js
reg.referenceId = generateReferenceId_();   // if you don't already generate one
sendConfirmationTicketEmail_(reg);
```

`sendConfirmationTicketEmail_` reads `reg.email / fullName / package / meal /
amount / referenceId` — exactly the keys posted by the frontend
(see the payload in `src/pages/Registration.tsx`). It silently skips sending
when `email` is empty, since Email is optional on the form.

## Testing

1. In the Apps Script editor select **`testTicketEmail`** → Run. It logs the
   full HTML (Executions → view log). Uncomment the two marked lines to also
   receive a real copy in your own inbox (first run will ask for mail scopes).
2. Or open `email-preview.html` from this folder in a browser for a static check.
3. Submit a real test registration on the site and verify:
   - Confirmation Page ticket and received email show the same Reference ID,
     and both QR codes scan to the identical value.
   - Gmail (web): gradient header, rounded card, gold pill all render.
   - Outlook desktop: gradient falls back to solid purple `#3D1550`
     (declared before the gradient in every style), notches render as small
     squares — acceptable degradation, layout intact.

## Design tokens (keep in sync with TicketPreview.tsx)

| Token | Value |
| --- | --- |
| Plum | `#3D1550` → `#5B2C74` |
| Page bg | `#F9F7FF` |
| Gold | `#FFC153` / soft `#E8C784` |
| Ink | `#1A1A2E` |
| Pending / Verified | `#B8862F` / `#4A7C59` |
| Card width | 340px |
