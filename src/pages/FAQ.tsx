import { useState } from "react"
import type { NavigateFn } from "../App"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { PACKAGES, formatPrice } from "../data/packages"

const faqs = [
  {
    q: "Is the event free to attend?",
    a: "All four packages require payment. Barakah (₦3,000) is the most affordable option, including food and a basic souvenir. Higher tiers (Fadl, Ihsan, Ikram) offer upgraded souvenirs and VIP perks. You must select and pay for a package to register.",
  },
  {
    q: "What's included in each package tier?",
    a: PACKAGES.map(
      (p) => `• ${p.name} (${formatPrice(p.price)}): ${p.includes.join(", ")}.`,
    ).join("\n"),
  },
  {
    q: "How do I pay for my package?",
    a: "Transfer your package amount to: GTBank · Account Number 0588812694 · Account Name: Zakariyah Habeeb-llahi Mukadam. Then upload a clear photo or PDF of your receipt during registration. Make sure your name and amount are clearly visible.",
  },
  {
    q: "How long does payment verification take?",
    a: "Verification typically takes up to 24 hours. You'll receive an Email notification on the mail you provided once your payment is confirmed by the committee. Keep your registration reference ID for any follow-up enquiries.",
  },
  {
    q: "Can I change my package or meal after submitting?",
    a: "Unfortunately, no changes can be made after submission. The form includes a confirmation checkbox reminding you of this. Please review your selections carefully on the final summary page before clicking Submit.",
  },
  {
    q: "What if my receipt upload fails?",
    a: "Ensure your file is JPG, PNG, or PDF and under a reasonable size (ideally under 5MB). If the upload fails during submission, contact any of the planning committee leads via WhatsApp to submit your receipt directly.",
  },
  {
    q: "Can I register if I'm not a current student?",
    a: "Absolutely. The event welcomes current students, alumni, and madrasah graduates alike. Select the appropriate level/status option during registration. Non-students should choose 'Graduate Alumni' or 'Haflah Graduate' as applicable.",
  },
  {
    q: "How do I join the Alumni Group or pledge to the Bus Donation Drive?",
    a: "Both are optional sections within the registration form. After selecting your package and meal, you'll reach the Alumni and Bus Donation sections where you can indicate interest or pledge an amount. There is no separate form — it's all part of the registration.",
  },
  {
    q: "Who do I contact if I have an issue?",
    a: "Reach out to any of the planning committee leads:\n• Chairman: 08160909017\n• Ameer: 09077479849\n• Vice Chairman: 09071107564\n\nYou can also follow @MssnUnilorin on Facebook, Telegram, and X for announcements.",
  },
]

function AccordionItem({
  q,
  a,
  open,
  onToggle,
  delay,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
  delay: number
}) {
  return (
    <div
      className={`scroll-reveal sr-delay-${delay}`}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        border: `1.5px solid ${open ? "#D4A24C" : "rgba(61,21,80,0.12)"}`,
        background: "#ffffff",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: open
          ? "0 4px 20px rgba(212,162,76,0.12)"
          : "0 1px 4px rgba(61,21,80,0.04)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          minHeight: 44,
        }}
      >
        <span
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: open ? "#3D1550" : "#1A1A2E",
            lineHeight: 1.35,
            transition: "color 0.2s",
          }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `1.5px solid ${open ? "#D4A24C" : "rgba(61,21,80,0.2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "#D4A24C" : "#9a8272",
            fontSize: 18,
            fontWeight: 300,
            transition: "all 0.2s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: "0 24px 24px",
            borderTop: "1px solid rgba(212,162,76,0.2)",
          }}
        >
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 14,
              color: "#5a4a3a",
              lineHeight: 1.75,
              margin: "16px 0 0",
              whiteSpace: "pre-line",
            }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage({ navigate }: { navigate: NavigateFn }) {
  const [open, setOpen] = useState<number | null>(null)
  useScrollReveal([open])

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <Navbar navigate={navigate} />

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(160deg, #3D1550 0%, #5B2C74 100%)",
          padding: "120px 24px 72px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%" }}>
            <defs>
              <pattern
                id="faq-pattern"
                x="0"
                y="0"
                width="80"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10,100 L10,50 Q40,10 40,10 Q70,10 70,50 L70,100 Z"
                  fill="none"
                  stroke="#D4A24C"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#faq-pattern)" />
          </svg>
        </div>
        <div
          style={{ position: "relative", zIndex: 1 }}
          className="animate-fade-up stagger-1"
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "#D4A24C",
              marginBottom: 12,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            NEED ANSWERS?
          </div>
          <h1
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              color: "#FDF8F0",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              color: "rgba(253,248,240,0.55)",
              fontSize: 15,
              margin: 0,
              maxWidth: 420,
              marginInline: "auto",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Everything you need to know about the Grand Luncheon registration.
          </p>
        </div>
      </div>

      {/* FAQ list */}
      <section
        style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              delay={Math.min(i + 1, 6)}
            />
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section
        style={{
          background: "#3D1550",
          padding: "64px 24px",
          textAlign: "center",
          borderTop: "1px solid rgba(212,162,76,0.2)",
        }}
      >
        <div className="scroll-reveal">
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#FDF8F0",
              margin: "0 0 10px",
            }}
          >
            Still Have Questions?
          </h3>
          <p
            style={{
              color: "rgba(253,248,240,0.55)",
              fontSize: 14,
              marginBottom: 36,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Contact any of our planning committee leads directly
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            {[
              { role: "Chairman", num: "08160909017" },
              { role: "Ameer", num: "09077479849" },
              { role: "Vice Chairman", num: "09071107564" },
            ].map(({ role, num }) => (
              <a
                key={role}
                href={`tel:${num}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(212,162,76,0.1)",
                  border: "1px solid rgba(212,162,76,0.35)",
                  borderRadius: 32,
                  padding: "12px 22px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                  minHeight: 44,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "rgba(212,162,76,0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "rgba(212,162,76,0.1)")
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A24C"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      color: "rgba(253,248,240,0.5)",
                      fontSize: 10,
                      fontWeight: 500,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {role}
                  </div>
                  <div
                    style={{
                      color: "#FDF8F0",
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {num}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <button
            onClick={() => navigate("register")}
            style={{
              background: "#D4A24C",
              border: "none",
              borderRadius: 28,
              padding: "13px 32px",
              color: "#3D1550",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              minHeight: 48,
              fontFamily: "Manrope, sans-serif",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#E8C784")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#D4A24C")}
          >
            Ready to Register?
          </button>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}
