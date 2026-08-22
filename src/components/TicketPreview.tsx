import { useRef, useState } from "react"

interface TicketPreviewProps {
  referenceId: string
  fullName: string
  package: string
  meal: string
  amount: string
  status?: "Pending" | "Verified"
}

// Maps each package to its souvenir tier label — shown in the "Souvenir" stat slot
const SOUVENIR_TIER: Record<string, string> = {
  Barakah: "Barakah Package",
  Fadl: "Fadl Package",
  Ihsan: "Ihsan Package",
  Ikram: "Ikram Package",
}

export default function TicketPreview({
  referenceId,
  fullName,
  package: pkg,
  meal,
  amount,
  status = "Pending",
}: TicketPreviewProps) {
  const ticketRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    referenceId,
  )}`

  const isVerified = status === "Verified"
  const souvenirLabel = SOUVENIR_TIER[pkg] ?? "Souvenir"

  const handleDownload = async () => {
    if (!ticketRef.current) return
    setDownloading(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#F9F7FF",
        scale: 3,
        useCORS: true,
      })
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `grand-luncheon-ticket-${referenceId}.png`
      link.click()
    } catch (err) {
      console.error("[Ticket] Download failed:", err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* ── Ticket card ── */}
      <div
        ref={ticketRef}
        style={{
          width: "100%",
          maxWidth: 340,
          borderRadius: 20,
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 8px 30px rgba(61,21,80,0.16)",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {/* Header band */}
        <div
          style={{
            background: "linear-gradient(135deg, #3D1550 0%, #5B2C74 100%)",
            padding: "24px 22px 20px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#FFC153",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#FFC153",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              MSSN UNILORIN
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(253,248,240,0.55)",
                  marginBottom: 4,
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                EVENT
              </div>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#FDF8F0",
                  lineHeight: 1.1,
                }}
              >
                Grand
                <br />
                Luncheon
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,193,83,0.18)",
                border: "1px solid rgba(255,193,83,0.4)",
                borderRadius: 20,
                padding: "5px 12px",
                marginTop: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#E8C784",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {pkg?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px 10px",
            padding: "18px 22px",
            borderBottom: "1px solid rgba(61,21,80,0.08)",
          }}
        >
          <StatBlock label="Meal" value={meal} />
          <StatBlock label="Amount" value={`₦${amount}`} />
          <StatBlock
            label="Status"
            value={isVerified ? "Verified" : "Pending"}
            valueColor={isVerified ? "#4A7C59" : "#B8862F"}
          />
          <StatBlock label="Souvenir" value={souvenirLabel} />
        </div>

        {/* Perforated divider */}
        <div
          style={{
            position: "relative",
            height: 0,
            borderTop: "2px dashed rgba(61,21,80,0.15)",
            margin: "0 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -12,
              top: -12,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#F9F7FF",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -12,
              top: -12,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#F9F7FF",
            }}
          />
        </div>
        {/* Passenger + QR section */}
        <div
          style={{
            padding: "22px 22px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 14,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                marginBottom: 4,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              ATTENDEE
            </div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#1A1A2E",
                marginBottom: 14,
                wordBreak: "break-word",
              }}
            >
              {fullName}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                marginBottom: 3,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              REF ID
            </div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#3D1550",
                letterSpacing: "0.02em",
              }}
            >
              {referenceId}
            </div>
          </div>

          <img
            src={qrUrl}
            width={84}
            height={84}
            alt="Check-in QR code"
            style={{
              borderRadius: 8,
              border: "1px solid rgba(61,21,80,0.1)",
              flexShrink: 0,
            }}
          />
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 22px",
          borderRadius: 10,
          border: "1.5px solid #FFC153",
          background: downloading ? "rgba(255,193,83,0.15)" : "transparent",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: 13,
          cursor: downloading ? "not-allowed" : "pointer",
          fontFamily: "Manrope, sans-serif",
          transition: "background 0.15s",
        }}
        onMouseOver={(e) => {
          if (!downloading)
            e.currentTarget.style.background = "rgba(255,193,83,0.12)"
        }}
        onMouseOut={(e) => {
          if (!downloading) e.currentTarget.style.background = "transparent"
        }}
      >
        {downloading ? (
          "Preparing…"
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v8m0 0l3-3m-3 3L4 6M2 11h10"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download Ticket
          </>
        )}
      </button>
    </div>
  )
}

function StatBlock({
  label,
  value,
  valueColor = "#1A1A2E",
}: {
  label: string
  value: string
  valueColor?: string
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          color: "#9CA3AF",
          marginBottom: 3,
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: valueColor,
        }}
      >
        {value}
      </div>
    </div>
  )
}
