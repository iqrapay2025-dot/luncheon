import { useState, useEffect, useRef, type CSSProperties } from "react"
import type { NavigateFn } from "../App"
import HeroSection from "../components/HeroSection"
import Footer from "../components/Footer"
import { useScrollReveal } from "../hooks/useScrollReveal"
import mssnLogo from "../imports/mssn_logo.jpg"
import busImage from "../imports/bus image.jpg"
import graduationImage from "../imports/graduation.jpeg"
import hallConvoImage from "../imports/hall convo.jpeg"

const PHOTOS = [
  { url: mssnLogo, alt: "MSSN UNILORIN logo" },
  { url: busImage, alt: "Bus image" },
  { url: graduationImage, alt: "Graduation image" },
  { url: hallConvoImage, alt: "Hall conversation" },
]

const ctrlBtnStyle: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,193,83,0.35)",
  color: "#E8C784",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background 0.2s",
  fontFamily: "Manrope, sans-serif",
  padding: 0,
}

function DecorativeGraphic() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1.15",
        maxWidth: 400,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 350"
        fill="none"
        style={{ width: "100%", height: "100%" }}
      >
        <circle cx="265" cy="148" r="132" fill="#FFC153" />
        <circle cx="158" cy="218" r="96" fill="#E8762A" />
        <circle cx="318" cy="268" r="75" fill="#6B21A8" />
        <path
          d="M70,350 L70,182 Q70,58 148,36 Q226,58 226,182 L226,350 Z"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />
        <polygon
          points="205,28 210,46 228,46 214,57 219,75 205,64 191,75 196,57 182,46 200,46"
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
    </div>
  )
}

export default function LandingPage({ navigate }: { navigate: NavigateFn }) {
  useScrollReveal([])

  // ── Dignified speaker audio player ──
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const fmt = (t: number) => {
    if (!isFinite(t) || t < 0) return "0:00"
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      void a.play()
      setIsPlaying(true)
    } else {
      a.pause()
      setIsPlaying(false)
    }
  }

  const stop = () => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    a.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const skip = (secs: number) => {
    const a = audioRef.current
    if (!a) return
    const next = Math.max(0, Math.min(a.duration || 0, a.currentTime + secs))
    a.currentTime = next
    setCurrentTime(next)
  }

  const onSeek = (v: number) => {
    const a = audioRef.current
    if (a && isFinite(v)) a.currentTime = v
    setCurrentTime(v)
  }

  // Hook media element events to React state
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrentTime(a.currentTime)
    const onMeta = () => setDuration(a.duration || 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)
    a.addEventListener("timeupdate", onTime)
    a.addEventListener("loadedmetadata", onMeta)
    a.addEventListener("play", onPlay)
    a.addEventListener("pause", onPause)
    a.addEventListener("ended", onEnded)
    return () => {
      a.removeEventListener("timeupdate", onTime)
      a.removeEventListener("loadedmetadata", onMeta)
      a.removeEventListener("play", onPlay)
      a.removeEventListener("pause", onPause)
      a.removeEventListener("ended", onEnded)
    }
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <style>{`
        /* ── About card header ── */
        .about-header { display: grid; grid-template-columns: 1fr auto; align-items: center; padding: 48px 52px 0; }
        .about-deco { width: 340px; flex-shrink: 0; margin-right: -12px; }
        /* ── About strip ── */
        .about-strip { display: grid; grid-template-columns: repeat(3, 1fr); padding: 0 52px 44px; border-top: 1px solid rgba(255,193,83,0.12); margin-top: 32px; }
        .about-strip-cell { padding: 24px 28px 0; border-left: 1px solid rgba(255,193,83,0.12); }
        .about-strip-cell:first-child { border-left: none; }
        /* ── Gallery section ── */
        .gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .photos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        /* ── Contact cards ── */
        .contact-cards { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .about-deco { display: none; }
          .about-header { grid-template-columns: 1fr; }
          .about-strip { grid-template-columns: 1fr; padding: 0 24px 32px; }
          .about-strip-cell { border-left: none; border-top: 1px solid rgba(255,193,83,0.12); padding: 20px 0 0; }
          .about-strip-cell:first-child { border-top: none; padding-top: 20px; }
          .gallery-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        @media (max-width: 700px) {
          .about-header { padding: 28px 20px 0; }
        }

        @media (max-width: 480px) {
          .photos-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <HeroSection navigate={navigate} />

      {/* ══ DARK ABOUT CARD ══ */}
      <div style={{ padding: "0 16px", marginBottom: 0 }} id="about-section">
        <div
          style={{
            background: "#3D1550",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div className="about-header">
            <div style={{ maxWidth: 520 }} className="scroll-reveal">
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#FFC153",
                  letterSpacing: "0.14em",
                  marginBottom: 12,
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                WHO WE ARE AND WHAT WE DO
              </div>
              <p
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "clamp(18px, 2.8vw, 28px)",
                  fontWeight: 700,
                  color: "#FDF8F0",
                  lineHeight: 1.32,
                  margin: "0 0 28px",
                }}
              >
                Proudly celebrating excellence, faith, and giving back to the
                community through trusted gatherings.
              </p>
              <audio
                ref={audioRef}
                id="dignifiedSpeaker"
                preload="metadata"
                src="https://res.cloudinary.com/nlmhqbwe/video/upload/v1786871495/MiniMax_2026-08-16_10_05_39_Dignified_Speaker_ugrry1.wav"
              />
              <button
                onClick={togglePlay}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginLeft: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: isPlaying ? "#E8C784" : "#FFC153",
                    color: "#3D1550",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#E8C784")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = isPlaying
                      ? "#E8C784"
                      : "#FFC153")
                  }
                >
                  {isPlaying ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <rect x="2" y="1" width="4" height="12" rx="0.9" />
                      <rect x="8" y="1" width="4" height="12" rx="0.9" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4 1 L13 7 L4 13 Z" />
                    </svg>
                  )}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#FDF8F0",
                      fontWeight: 500,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {isPlaying
                      ? "Pause — Dignified Speaker"
                      : "Play — Learn about our event"}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(253,248,240,0.45)",
                      marginTop: 1,
                    }}
                  >
                    MSSN UNILORIN • Grand Luncheon
                  </div>
                </div>
              </button>

              {/* Transport controls */}
              <div
                style={{
                  marginLeft: 16,
                  marginTop: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <button
                  type="button"
                  aria-label="Backward ten seconds"
                  onClick={() => skip(-10)}
                  style={ctrlBtnStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(255,193,83,0.22)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 18 18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M11 3 L15 6.5 L11 10 Z M6 3 L10 6.5 L6 10 Z M3 4 L3 12 L5 12 L5 4 Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Stop"
                  onClick={stop}
                  style={ctrlBtnStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(255,193,83,0.22)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="10" height="10" rx="1.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Forward ten seconds"
                  onClick={() => skip(10)}
                  style={ctrlBtnStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(255,193,83,0.22)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 18 18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 3 L11 6.5 L7 10 Z M12 3 L16 6.5 L12 10 Z M3 4 L3 12 L5 12 L5 4 Z" />
                  </svg>
                </button>
              </div>

              {/* Seek bar */}
              <div
                style={{
                  marginLeft: 16,
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(253,248,240,0.5)",
                    fontFamily: "Manrope, sans-serif",
                    minWidth: 30,
                    textAlign: "center",
                  }}
                >
                  {fmt(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  style={{
                    flex: 1,
                    accentColor: "#FFC153",
                    cursor: "pointer",
                    height: 4,
                  }}
                  aria-label="Seek through audio"
                />
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(253,248,240,0.5)",
                    fontFamily: "Manrope, sans-serif",
                    minWidth: 30,
                    textAlign: "center",
                  }}
                >
                  {fmt(duration)}
                </span>
              </div>
            </div>
            <div className="about-deco scroll-reveal-right">
              <DecorativeGraphic />
            </div>
          </div>

          {/* 3-col strip */}
          <div className="about-strip">
            {[
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFC153"
                    strokeWidth="1.5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
                title: "Instant Registration",
                desc: "Register in seconds and receive your confirmation immediately with a unique reference ID.",
                action: () => navigate("register"),
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFC153"
                    strokeWidth="1.5"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
                title: "Curated Packages",
                desc: "Choose from 4 tailored packages — each includes food and souvenirs with tiered perks.",
                action: () => navigate("register"),
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFC153"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
                title: "Lasting Memories",
                desc: "Certificates, souvenirs, and an unforgettable send-forth ceremony for the graduating class.",
                action: () => navigate("gallery"),
              },
            ].map(({ icon, title, desc, action }, i) => (
              <div
                key={title}
                className={`about-strip-cell scroll-reveal sr-delay-${i + 1}`}
              >
                <div style={{ marginBottom: 10 }}>{icon}</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#FDF8F0",
                    marginBottom: 6,
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  {title}
                </div>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "rgba(253,248,240,0.5)",
                    lineHeight: 1.65,
                    margin: "0 0 10px",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {desc}
                </p>
                <button
                  onClick={action}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FFC153",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "Manrope, sans-serif",
                    transition: "opacity 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Explore More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ GALLERY PREVIEW ══ */}
      <section style={{ padding: "64px 16px", background: "#ffffff" }}>
        <div
          className="gallery-grid"
          style={{ maxWidth: 1240, margin: "0 auto" }}
        >
          <div className="scroll-reveal-left">
            <h2
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                fontWeight: 800,
                color: "#0F0A18",
                lineHeight: 1.18,
                margin: "0 0 14px",
                letterSpacing: "-0.015em",
              }}
            >
              Celebrating excellence,
              <br />
              built on faith.
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FFC153",
                  flexShrink: 0,
                  marginTop: 7,
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 340,
                }}
              >
                Honouring graduates, launching the alumni association, and
                giving back — all in one grand gathering.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("register")}
                style={{
                  background: "#3D1550",
                  color: "#FDF8F0",
                  border: "none",
                  borderRadius: 28,
                  padding: "12px 28px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  minHeight: 44,
                  fontFamily: "Manrope, sans-serif",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#5B2C74")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#3D1550")
                }
              >
                Register Now →
              </button>
              <button
                onClick={() => navigate("gallery")}
                style={{
                  background: "transparent",
                  color: "#3D1550",
                  border: "1.5px solid rgba(61,21,80,0.2)",
                  borderRadius: 28,
                  padding: "12px 28px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  minHeight: 44,
                  fontFamily: "Manrope, sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#3D1550"
                  e.currentTarget.style.color = "#FDF8F0"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#3D1550"
                }}
              >
                View Gallery →
              </button>
            </div>
          </div>
          <div className="photos-grid scroll-reveal-right">
            {PHOTOS.map(({ url, alt }, i) => (
              <div
                key={i}
                className={`scroll-reveal sr-delay-${i + 1}`}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  background: "#e5e0f0",
                  cursor: "pointer",
                }}
                onClick={() => navigate("gallery")}
              >
                <img
                  src={url}
                  alt={alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        style={{
          background: "#F9F7FF",
          borderTop: "1px solid rgba(61,21,80,0.06)",
          padding: "56px 20px",
        }}
      >
        <div
          style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
          className="scroll-reveal"
        >
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#1A1A2E",
              margin: "0 0 6px",
            }}
          >
            For Sponsorship &amp; Enquiries
          </h3>
          <p style={{ color: "#6B7280", fontSize: 13, margin: "0 0 28px" }}>
            Reach out to any of our planning committee leads
          </p>
          <div className="contact-cards">
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
                  background: "#ffffff",
                  border: "1.5px solid rgba(61,21,80,0.12)",
                  borderRadius: 32,
                  padding: "11px 18px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  minHeight: 44,
                  boxShadow: "0 1px 4px rgba(61,21,80,0.06)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#FFC153"
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(255,193,83,0.15)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(61,21,80,0.12)"
                  e.currentTarget.style.boxShadow =
                    "0 1px 4px rgba(61,21,80,0.06)"
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFC153"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      color: "rgba(26,26,46,0.4)",
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  >
                    {role}
                  </div>
                  <div
                    style={{ color: "#1A1A2E", fontSize: 13, fontWeight: 600 }}
                  >
                    {num}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}
