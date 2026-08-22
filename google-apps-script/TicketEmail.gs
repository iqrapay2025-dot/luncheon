/**
 * MSSN UNILORIN — First Grand Luncheon · Confirmation ticket email
 * ================================================================
 * Drop this file into the existing Google Apps Script project that powers
 * GAS_ENDPOINT in src/pages/Registration.tsx (the script.google.com project).
 *
 * What it provides:
 *   buildTicketEmailHtml_(reg)         -> full HTML string of the ticket email
 *   sendConfirmationTicketEmail_(reg)  -> sends it (call this from your doPost)
 *   testTicketEmail()                  -> run from the editor to preview/send a sample
 *
 * `reg` is the registration object posted by the frontend. The template only
 * needs: referenceId, fullName, package, meal, amount, email.
 * Everything else in the payload is ignored here.
 *
 * Design parity with src/components/TicketPreview.tsx (on-screen ticket):
 * same 340px card, purple gradient header (#3D1550 -> #5B2C74, solid
 * fallback for Outlook), gold accents (#FFC153), 2x2 stats grid
 * (Meal / Amount / Status=Pending / Ticket), dashed perforation with edge
 * notches, attendee + REF ID + QR footer. The QR encodes the SAME
 * Reference ID via the SAME api.qrserver.com URL parameters as the web
 * ticket, so both scan identically.
 */

// ── Palette (mirrors TicketPreview.tsx) ──
var TC = {
  PLUM: "#3D1550",
  PLUM_LIGHT: "#5B2C74",
  CREAM: "#FDF8F0",
  CREAM_MUTED: "#CBB8D6", // solid stand-in for rgba(253,248,240,0.55)
  PAGE_BG: "#F9F7FF",
  GOLD: "#FFC153",
  GOLD_SOFT: "#E8C784",
  INK: "#1A1A2E",
  LABEL: "#9CA3AF",
  PENDING: "#B8862F",
  VERIFIED: "#4A7C59",
  HAIRLINE: "#F1EDF4", // solid stand-in for rgba(61,21,80,0.08)
  DASH: "#DCD2E3", // solid stand-in for rgba(61,21,80,0.15)
  QR_BORDER: "#EDE7F2",
}

var FONT_SANS = "'Manrope','Helvetica Neue',Helvetica,Arial,sans-serif"
var FONT_DISPLAY = "'Outfit','Trebuchet MS','Segoe UI',Arial,sans-serif"

/** Escapes user-supplied values before injecting them into the HTML. */
function escapeHtml_(value) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Formats a numeric amount as Naira with thousands separators, e.g. ₦3,000. */
function formatNaira_(amount) {
  var n = Number(amount)
  if (!isFinite(n) || n <= 0) return "—"
  var whole = String(Math.round(n))
  var grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return "\u20A6" + grouped // ₦
}

/** Identical QR endpoint + parameters as the on-screen ticket in React. */
function qrUrlFor_(referenceId) {
  return (
    "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" +
    encodeURIComponent(String(referenceId || ""))
  )
}

/** One label/value cell of the 2x2 stats grid. side: 'left' | 'right'. */
function statCell_(label, value, valueColor, side, paddingBottom) {
  var padLeft = side === "right" ? "10px" : "0"
  var padRight = side === "right" ? "0" : "10px"
  return (
    '<td width="50%" valign="top" style="width:50%;padding:0 ' +
    padRight +
    " " +
    paddingBottom +
    " " +
    padLeft +
    ';"><div style="font-family:' +
    FONT_SANS +
    ";font-size:10px;color:" +
    TC.LABEL +
    ';margin:0 0 3px 0;">' +
    label +
    '</div><div style="font-family:' +
    FONT_DISPLAY +
    ";font-size:14px;font-weight:700;color:" +
    valueColor +
    ';word-wrap:break-word;">' +
    value +
    "</div></td>"
  )
}

/**
 * Builds the complete ticket email HTML.
 * Table-based + inline styles only, so it survives Gmail and Outlook.
 * Gradients/rgba are progressive enhancement — every surface also declares
 * a solid fallback color first, so the header stays purple where they fail.
 */
function buildTicketEmailHtml_(reg) {
  var refId = escapeHtml_(reg.referenceId || "")
  var fullName = escapeHtml_(reg.fullName || "")
  var pkgUpper = escapeHtml_(String(reg.package || "").toUpperCase())
  var meal = escapeHtml_(reg.meal || "") || "—"
  var amount = formatNaira_(reg.amount)

  // Status is always Pending in the email: payment is not verified yet.
  var statusValue = "Pending"
  var statusColor = TC.PENDING

  var qr = qrUrlFor_(reg.referenceId)

  var html =
    '<!DOCTYPE html><html lang="en"><head>' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    "<title>Your Grand Luncheon Ticket</title>" +
    "<style>" +
    "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Manrope:wght@400;600;700&display=swap');" +
    "@media only screen and (max-width:420px){.gl-card{width:100%!important;}}" +
    "</style></head>" +
    '<body style="margin:0;padding:0;background-color:' +
    TC.PAGE_BG +
    ';">' +
    // Preheader (hidden inbox preview text)
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Ticket ' +
    refId +
    " &#8212; present the QR code at event check-in.</div>" +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:' +
    TC.PAGE_BG +
    ';"><tr><td align="center" style="padding:32px 12px 40px 12px;font-family:' +
    FONT_SANS +
    ';">' +
    // Intro line
    '<p style="margin:0 auto 22px auto;max-width:400px;font-family:' +
    FONT_SANS +
    ";font-size:14px;line-height:1.6;color:" +
    TC.PLUM_LIGHT +
    ';text-align:center;">Assalamu alaykum! Your registration for the MSSN UNILORIN Grand Luncheon was received. Your ticket is below &#8212; please save this email and present the QR code at check-in.</p>' +
    // ── Ticket card ──
    '<div style="max-width:340px;margin:0 auto;">' +
    '<table role="presentation" class="gl-card" width="340" cellpadding="0" cellspacing="0" border="0" style="width:340px;max-width:340px;border-radius:20px;overflow:hidden;background-color:#FFFFFF;box-shadow:0 8px 30px rgba(61,21,80,0.16);">' +
    // Header band (solid plum fallback declared before the gradient)
    '<tr><td style="background-color:' +
    TC.PLUM +
    ";background-image:linear-gradient(135deg," +
    TC.PLUM +
    " 0%," +
    TC.PLUM_LIGHT +
    ' 100%);padding:24px 22px 20px 22px;border-radius:20px 20px 0 0;">'

  // Eyebrow row: gold dot + org name
  html +=
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td width="14" valign="middle" style="width:14px;padding:0;font-size:0;line-height:0;">' +
    '<div style="width:8px;height:8px;border-radius:50%;background-color:' +
    TC.GOLD +
    ';font-size:0;line-height:8px;">&#160;</div></td>' +
    '<td valign="middle" style="padding:0 0 0 6px;font-family:' +
    FONT_SANS +
    ";font-size:10px;font-weight:700;letter-spacing:0.14em;color:" +
    TC.GOLD +
    ';">MSSN UNILORIN</td></tr></table>' +
    '<div style="height:18px;line-height:18px;font-size:0;">&#160;</div>'

  // Event title + package pill
  html +=
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td valign="top" style="padding:0;">' +
    '<div style="font-family:' +
    FONT_SANS +
    ";font-size:10px;color:" +
    TC.CREAM_MUTED +
    ';margin:0 0 4px 0;">EVENT</div>' +
    '<div style="font-family:' +
    FONT_DISPLAY +
    ";font-size:22px;font-weight:800;color:" +
    TC.CREAM +
    ';line-height:1.1;">Grand<br>Luncheon</div></td>' +
    '<td valign="top" align="right" style="padding:4px 0 0 10px;">' +
    '<div style="display:inline-block;background-color:#5E3478;background-color:rgba(255,193,83,0.18);border:1px solid #8A6193;border:1px solid rgba(255,193,83,0.4);border-radius:20px;padding:5px 12px;font-family:' +
    FONT_SANS +
    ";font-size:10px;font-weight:700;letter-spacing:0.05em;color:" +
    TC.GOLD_SOFT +
    ';">' +
    pkgUpper +
    "</div></td></tr></table>" +
    "</td></tr>"

  // Stats grid — 2x2, mirrors StatBlock layout in TicketPreview.tsx
  html +=
    '<tr><td style="padding:18px 22px 16px 22px;background-color:#FFFFFF;border-bottom:1px solid ' +
    TC.HAIRLINE +
    '">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    "<tr>" +
    statCell_("Meal", meal, TC.INK, "left", "14px") +
    statCell_("Amount", amount, TC.INK, "right", "14px") +
    "</tr><tr>" +
    statCell_("Status", statusValue, statusColor, "left", "0") +
    statCell_("Ticket", "General Entry", TC.INK, "right", "0") +
    "</tr></table></td></tr>"

  // Perforation — dashed line with page-colored notch circles at the edges.
  // (The surrounding email body is the same #F9F7FF as the notches, so they
  // read as bites taken out of the card edge even where margins are stripped.)
  html +=
    '<tr><td style="padding:0;background-color:#FFFFFF;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;"><tr>' +
    '<td width="24" height="24" valign="middle" style="width:24px;height:24px;padding:0;">' +
    '<div style="width:24px;height:24px;border-radius:50%;background-color:' +
    TC.PAGE_BG +
    ';margin-left:-12px;font-size:0;line-height:24px;">&#160;</div></td>' +
    '<td valign="middle" style="height:12px;padding:0;border-top:2px dashed ' +
    TC.DASH +
    ';font-size:0;line-height:0;">&#160;</td>' +
    '<td width="24" height="24" valign="middle" align="right" style="width:24px;height:24px;padding:0;">' +
    '<div style="width:24px;height:24px;border-radius:50%;background-color:' +
    TC.PAGE_BG +
    ';margin-right:-12px;font-size:0;line-height:24px;">&#160;</div></td>' +
    "</tr></table></td></tr>"

  // Footer — attendee details + QR code
  html +=
    '<tr><td style="padding:22px 22px 24px 22px;background-color:#FFFFFF;border-radius:0 0 20px 20px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td valign="bottom" style="padding:0 14px 0 0;">' +
    '<div style="font-family:' +
    FONT_SANS +
    ";font-size:10px;color:" +
    TC.LABEL +
    ';margin:0 0 4px 0;">ATTENDEE</div>' +
    '<div style="font-family:' +
    FONT_DISPLAY +
    ";font-size:16px;font-weight:700;color:" +
    TC.INK +
    ';margin:0 0 14px 0;word-wrap:break-word;overflow-wrap:break-word;">' +
    fullName +
    '</div><div style="font-family:' +
    FONT_SANS +
    ";font-size:10px;color:" +
    TC.LABEL +
    ';margin:0 0 3px 0;">REF ID</div>' +
    '<div style="font-family:' +
    FONT_DISPLAY +
    ";font-size:12px;font-weight:700;color:" +
    TC.PLUM +
    ';letter-spacing:0.02em;">' +
    refId +
    "</div></td>" +
    '<td width="84" valign="bottom" align="right" style="width:84px;padding:0;">' +
    '<img src="' +
    qr +
    '" width="84" height="84" alt="Check-in QR code ' +
    refId +
    '" style="display:block;border-radius:8px;border:1px solid ' +
    TC.QR_BORDER +
    ';"></td>' +
    "</tr></table></td></tr>" +
    "</table></div>" // /ticket card

  // Below-card guidance + sign-off
  html +=
    '<p style="margin:22px auto 0 auto;max-width:400px;font-family:' +
    FONT_SANS +
    ';font-size:13px;line-height:1.7;color:#6B5A78;text-align:center;">Present this QR code (or your Reference ID <strong style="color:' +
    TC.PLUM +
    '">' +
    refId +
    "</strong>) at the event for check-in. Your payment status will change to Verified once the committee confirms your receipt.</p>" +
    '<p style="margin:18px auto 0 auto;max-width:400px;font-family:' +
    FONT_SANS +
    ";font-size:12px;line-height:1.7;color:" +
    TC.LABEL +
    ';text-align:center;">MSSN UNILORIN &#8212; The First Grand Luncheon<br>This is an automated message; please do not reply directly.</p>'

  html += "</td></tr></table></body></html>"

  return html
}

/**
 * Sends the ticket email. Call this from your doPost after the registration
 * row is saved and a referenceId has been generated/set on `reg`.
 * Silently skips when no email was provided (email is optional on the form).
 */
function sendConfirmationTicketEmail_(reg) {
  if (!reg || !reg.email || !String(reg.email).trim()) {
    Logger.log("[TicketEmail] No email on registration — skipping send.")
    return { sent: false, reason: "no-email" }
  }
  var html = buildTicketEmailHtml_(reg)
  var refId = String(reg.referenceId || "")
  MailApp.sendEmail({
    to: String(reg.email).trim(),
    subject: "Your Grand Luncheon Ticket \u2022 " + refId,
    body: plainTextVersion_(reg),
    htmlBody: html,
    name: "MSSN UNILORIN",
  })
  Logger.log("[TicketEmail] Sent ticket email for " + refId)
  return { sent: true }
}

/** Plain-text fallback for clients that block HTML. */
function plainTextVersion_(reg) {
  return [
    "MSSN UNILORIN - The First Grand Luncheon",
    "",
    "Attendee: " + (reg.fullName || ""),
    "Package: " + (reg.package || ""),
    "Meal: " + (reg.meal || ""),
    "Amount: " + formatNaira_(reg.amount),
    "Status: Pending",
    "Reference ID: " + (reg.referenceId || ""),
    "",
    "Present your Reference ID at event check-in.",
  ].join("\n")
}

/** Editor-only runner: logs the HTML so you can preview it in a browser. */
function testTicketEmail() {
  var sample = {
    referenceId: "GL-TEST01-ABC123",
    fullName: "Maryam Abdulsalam",
    package: "Ikram",
    meal: "Jollof Rice + Chicken",
    amount: "10000",
    email: "",
  }
  Logger.log(buildTicketEmailHtml_(sample)) // Executions -> view log -> copy HTML
  // To receive a real copy in your own inbox, uncomment:
  // sample.email = Session.getActiveUser().getEmail();
  // sendConfirmationTicketEmail_(sample);
}

/* ============================================================
   REFERENCE ONLY — how to wire the email into your existing
   doPost. Your deployed script already saves the Sheet row and
   uploads the receipt to Drive; merge only the marked lines.
   ============================================================ */
function doPost(e) {
  var reg = JSON.parse(e.postData.contents)

  // ...your existing logic: save row to Sheet, upload receipt to Drive...

  // --- BEGIN ticket-email lines to keep ---
  reg.referenceId = generateReferenceId_()
  sendConfirmationTicketEmail_(reg)
  // --- END ticket-email lines ---

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, referenceId: reg.referenceId }),
  ).setMimeType(ContentService.MimeType.JSON)
}

/** Matches the GL-XXXXXX-XXXXXX format (no visually ambiguous characters). */
function generateReferenceId_() {
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  function block() {
    var out = ""
    for (var i = 0; i < 6; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return out
  }
  return "GL-" + block() + "-" + block()
}
