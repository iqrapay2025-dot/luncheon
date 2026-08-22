import type { NavigateFn } from "../App"

export default function Footer({ navigate }: { navigate: NavigateFn }) {
  return (
    <footer
      style={{
        background: "#0F0A18",
        borderTop: "1px solid rgba(255,193,83,0.2)",
      }}
    >
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 32px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                color: "#FFC153",
                fontSize: 18,
                marginBottom: 6,
              }}
            >
              MSSN UNILORIN
            </div>
            <div
              style={{
                color: "#E8C784",
                fontSize: 10,
                letterSpacing: "0.12em",
                marginBottom: 16,
              }}
            >
              GRAND LUNCHEON 2026
            </div>
            <p
              style={{
                color: "rgba(253,248,240,0.55)",
                fontSize: 13,
                lineHeight: "1.7",
                maxWidth: 240,
              }}
            >
              Muslim Students&apos; Society of Nigeria, University of Ilorin
              Branch. Celebrating excellence, faith, and community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div
              style={{
                color: "#FFC153",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              QUICK LINKS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Home", page: "landing" as const },
                { label: "Register", page: "register" as const },
                { label: "FAQ", page: "faq" as const },
              ].map(({ label, page }) => (
                <button
                  key={label}
                  onClick={() => navigate(page)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(253,248,240,0.7)",
                    fontSize: 14,
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#FFC153")}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "rgba(253,248,240,0.7)")
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                color: "#FFC153",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              CONTACT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { role: "Chairman", num: "08160909017" },
                { role: "Ameer", num: "09077479849" },
                { role: "Vice Chairman", num: "09071107564" },
              ].map(({ role, num }) => (
                <div key={role}>
                  <div
                    style={{ color: "rgba(253,248,240,0.45)", fontSize: 11 }}
                  >
                    {role}
                  </div>
                  <a
                    href={`tel:${num}`}
                    style={{
                      color: "rgba(253,248,240,0.8)",
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    {num}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div
              style={{
                color: "#FFC153",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              FOLLOW US
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              {[
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/mssnunilorin.mssn",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: "Telegram",
                  href: "https://t.me/mssnunilorintgchannel",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.846 2.978 1.254 4.54 2.121 7.486.262.876.524 1.78 1.35 2.153.831.374 1.63-.028 2.25-.657l3.217-3.024 5.032 3.769c.556.358 1.14.543 1.736.543.96 0 1.8-.605 2.064-1.491l3.601-12.498.032-.127c.224-.85-.066-1.736-.756-2.29a2.302 2.302 0 0 0-1.543-.508z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/mssnuil/",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                    </svg>
                  ),
                },
                {
                  label: "X (Twitter)",
                  href: "#",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    color: "#FFC153",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,193,83,0.3)",
                    transition: "background 0.2s, border-color 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(255,193,83,0.15)"
                    e.currentTarget.style.borderColor = "#FFC153"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.borderColor = "rgba(255,193,83,0.3)"
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  color: "rgba(253,248,240,0.45)",
                  fontSize: 11,
                  marginBottom: 4,
                }}
              >
                Handle
              </div>
              <div style={{ color: "#E8C784", fontSize: 13 }}>
                @MssnUnilorin
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,193,83,0.15)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ color: "rgba(255,193,83,0.5)", fontSize: 12 }}>
            © 2026 MSSN UNILORIN. All rights reserved.
          </div>
          <button
            onClick={() => navigate("faq")}
            style={{
              background: "none",
              border: "none",
              color: "rgba(253,248,240,0.45)",
              fontSize: 12,
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FFC153")}
            onMouseOut={(e) =>
              (e.currentTarget.style.color = "rgba(253,248,240,0.45)")
            }
          >
            Questions? Visit our FAQ →
          </button>
        </div>
      </div>
    </footer>
  )
}
