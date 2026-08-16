# Figma Make Reprompt — Bug Fixes

Paste this into Figma Make chat to fix the current issues.

---

I need the following bugs fixed in the registration form and confirmation flow:

## 1. Missing fields in Google Sheet submission

Currently only these fields are reaching the Sheet: Timestamp, Reference ID, Email, Gender, Department, Level, Package, Meal, Status.

These fields are NOT reaching the Sheet even though they exist in the form: Full Name, Phone, Matric Number, Amount, Payment Name, Receipt Link, Alumni Interest, Graduation Year, Occupation, Bus Pledge, Pledge Amount, Ikram Customization.

Fix this by:
- Checking the submit handler's payload object and confirming every field is being read from the correct form state variable (not `undefined` or a typo'd key name)
- The JSON payload sent in the POST request must use these exact key names, matching the backend exactly:
```json
{
  "fullName": "",
  "phone": "",
  "email": "",
  "gender": "",
  "department": "",
  "level": "",
  "matricNumber": "",
  "package": "",
  "amount": "",
  "meal": "",
  "ikramCustomization": "",
  "paymentName": "",
  "receiptBase64": "",
  "receiptFileName": "",
  "receiptMimeType": "",
  "alumniInterest": "",
  "graduationYear": "",
  "occupation": "",
  "busPledge": "",
  "pledgeAmount": ""
}
```
- Log the full payload object to the console right before the fetch call so it's easy to verify every field has a real value (not `undefined` or empty) before it's sent
- Double-check that `amount` is being auto-populated from the selected package in Section 2 and carried through the form state all the way to Section 8's submit — this value must never be `undefined`

## 2. Add missing form fields

Add these fields to the form if they are not currently present as actual input fields (not just payload keys):
- **Matric Number** — text input in Section 1 (Attendee Information), conditionally required only when Level = "Student" or "Graduate Alumni"; auto-fill/show "N/A" and disable when Level = "Haflah Graduate"
- **Ikram Customization** — Yes/No toggle + conditional text input in Section 4, only rendered when Package = "Ikram"
- **Occupation** — text input in Section 6 (Alumni Group Interest), only rendered when "Interested in joining MSSN Alumni Group 1.0?" = Yes, alongside the Graduation Year field

## 3. Amount showing as "undefined" in the confirmation email/ticket

The ticket email currently shows "undefined" instead of the actual amount. Fix by:
- Confirming the `amount` value is correctly set in form state the moment a package is selected in Section 2 (e.g., Barakah = 3000, Fadl = 5000, Ihsan = 7000, Ikram = 10000)
- Confirming this `amount` value is included in the final payload sent to the backend at submission (see field list in fix #1)
- Testing by submitting a real registration and checking that the Sheet row and the emailed ticket both show the correct numeric amount, not blank or "undefined"

## 4. Ticket should be downloadable as PDF or PNG

On the Confirmation Page, the Ticket Preview Card needs a working download button:
- Add a "Download Ticket" button below the Ticket Preview Card
- On click, capture the card as an image and let the user save it — implement using `html2canvas` to render the card element to a canvas, then either:
  - Convert to PNG and trigger a download via a temporary `<a>` link with `canvas.toDataURL("image/png")`, or
  - Convert to PDF using `jsPDF`, inserting the canvas image into a single-page PDF sized to fit the card
- Default to PNG download unless PDF is clearly easier to implement with available libraries — either format is acceptable as long as it downloads a real file the user can save and show at the event
- Button should show a brief loading state while the image/PDF is being generated (this can take a moment)
- This same downloadable ticket should visually match what's emailed (same QR code, same Reference ID, Package, Meal, Amount)

## 5. Fix page overflow

The website currently has horizontal/vertical overflow issues. Fix by:
- Adding `overflow-x: hidden` to the root/body element to prevent horizontal scroll
- Auditing all fixed-width elements (cards, images, containers) and ensuring they use `max-width: 100%` or responsive units instead of fixed pixel widths that could exceed the viewport
- Checking that any decorative background elements (arch shapes, minaret silhouettes, gradients) are contained within their parent sections and not bleeding outside viewport bounds, especially on mobile widths (375px–428px)
- Testing at common breakpoints: 375px, 428px, 768px, 1024px, 1440px to confirm no unwanted scrollbars appear in either direction

---

After making these fixes, do a full test submission through the actual form (not the console test snippet) and confirm:
1. Every field appears correctly in the Google Sheet row
2. The emailed ticket shows the correct Amount (not undefined)
3. The Download Ticket button produces a real downloadable file
4. No horizontal scroll appears on mobile or desktop views
