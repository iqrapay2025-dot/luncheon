import { useEffect, useState } from "react"
import type { NavigateFn } from "../App"
import Navbar from "./Navbar"
import { PACKAGES, formatPrice } from "../data/packages"
import { EVENT_DATE_LABEL } from "../data/event"
import luncheonImage from "../imports/luncheon.jpeg"
import graduationImage from "../imports/graduation.jpeg"
import hallConvoImage from "../imports/hall convo.jpeg"
import mosqueImage from "../imports/Unilorin_Central_Mosque-1-1.jpeg"

interface HeroSectionProps {
  navigate: NavigateFn
}

const SLIDES = [
  { url: luncheonImage, alt: "The Grand Luncheon banquet dinner spread" },
  {
    url: graduationImage,
    alt: "Send-forth celebration for graduating students",
  },
  {
    url: hallConvoImage,
    alt: "MSSN UNILORIN members gathered in the main hall",
  },
  { url: mosqueImage, alt: "University of Ilorin Central Mosque" },
]

const AUTOPLAY_MS = 5200

/** Lowest-priced tier—derived from live package data, never hard-coded. */
const CHEAPEST = PACKAGES.reduce((min, p) => (p.price < min.price ? p : min))
const STARTING_FROM = `${formatPrice(CHEAPEST.price)} / ${CHEAPEST.name} package`

export default function HeroSection({ navigate }: HeroSectionProps) {
  const [slide, setSlide] = useState(0)
  const [hovered, setHovered] = useState(false)

  // Evaluated once (lazy) rather than calling matchMedia on every render.
  const [prefersReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    if (prefersReduced || hovered) return
    const id = window.setInterval(() => {
      // Skip the tick while the tab is hidden — avoids queueing a burst of
      // slide transitions in the background and saves CPU/battery.
      if (typeof document !== "undefined" && document.hidden) return
      setSlide((s) => (s + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [prefersReduced, hovered])

  const go = (dir: number) =>
    setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length)
  const jump = (i: number) => setSlide(i)

  return (
    <>
      <Navbar navigate={navigate} />
      <style>{`
        .hero-hero { position: relative; background: #ffffff; padding-top: 68px; }
        .hero-shell { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 24px 28px; }
        .hero-media {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: clamp(360px, 48vw, 440px);
          box-shadow: 0 18px 50px rgba(61,21,80,0.14);
          isolation: isolate;
        }
        .hero-slide {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.9s ease;
          opacity: 0;
        }
                .hero-slide.is-visible {
          opacity: 1;
        }
        .hero-scrim {
          position: absolute;
          inset: 0;
          /* Solid base first (contrast is always guaranteed), then the
             gradient deepens it towards the edges. Center band now sits at
             ~0.64 effective darkness (previously ~0.45) so the title and
             subtext stay clearly legible over every slide, including bright
             ones like the banquet spread and mosque shots. */
          background:
            linear-gradient(180deg, rgba(26,9,41,0.72) 0%, rgba(26,9,41,0.52) 45%, rgba(20,7,33,0.85) 100%),
            linear-gradient(rgba(26,9,41,0.24), rgba(26,9,41,0.24));
        }
        .hero-pill {
          position: absolute; top: 18px; left: 50%;
          transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          padding: 7px 16px;
          border-radius: 999px;
          background: rgba(14,5,24,0.55);
          border: 1px solid rgba(255,255,255,0.45);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #FDF8F0;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: "Manrope", sans-serif;
          white-space: nowrap;
          z-index: 4;
        }
        .hero-dot-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #FFC153;
          box-shadow: 0 0 0 3px rgba(255,193,83,0.3);
        }
        .hero-copy {
          position: absolute; inset: 0; z-index: 3;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 0 22px 90px;
        }
        .hero-eyebrow {
          font-family: "Manrope", sans-serif;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #E8C784; margin: 0 0 14px;
        }
        .hero-title {
          font-family: "Outfit", sans-serif;
          font-weight: 800;
          font-size: clamp(34px, 5.6vw, 62px);
          line-height: 1.04;
          color: #FDF8F0;
          margin: 0 0 16px;
          max-width: 900px;
        }
        .hero-title span { color: #FFC153; white-space: nowrap; }
        .hero-sub {
          max-width: 560px;
          margin: 0 auto;
          font-size: clamp(13.5px, 1.6vw, 16px);
          line-height: 1.7;
          color: rgba(253,248,240,0.88);
          font-family: "Manrope", sans-serif;
        }
        .hero-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 5;
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.5);
          background: rgba(20,9,33,0.4);
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
          color: #FDF8F0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; padding: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .hero-arrow:hover { background: #FFC153; border-color: #FFC153; color: #3D1550; }
        .hero-arrow--prev { left: 14px; }
        .hero-arrow--next { right: 14px; }
        .hero-dots {
          position: absolute; bottom: 76px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 7px; z-index: 5;
        }
        .hero-dot {
          width: 8px; height: 8px; border-radius: 999px;
          border: none; padding: 0; cursor: pointer;
          background: rgba(255,255,255,0.42);
          transition: width 0.25s, background 0.25s;
        }
        .hero-dot.is-on { width: 22px; background: #FFC153; }
        .hero-card {
          position: relative;
          z-index: 6;
          margin: -56px auto 0;
          width: min(560px, calc(100% - 32px));
          background: #ffffff;
          border: 1px solid rgba(255,193,83,0.35);
          border-radius: 18px;
          box-shadow: 0 22px 60px rgba(61,21,80,0.2);
          padding: 18px 22px;
          display: flex; align-items: center; gap: 18px;
        }
        .hero-detail { min-width: 0; flex: 1 1 auto; }
        .hero-detail__label {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: #9CA3AF; margin-bottom: 3px; font-family: "Manrope", sans-serif;
        }
        .hero-detail__value {
          font-family: "Outfit", sans-serif;
          font-size: 15px; font-weight: 700; color: #1A1A2E; line-height: 1.25;
        }
        .hero-vr {
          width: 1px; height: 40px; flex-shrink: 0;
          background: rgba(61,21,80,0.12);
        }
        .hero-cta {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 20px; min-height: 44px;
          border: none; border-radius: 12px; cursor: pointer;
          background: linear-gradient(135deg, #3D1550 0%, #5B2C74 100%);
          color: #FDF8F0; font-weight: 700; font-size: 13px;
          font-family: "Manrope", sans-serif;
          box-shadow: 0 8px 20px rgba(61,21,80,0.32);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(61,21,80,0.4); }

        @media (max-width: 900px) {
          .hero-shell { padding: 0 20px; }
          .hero-media { height: clamp(360px, 62vw, 440px); }
          .hero-copy { padding-bottom: 110px; }
          .hero-dots { bottom: 88px; }
        }
        @media (max-width: 560px) {
          .hero-hero { padding-top: 68px; }
          .hero-shell { padding: 0 16px 32px; }
          .hero-media { height: clamp(380px, 84vw, 460px); }
          .hero-pill { font-size: 10px; letter-spacing: 0.1em; padding: 6px 13px; }
          .hero-eyebrow { letter-spacing: 0.22em; font-size: 9.5px; }
          .hero-copy { padding: 0 12px 130px; }
          .hero-card {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin: -70px auto 0;
            width: min(430px, calc(100% - 24px));
            padding: 20px;
          }
          .hero-detail { text-align: center; }
          .hero-vr { width: 100%; height: 1px; }
          .hero-cta { width: 100%; justify-content: center; }
          .hero-arrow { width: 34px; height: 34px; }
          .hero-dots { bottom: 110px; }
        }
      `}</style>
      <section className="hero-hero">
        <div className="hero-shell">
          {/* ── Carousel media block ── */}
          <div
            className="hero-media"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={() => setHovered(false)}
          >
            {SLIDES.map((s, i) => (
              <img
                key={s.alt}
                src={s.url}
                alt={i === slide ? s.alt : ""}
                aria-hidden={i !== slide}
                className={`hero-slide${i === slide ? " is-visible" : ""}`}
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : undefined}
              />
            ))}

            <div className="hero-scrim" aria-hidden="true" />

            {/* Registration pill */}
            <div className="hero-pill">
              {/* <span className="hero-dot-pulse" /> */}
              Registration is now open!
            </div>

            {/* Center content */}
            <div className="hero-copy">
              <p className="hero-eyebrow">
                MUSLIM STUDENTS&apos; SOCIETY OF NIGERIA — UNILORIN BRANCH
              </p>
              <h1 className="hero-title">
                The First <span>Grand Luncheon</span>
              </h1>
              <p className="hero-sub">
                A celebration of send-forth, achievement, and giving back — join
                us for an unforgettable gathering of faith and community.
              </p>
            </div>

            {/* Carousel controls */}
            <button
              type="button"
              className="hero-arrow hero-arrow--prev"
              onClick={() => go(-1)}
              aria-label="Previous hero image"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="hero-arrow hero-arrow--next"
              onClick={() => go(1)}
              aria-label="Next hero image"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="hero-dots" aria-label="Choose hero image">
              {SLIDES.map((s, i) => (
                <button
                  key={s.alt}
                  type="button"
                  className={`hero-dot${i === slide ? " is-on" : ""}`}
                  onClick={() => jump(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === slide}
                />
              ))}
            </div>
          </div>

          {/* ── Overlapping floating info card ── */}
          <section className="hero-card" aria-label="Event details">
            <div className="hero-detail">
              <div className="hero-detail__label">Starting from</div>
              <div className="hero-detail__value">{STARTING_FROM}</div>
            </div>
            <div className="hero-vr" aria-hidden="true" />
            <div className="hero-detail">
              <div className="hero-detail__label">Event Date</div>
              <div className="hero-detail__value">{EVENT_DATE_LABEL}</div>
            </div>
            <div className="hero-vr" aria-hidden="true" />
            <button
              type="button"
              className="hero-cta"
              onClick={() => navigate("register")}
            >
              Register Now
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </section>
        </div>
      </section>
    </>
  )
}
