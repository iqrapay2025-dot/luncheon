import { useEffect, useState } from "react"
import type { NavigateFn } from "../App"
import mssnLogo from "../imports/mssn_logo.jpg"

export default function Navbar({ navigate }: { navigate: NavigateFn }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const textColor = scrolled ? "#FDF8F0" : "#1A1A2E"
  const mutedColor = scrolled ? "rgba(253,248,240,0.65)" : "rgba(26,26,46,0.55)"

  return (
    <>
      <style>{`
        .nav-desktop-only { display: none !important; }
        .nav-mobile-only { display: flex !important; }
        @media (min-width: 768px) {
          .nav-desktop-only { display: flex !important; }
          .nav-mobile-only { display: none !important; }
        }
      `}</style>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "#3D1550" : "rgba(255,255,255,0.96)",
          borderBottom: `1px solid ${
            scrolled ? "rgba(212,162,76,0.2)" : "rgba(26,26,46,0.08)"
          }`,
          boxShadow: scrolled
            ? "0 2px 24px rgba(0,0,0,0.35)"
            : "0 1px 0 rgba(26,26,46,0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "background 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            height: 68,
            gap: 24,
          }}
        >
          <button
            onClick={() => {
              navigate("landing")
              setMenuOpen(false)
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 0,
              flexShrink: 0,
            }}
            aria-label="MSSN UNILORIN home"
          >
            <img
              src={mssnLogo}
              alt="MSSN UNILORIN Logo"
              style={{
                width: 44,
                height: 44,
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: scrolled ? "#D4A24C" : "#3D1550",
                  lineHeight: 1.1,
                  letterSpacing: "0.03em",
                  transition: "color 0.35s",
                }}
              >
                MSSN UNILORIN
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  color: "#D4A24C",
                  fontWeight: 500,
                }}
              >
                GRAND LUNCHEON
              </div>
            </div>
          </button>

          <div
            className="nav-desktop-only"
            style={{ flex: 1, justifyContent: "center", gap: 32 }}
          >
            {(["Home", "Gallery", "FAQ"] as const).map((label) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "FAQ") navigate("faq")
                  else if (label === "Gallery") navigate("gallery")
                  else navigate("landing")
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: mutedColor,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "4px 0",
                  fontFamily: "Manrope, sans-serif",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = textColor)}
                onMouseOut={(e) => (e.currentTarget.style.color = mutedColor)}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("register")}
            className="nav-desktop-only"
            style={{
              background: scrolled ? "#FFFFFF" : "#3D1550",
              color: scrolled ? "#3D1550" : "#FDF8F0",
              border: scrolled ? "1px solid rgba(212,162,76,0.45)" : "none",
              borderRadius: 24,
              padding: "9px 22px",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "Manrope, sans-serif",
              transition: "background 0.2s, color 0.2s, transform 0.15s",
              flexShrink: 0,
              minHeight: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = scrolled
                ? "#E8C784"
                : "#5B2C74"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = scrolled
                ? "#FFFFFF"
                : "#3D1550"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Register Now
          </button>

          <button
            className="nav-mobile-only"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: scrolled ? "#D4A24C" : "#3D1550",
                  borderRadius: 2,
                  transition: "transform 0.2s, opacity 0.2s",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : menuOpen && i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              background: scrolled ? "#3D1550" : "#ffffff",
              borderTop: `1px solid ${
                scrolled ? "rgba(212,162,76,0.2)" : "rgba(26,26,46,0.08)"
              }`,
              padding: "16px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {(["Home", "Gallery", "FAQ"] as const).map((label) => (
              <button
                key={label}
                onClick={() => {
                  setMenuOpen(false)
                  if (label === "FAQ") navigate("faq")
                  else if (label === "Gallery") navigate("gallery")
                  else navigate("landing")
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: textColor,
                  padding: "12px 0",
                  fontSize: 16,
                  fontWeight: 500,
                  borderBottom: `1px solid rgba(26,26,46,0.06)`,
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false)
                navigate("register")
              }}
              style={{
                marginTop: 12,
                background: scrolled ? "#FFFFFF" : "#3D1550",
                color: scrolled ? "#3D1550" : "#FDF8F0",
                border: scrolled ? "1px solid rgba(212,162,76,0.4)" : "none",
                borderRadius: 24,
                padding: "12px 24px",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                minHeight: 44,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Register Now
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
