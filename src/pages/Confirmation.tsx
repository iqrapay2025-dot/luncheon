import { useEffect, useRef, useState } from "react"
import type { NavigateFn } from "../App"
import { getAmountDisplay } from "../data/packages"
import mssnLogo from "../imports/mssn_logo.jpg"

interface ConfirmData {
  fullName: string
  email: string
  package: string
  meal: string
  referenceId: string
  amount?: string
}

// Simple QR code placeholder SVG
function QRPlaceholder({ value }: { value: string }) {
  const cells: boolean[][] = []
  for (let r = 0; r < 21; r++) {
    cells[r] = []
    for (let c = 0; c < 21; c++) {
      const hash =
        (value.charCodeAt((r * 21 + c) % value.length) + r * 7 + c * 13) % 3
      cells[r][c] = hash !== 0
    }
  }
  const finder = (row: number, col: number) => {
    const onBorder = (r: number, c: number, size: number) =>
      r === 0 || r === size - 1 || c === 0 || c === size - 1
    const inBox = (r: number, c: number, size: number) =>
      r >= 0 && r < size && c >= 0 && c < size
    if (inBox(row, col, 7))
      return (
        onBorder(row, col, 7) || (row >= 2 && row <= 4 && col >= 2 && col <= 4)
      )
    if (inBox(row, col - 14, 7))
      return (
        onBorder(row, col - 14, 7) ||
        (row >= 2 && row <= 4 && col - 14 >= 2 && col - 14 <= 4)
      )
    if (inBox(row - 14, col, 7))
      return (
        onBorder(row - 14, col, 7) ||
        (row - 14 >= 2 && row - 14 <= 4 && col >= 2 && col <= 4)
      )
    return null
  }
  const size = 21
  const cell = 8
  return (
    <svg
      width={size * cell}
      height={size * cell}
      viewBox={`0 0 ${size * cell} ${size * cell}`}
      style={{ display: "block" }}
    >
      <rect width={size * cell} height={size * cell} fill="white" />
      {cells.map((row, r) =>
        row.map((filled, c) => {
          const forced = finder(r, c)
          const dark = forced !== null ? forced : filled
          return dark ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell}
              height={cell}
              fill="#1A1A2E"
            />
          ) : null
        }),
      )}
    </svg>
  )
}

// Ticket preview card — receives a ref for html2canvas capture
function TicketPreview({
  d,
  innerRef,
}: {
  d: ConfirmData
  innerRef: React.RefObject<HTMLDivElement | null>
}) {
  const amountDisplay = getAmountDisplay(d.amount, d.package)

  return (
    <div
      ref={innerRef}
      style={{
        background: "#ffffff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        maxWidth: 340,
        margin: "0 auto",
        border: "1px solid rgba(212,162,76,0.2)",
      }}
    >
      {/* Purple header */}
      <div
        style={{
          background: "linear-gradient(135deg, #3D1550 0%, #5B2C74 100%)",
          padding: "18px 20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <img
          src={mssnLogo}
          alt="MSSN logo"
          style={{
            width: 36,
            height: 36,
            objectFit: "contain",
            borderRadius: 4,
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
          }}
          crossOrigin="anonymous"
        />
        <div>
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "#D4A24C",
              letterSpacing: "0.08em",
            }}
          >
            MSSN UNILORIN
          </div>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 10,
              color: "rgba(253,248,240,0.65)",
              marginTop: 1,
            }}
          >
            The First Grand Luncheon
          </div>
        </div>
      </div>

      {/* QR section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 20px 12px",
          background: "#FAFAFA",
        }}
      >
        <div
          style={{
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: 8,
            background: "#fff",
          }}
        >
          <QRPlaceholder value={d.referenceId} />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 10,
          color: "#9CA3AF",
          fontFamily: "Manrope, sans-serif",
          marginBottom: 14,
        }}
      >
        Scan at check-in
      </div>

      {/* Details table */}
      <div style={{ padding: "0 20px 16px", background: "#FAFAFA" }}>
        {[
          { label: "Reference ID", value: d.referenceId, mono: true },
          { label: "Name", value: d.fullName || "—" },
          { label: "Package", value: d.package || "—" },
          { label: "Amount", value: amountDisplay },
          { label: "Meal", value: d.meal || "—" },
        ].map(({ label, value, mono }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 0",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              gap: 12,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "#9CA3AF",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: mono ? 13 : 12,
                color: "#1A1A2E",
                fontWeight: mono ? 700 : 500,
                fontFamily: mono
                  ? "'Courier New', monospace"
                  : "Manrope, sans-serif",
                letterSpacing: mono ? "0.05em" : "0",
                textAlign: "right",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Dashed perforation */}
      <div
        style={{
          borderTop: "2px dashed rgba(61,21,80,0.15)",
          margin: "0 12px",
        }}
      />

      {/* Footer */}
      <div
        style={{
          background: "#ffffff",
          padding: "12px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "#9CA3AF",
            fontFamily: "Manrope, sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          PRESENT THIS AT THE EVENT FOR CHECK-IN
        </div>
      </div>
    </div>
  )
}

const CheckArch = ({ animate }: { animate: boolean }) => (
  <div
    style={{
      position: "relative",
      width: 120,
      height: 160,
      margin: "0 auto 32px",
    }}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 120 160"
      fill="none"
      style={{ position: "absolute", inset: 0 }}
    >
      <path
        d="M10,160 L10,80 Q10,10 60,5 Q110,10 110,80 L110,160 Z"
        fill="rgba(212,162,76,0.12)"
        stroke="#D4A24C"
        strokeWidth="1.5"
        style={
          animate
            ? {
                strokeDasharray: 400,
                strokeDashoffset: 400,
                animation: "drawIn 1.2s ease 0.1s forwards",
              }
            : {}
        }
      />
    </svg>
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#D4A24C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: animate ? 0 : 1,
        animation: animate ? "fadeIn 0.4s ease 0.9s forwards" : "none",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4,12 L9,17 L20,7"
          stroke="#3D1550"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
)

export default function ConfirmationPage({
  navigate,
  data,
}: {
  navigate: NavigateFn
  data: unknown
}) {
  const [animate, setAnimate] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const ticketRef = useRef<HTMLDivElement>(null)

  const d = data as ConfirmData || {
    fullName: "",
    email: "",
    package: "",
    meal: "",
    referenceId: "GL-DEMO-0001",
    amount: "",
  }

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(t)
  }, [])

  const amountDisplay = getAmountDisplay(d.amount, d.package)

  const summary = [
    { label: "Reference ID", value: d.referenceId, mono: true },
    { label: "Name", value: d.fullName },
    { label: "Package", value: d.package },
    { label: "Amount", value: amountDisplay },
    { label: "Meal", value: d.meal },
  ]

  const shareMsg = encodeURIComponent(
    `I just registered for the MSSN UNILORIN First Grand Luncheon! 🎉 Join the celebration of achievement, send-forth, and giving back. Register now via the event website.`,
  )

  const hasEmail = !!(d.email && d.email.trim())

  const handleDownload = async () => {
    if (!ticketRef.current) return
    setDownloading(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      })
      const url = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = url
      a.download = `MSSN-Ticket-${d.referenceId}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error("Download failed:", err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #3D1550 0%, #2a0e3d 100%)",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
          <defs>
            <pattern
              id="conf-pattern"
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
          <rect width="100%" height="100%" fill="url(#conf-pattern)" />
        </svg>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 880,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
        }}
      >
        {/* ── Top confirmation block ── */}
        <div
          style={{ textAlign: "center", animation: "fadeUp 0.6s ease both" }}
        >
          <CheckArch animate={animate} />
          <h2
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(26px, 5vw, 36px)",
              fontWeight: 700,
              color: "#FDF8F0",
              margin: "0 0 8px",
            }}
          >
            Registration Received
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#D4A24C",
              fontWeight: 600,
              marginBottom: 32,
              letterSpacing: "0.03em",
            }}
          >
            Pending Payment Verification
          </p>

          {/* Summary card */}
          <div
            style={{
              background: "#FDF8F0",
              borderRadius: "0 0 16px 16px",
              overflow: "hidden",
              textAlign: "left",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              marginBottom: 24,
              maxWidth: 480,
              marginInline: "auto",
            }}
          >
            <svg
              viewBox="0 0 480 28"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 28, display: "block" }}
            >
              <path
                d="M0,28 C0,28 180,28 240,4 C300,28 480,28 480,28 Z"
                fill="#FDF8F0"
              />
              <path
                d="M0,28 C0,28 180,28 240,4 C300,28 480,28 480,28"
                fill="none"
                stroke="#D4A24C"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div style={{ padding: "8px 28px 28px" }}>
              {summary.map(({ label, value, mono }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(61,21,80,0.08)",
                    gap: 16,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#9a8272" }}>
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: mono ? 15 : 14,
                      color: "#3D1550",
                      fontWeight: mono ? 700 : 500,
                      fontFamily: mono
                        ? "'Courier New', monospace"
                        : "Manrope, sans-serif",
                      letterSpacing: mono ? "0.06em" : "0",
                      textAlign: "right",
                    }}
                  >
                    {value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Email ticket message */}
          <div
            style={{
              background: "rgba(212,162,76,0.1)",
              border: "1px solid rgba(212,162,76,0.3)",
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              maxWidth: 480,
              marginInline: "auto",
              marginBottom: 28,
              textAlign: "left",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4A24C"
              strokeWidth="1.8"
              style={{ flexShrink: 0, marginTop: 1 }}
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p
              style={{
                fontSize: 13,
                color: "rgba(253,248,240,0.82)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {hasEmail ? (
                <>
                  A confirmation ticket with a QR code has been sent to{" "}
                  <strong style={{ color: "#E8C784" }}>{d.email}</strong>.
                  Please save it — you&apos;ll need to present the QR code at
                  the event for check-in.
                </>
              ) : (
                <>
                  You didn&apos;t provide an email address, so no ticket was
                  sent. Please keep your{" "}
                  <strong style={{ color: "#E8C784" }}>
                    Reference ID {d.referenceId}
                  </strong>{" "}
                  and present it at check-in.
                </>
              )}
            </p>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <button
              onClick={() => navigate("register")}
              style={{
                background: "transparent",
                border: "1.5px solid rgba(253,248,240,0.5)",
                borderRadius: 28,
                padding: "12px 24px",
                color: "#FDF8F0",
                fontWeight: 500,
                fontSize: 14,
                cursor: "pointer",
                minHeight: 48,
                fontFamily: "Manrope, sans-serif",
                transition: "border-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = "#D4A24C")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = "rgba(253,248,240,0.5)")
              }
            >
              Register Another Person
            </button>
            <a
              href={`https://wa.me/?text=${shareMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                border: "none",
                borderRadius: 28,
                padding: "12px 24px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                minHeight: 48,
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Share via WhatsApp
            </a>
          </div>

          <button
            onClick={() => navigate("landing")}
            style={{
              background: "none",
              border: "none",
              color: "rgba(253,248,240,0.45)",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s",
              fontFamily: "Manrope, sans-serif",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#D4A24C")}
            onMouseOut={(e) =>
              (e.currentTarget.style.color = "rgba(253,248,240,0.45)")
            }
          >
            ← Back to home
          </button>
        </div>

        {/* ── Ticket preview ── */}
        <div style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(212,162,76,0.7)",
                letterSpacing: "0.12em",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              YOUR TICKET PREVIEW
            </div>
          </div>
          <TicketPreview d={d} innerRef={ticketRef} />

          {/* Download button */}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: downloading ? "rgba(212,162,76,0.4)" : "#D4A24C",
                border: "none",
                borderRadius: 28,
                padding: "12px 28px",
                color: "#3D1550",
                fontWeight: 700,
                fontSize: 14,
                cursor: downloading ? "not-allowed" : "pointer",
                minHeight: 48,
                fontFamily: "Manrope, sans-serif",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => {
                if (!downloading) e.currentTarget.style.background = "#E8C784"
              }}
              onMouseOut={(e) => {
                if (!downloading) e.currentTarget.style.background = "#D4A24C"
              }}
            >
              {downloading ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    style={{ animation: "spin 0.8s linear infinite" }}
                    aria-hidden="true"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="30"
                      strokeDashoffset="10"
                      fill="none"
                    />
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Ticket
                </>
              )}
            </button>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgba(253,248,240,0.35)",
              marginTop: 14,
              fontFamily: "Manrope, sans-serif",
              lineHeight: 1.5,
            }}
          >
            Screenshot or download this ticket. The QR code will be live in your
            emailed ticket.
          </p>
        </div>
      </div>
    </div>
  )
}
