import { useState, useEffect, useRef, type CSSProperties } from 'react';
import type { NavigateFn } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import mssnLogo from '../imports/mssn_logo.jpg';
import busImage from '../imports/bus image.jpg';
import graduationImage from '../imports/graduation.jpeg';
import hallConvoImage from '../imports/hall convo.jpeg';

const PACKAGES = [
  { name: 'Barakah', price: 'Free',    priceNote: 'Attendance', items: ['Event access', 'Programme booklet'] },
  { name: 'Fadl',    price: '₦5,000',  priceNote: 'Standard',   items: ['Event access', 'Food & drinks', 'Small souvenir'] },
  { name: 'Ihsan',   price: '₦10,000', priceNote: 'Premium',    items: ['Event access', 'Food & drinks', 'Premium souvenir', 'Priority seating'] },
  { name: 'Ikram',   price: '₦15,000', priceNote: 'VIP',        items: ['Event access', 'Food & drinks', 'Custom VIP souvenir', 'VIP front seating', 'Name personalisation'] },
];

const FEATURES = [
  'Send-forth for Graduating Students',
  'Awards & Certificate Presentation',
  'Haflah for Madrasah Graduands',
  'Launch of MSSN Alumni Association',
  'MSSN Bus Donation Drive',
  'New Executive Council Introduction',
];

const PHOTOS = [
  { url: mssnLogo, alt: 'MSSN UNILORIN logo' },
  { url: busImage, alt: 'Bus image' },
  { url: graduationImage, alt: 'Graduation image' },
  { url: hallConvoImage, alt: 'Hall conversation' },
];

const ctrlBtnStyle: CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,162,76,0.35)',
  color: '#E8C784',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s',
  fontFamily: 'Manrope, sans-serif',
  padding: 0,
};

function Barcode() {
  const ws = [3,1,2,3,1,1,2,3,1,2,1,3,2,1,3,1,2,1,2,3,1,2,3,1,1,2,3,1,2,1];
  let x = 0;
  const rects = ws.map((w, i) => {
    const el = <rect key={i} x={x} y={0} width={w} height={26} fill="rgba(212,162,76,0.75)" rx={0.4} />;
    x += w + 1;
    return el;
  });
  return <svg width="110" height="26" viewBox={`0 0 ${x} 26`} preserveAspectRatio="none">{rects}</svg>;
}

function TicketCard({ pkg }: { pkg: typeof PACKAGES[0] }) {
  return (
    <div style={{ display: 'flex', borderRadius: 18, overflow: 'visible', background: '#12062a', boxShadow: '0 12px 48px rgba(61,21,80,0.3)', height: 180, position: 'relative' }}>
      <div style={{ position: 'absolute', right: 'calc(35% - 11px)', top: -11, width: 22, height: 22, borderRadius: '50%', background: '#ffffff', zIndex: 5 }} aria-hidden="true" />
      <div style={{ position: 'absolute', right: 'calc(35% - 11px)', bottom: -11, width: 22, height: 22, borderRadius: '50%', background: '#ffffff', zIndex: 5 }} aria-hidden="true" />
      {/* Left section */}
      <div style={{ flex: 1, padding: '16px 20px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={mssnLogo} alt="MSSN" style={{ width: 26, height: 26, objectFit: 'contain', borderRadius: 3, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#D4A24C', letterSpacing: '0.1em', fontFamily: 'Outfit, sans-serif' }}>MSSN UNILORIN</div>
            <div style={{ fontSize: 7, color: 'rgba(212,162,76,0.45)' }}>GRAND LUNCHEON 2026</div>
          </div>
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.02em', background: 'linear-gradient(130deg,#D4A24C 0%,#E8C784 35%,#f0d080 55%,#D4A24C 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {pkg.name}
        </div>
      </div>
      <div style={{ width: 0, borderLeft: '2px dashed rgba(212,162,76,0.3)', flexShrink: 0 }} aria-hidden="true" />
      {/* Right stub */}
      <div style={{ width: 160, flexShrink: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#D4A24C', letterSpacing: '0.08em', fontFamily: 'Outfit, sans-serif' }}>MSSN 2026</div>
          <div style={{ fontSize: 7, color: 'rgba(253,248,240,0.3)', marginTop: 2 }}>University of Ilorin</div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#FDF8F0', marginBottom: 2, fontFamily: 'Manrope, sans-serif' }}>{pkg.name}</div>
          <div style={{ fontSize: 10, color: 'rgba(253,248,240,0.45)' }}>Entry Pass</div>
        </div>
        <Barcode />
      </div>
    </div>
  );
}

function DecorativeGraphic() {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1.15', maxWidth: 400 }} aria-hidden="true">
      <svg viewBox="0 0 400 350" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="265" cy="148" r="132" fill="#D4A24C" />
        <circle cx="158" cy="218" r="96" fill="#E8762A" />
        <circle cx="318" cy="268" r="75" fill="#6B21A8" />
        <path d="M70,350 L70,182 Q70,58 148,36 Q226,58 226,182 L226,350 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <polygon points="205,28 210,46 228,46 214,57 219,75 205,64 191,75 196,57 182,46 200,46" fill="rgba(255,255,255,0.3)" />
      </svg>
    </div>
  );
}

export default function LandingPage({ navigate }: { navigate: NavigateFn }) {
  const [selectedIdx, setSelectedIdx] = useState(1);
  const pkg = PACKAGES[selectedIdx];
  useScrollReveal([]);

  // ── Dignified speaker audio player ──
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const fmt = (t: number) => {
    if (!isFinite(t) || t < 0) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play();
      setIsPlaying(true);
    } else {
      a.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const skip = (secs: number) => {
    const a = audioRef.current;
    if (!a) return;
    const next = Math.max(0, Math.min(a.duration || 0, a.currentTime + secs));
    a.currentTime = next;
    setCurrentTime(next);
  };

  const onSeek = (v: number) => {
    const a = audioRef.current;
    if (a && isFinite(v)) a.currentTime = v;
    setCurrentTime(v);
  };

  // Hook media element events to React state
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
      <style>{`
        /* ── Countdown bar ── */
        .cb-text { display: inline; }
        /* ── Hero two-col ── */
        .hero-grid { display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: flex-start; }
        .hero-price-col { width: 220px; flex-shrink: 0; }
        /* ── Feature grid ── */
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px 20px; margin-top: 24px; }
        /* ── About card header ── */
        .about-header { display: grid; grid-template-columns: 1fr auto; align-items: center; padding: 48px 52px 0; }
        .about-deco { width: 340px; flex-shrink: 0; margin-right: -12px; }
        /* ── About strip ── */
        .about-strip { display: grid; grid-template-columns: repeat(3, 1fr); padding: 0 52px 44px; border-top: 1px solid rgba(212,162,76,0.12); margin-top: 32px; }
        .about-strip-cell { padding: 24px 28px 0; border-left: 1px solid rgba(212,162,76,0.12); }
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
          .about-strip-cell { border-left: none; border-top: 1px solid rgba(212,162,76,0.12); padding: 20px 0 0; }
          .about-strip-cell:first-child { border-top: none; padding-top: 20px; }
          .gallery-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        @media (max-width: 700px) {
          .hero-grid { grid-template-columns: 1fr; gap: 0; }
          .hero-price-col { display: none; }
          .feature-grid { grid-template-columns: repeat(2, 1fr); gap: 10px 16px; }
          .about-header { padding: 28px 20px 0; }
          .hero-section-inner { padding: 28px 20px 40px; }
          .cb-text { display: none; }
        }

        @media (max-width: 480px) {
          .feature-grid { grid-template-columns: 1fr; gap: 10px; }
          .photos-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ── Countdown bar ── */}
      <div style={{ background: '#F9F7FF', borderBottom: '1px solid rgba(61,21,80,0.08)', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, flexShrink: 0 }}>
          {[{ n: '--', l: 'Weeks' }, { n: '--', l: 'Days' }, { n: '--', l: 'Hours' }, { n: '--', l: 'Mins' }].map(({ n, l }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#3D1550', fontVariantNumeric: 'tabular-nums', lineHeight: 1, fontFamily: 'Outfit, sans-serif' }}>{n}</span>
              <span style={{ fontSize: 9, color: 'rgba(61,21,80,0.4)', letterSpacing: '0.06em', marginBottom: 1 }}>{l}</span>
            </div>
          ))}
        </div>
        <span className="cb-text" style={{ color: 'rgba(61,21,80,0.4)', fontSize: 12 }}>Event date to be announced</span>
      </div>

      <Navbar navigate={navigate} />

      {/* ══ HERO ══ */}
      <section style={{ background: '#ffffff', paddingTop: 68 }}>
        <div className="hero-section-inner" style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 32px 60px' }}>

          {/* Brand badge */}
          <div className="animate-fade-up stagger-1" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <img src={mssnLogo} alt="MSSN logo" style={{ width: 42, height: 42, objectFit: 'contain', borderRadius: 6 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3D1550', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.04em' }}>MSSN UNILORIN</div>
              <div style={{ fontSize: 10, color: '#D4A24C', letterSpacing: '0.12em', fontWeight: 600 }}>GRAND LUNCHEON 2026</div>
            </div>
          </div>

          {/* H1 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <h1 className="animate-fade-up stagger-2"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4.5vw, 54px)', fontWeight: 800, color: '#0F0A18', lineHeight: 1.08, margin: 0, maxWidth: 600, letterSpacing: '-0.02em' }}
            >
              Experience The First<br />Grand Luncheon
            </h1>
            <div style={{ flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 6, cursor: 'pointer', userSelect: 'none', display: 'none' }}
              className="animate-fade-in stagger-3"
              onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(26,26,46,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7,2 L7,12 M3,8 L7,12 L11,8" stroke="#3D1550" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span style={{ fontSize: 9, color: 'rgba(26,26,46,0.4)', letterSpacing: '0.08em' }}>SCROLL</span>
            </div>
          </div>

          <div className="animate-fade-up stagger-2" style={{ fontSize: 12, color: 'rgba(26,26,46,0.38)', marginBottom: 24 }}>
            Home &rsaquo; Register
          </div>

          {/* Two-column hero */}
          <div className="hero-grid">
            {/* LEFT */}
            <div style={{ minWidth: 0 }}>
              {/* Package tabs */}
              <div id="packages-section" className="animate-fade-up stagger-3" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                {PACKAGES.map((p, i) => (
                  <button key={p.name} onClick={() => setSelectedIdx(i)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 24, border: `1.5px solid ${i === selectedIdx ? '#3D1550' : 'rgba(26,26,46,0.14)'}`, background: i === selectedIdx ? '#3D1550' : 'transparent', color: i === selectedIdx ? '#FDF8F0' : 'rgba(26,26,46,0.5)', fontWeight: i === selectedIdx ? 600 : 400, fontSize: 12.5, cursor: 'pointer', transition: 'all 0.15s', minHeight: 36, fontFamily: 'Manrope, sans-serif' }}
                  >
                    {i === selectedIdx && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4A24C', flexShrink: 0 }} />}
                    {p.name} Pass
                  </button>
                ))}
              </div>

              {/* Ticket */}
              <div className="animate-fade-up stagger-3"><TicketCard pkg={pkg} /></div>

              {/* Feature grid */}
              <div className="feature-grid animate-fade-up stagger-4">
                {FEATURES.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 15 15" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                      <circle cx="7.5" cy="7.5" r="7" stroke="#D4A24C" strokeWidth="1" fill="rgba(212,162,76,0.1)" />
                      <path d="M4.5,7.5 L6.5,9.5 L10.5,5.5" stroke="#D4A24C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 12, color: '#3a2d40', lineHeight: 1.45 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-fade-up stagger-5" style={{ marginTop: 28 }}>
                <button onClick={() => navigate('register')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 26px', borderRadius: 32, border: '1.5px solid rgba(26,26,46,0.2)', background: 'transparent', color: '#1A1A2E', fontWeight: 500, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Manrope, sans-serif', minHeight: 46 }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#3D1550'; e.currentTarget.style.color = '#FDF8F0'; e.currentTarget.style.borderColor = '#3D1550'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1A2E'; e.currentTarget.style.borderColor = 'rgba(26,26,46,0.2)'; }}
                >
                  Register for the Grand Luncheon
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" /><path d="M6,8 H10 M8,6 L10,8 L8,10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>

            {/* RIGHT – price card (hidden on mobile via CSS) */}
            <div className="hero-price-col animate-fade-up stagger-3">
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 38, fontWeight: 800, color: '#0F0A18', lineHeight: 1 }}>{pkg.price}</span>
                {pkg.price !== 'Free' && <span style={{ fontSize: 12, color: 'rgba(26,26,46,0.38)', marginLeft: 4 }}>/ea</span>}
              </div>
              <div style={{ fontSize: 11, color: '#D4A24C', fontWeight: 600, marginBottom: 18 }}>{pkg.priceNote}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
                {pkg.items.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 15 15" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true"><path d="M2.5,7.5 L6,11 L12.5,4" stroke="#D4A24C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span style={{ fontSize: 12.5, color: '#3a2d40', lineHeight: 1.4, fontFamily: 'Manrope, sans-serif' }}>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('register')}
                style={{ width: '100%', padding: '12px 0', borderRadius: 10, border: '1.5px solid rgba(26,26,46,0.15)', background: '#ffffff', color: '#1A1A2E', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s', minHeight: 44, boxShadow: '0 2px 8px rgba(26,26,46,0.06)', fontFamily: 'Manrope, sans-serif' }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#3D1550'; e.currentTarget.style.color = '#FDF8F0'; e.currentTarget.style.borderColor = '#3D1550'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#1A1A2E'; e.currentTarget.style.borderColor = 'rgba(26,26,46,0.15)'; }}
              >Register Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DARK ABOUT CARD ══ */}
      <div style={{ padding: '0 16px', marginBottom: 0 }} id="about-section">
        <div style={{ background: '#3D1550', borderRadius: 20, overflow: 'hidden' }}>

          {/* Header */}
          <div className="about-header">
            <div style={{ maxWidth: 520 }} className="scroll-reveal">
              <div style={{ fontSize: 10, fontWeight: 600, color: '#D4A24C', letterSpacing: '0.14em', marginBottom: 12, fontFamily: 'Manrope, sans-serif' }}>WHO WE ARE AND WHAT WE DO</div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(18px, 2.8vw, 28px)', fontWeight: 700, color: '#FDF8F0', lineHeight: 1.32, margin: '0 0 28px' }}>
                Proudly celebrating excellence, faith, and giving back to the community through trusted gatherings.
              </p>
              <audio
                ref={audioRef}
                id="dignifiedSpeaker"
                preload="metadata"
                src="https://res.cloudinary.com/nlmhqbwe/video/upload/v1786871495/MiniMax_2026-08-16_10_05_39_Dignified_Speaker_ugrry1.wav"
              />
              <button onClick={togglePlay} type="button" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: isPlaying ? '#E8C784' : '#D4A24C', color: '#3D1550', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.background = '#E8C784')}
                  onMouseOut={(e) => (e.currentTarget.style.background = isPlaying ? '#E8C784' : '#D4A24C')}
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                      <rect x="2" y="1" width="4" height="12" rx="0.9" />
                      <rect x="8" y="1" width="4" height="12" rx="0.9" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                      <path d="M4 1 L13 7 L4 13 Z" />
                    </svg>
                  )}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, color: '#FDF8F0', fontWeight: 500, fontFamily: 'Manrope, sans-serif' }}>
                    {isPlaying ? 'Pause — Dignified Speaker' : 'Play — Learn about our event'}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(253,248,240,0.45)', marginTop: 1 }}>
                    MSSN UNILORIN • Grand Luncheon
                  </div>
                </div>
              </button>

              {/* Transport controls */}
              <div style={{ marginLeft: 16, marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <button type="button" aria-label="Backward ten seconds" onClick={() => skip(-10)} style={ctrlBtnStyle}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(212,162,76,0.22)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                >
                  <svg width="15" height="15" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M11 3 L15 6.5 L11 10 Z M6 3 L10 6.5 L6 10 Z M3 4 L3 12 L5 12 L5 4 Z" /></svg>
                </button>
                <button type="button" aria-label="Stop" onClick={stop} style={ctrlBtnStyle}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(212,162,76,0.22)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2" y="2" width="10" height="10" rx="1.5" /></svg>
                </button>
                <button type="button" aria-label="Forward ten seconds" onClick={() => skip(10)} style={ctrlBtnStyle}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(212,162,76,0.22)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                >
                  <svg width="15" height="15" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M7 3 L11 6.5 L7 10 Z M12 3 L16 6.5 L12 10 Z M3 4 L3 12 L5 12 L5 4 Z" /></svg>
                </button>
              </div>

              {/* Seek bar */}
              <div style={{ marginLeft: 16, marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 10, color: 'rgba(253,248,240,0.5)', fontFamily: 'Manrope, sans-serif', minWidth: 30, textAlign: 'center' }}>{fmt(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  style={{ flex: 1, accentColor: '#D4A24C', cursor: 'pointer', height: 4 }}
                  aria-label="Seek through audio"
                />
                <span style={{ fontSize: 10, color: 'rgba(253,248,240,0.5)', fontFamily: 'Manrope, sans-serif', minWidth: 30, textAlign: 'center' }}>{fmt(duration)}</span>
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
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                title: 'Instant Registration',
                desc: 'Register in seconds and receive your confirmation immediately with a unique reference ID.',
                action: () => navigate('register'),
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                title: 'Curated Packages',
                desc: 'Choose from 4 tailored packages — free access to a full VIP experience with personalised souvenirs.',
                action: () => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                title: 'Lasting Memories',
                desc: 'Certificates, souvenirs, and an unforgettable send-forth ceremony for the graduating class.',
                action: () => navigate('gallery'),
              },
            ].map(({ icon, title, desc, action }, i) => (
              <div key={title} className={`about-strip-cell scroll-reveal sr-delay-${i + 1}`}>
                <div style={{ marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#FDF8F0', marginBottom: 6, fontFamily: 'Outfit, sans-serif' }}>{title}</div>
                <p style={{ fontSize: 12.5, color: 'rgba(253,248,240,0.5)', lineHeight: 1.65, margin: '0 0 10px', fontFamily: 'Manrope, sans-serif' }}>{desc}</p>
                <button onClick={action}
                  style={{ background: 'none', border: 'none', color: '#D4A24C', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: 'Manrope, sans-serif', transition: 'opacity 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Explore More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ GALLERY PREVIEW ══ */}
      <section style={{ padding: '64px 16px', background: '#ffffff' }}>
        <div className="gallery-grid" style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="scroll-reveal-left">
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#0F0A18', lineHeight: 1.18, margin: '0 0 14px', letterSpacing: '-0.015em' }}>
              Celebrating excellence,<br />built on faith.
            </h2>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4A24C', flexShrink: 0, marginTop: 7 }} aria-hidden="true" />
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, margin: 0, maxWidth: 340 }}>
                Honouring graduates, launching the alumni association, and giving back — all in one grand gathering.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('register')}
                style={{ background: '#3D1550', color: '#FDF8F0', border: 'none', borderRadius: 28, padding: '12px 28px', fontWeight: 600, fontSize: 13, cursor: 'pointer', minHeight: 44, fontFamily: 'Manrope, sans-serif', transition: 'background 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#5B2C74')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#3D1550')}
              >Register Now →</button>
              <button onClick={() => navigate('gallery')}
                style={{ background: 'transparent', color: '#3D1550', border: '1.5px solid rgba(61,21,80,0.2)', borderRadius: 28, padding: '12px 28px', fontWeight: 600, fontSize: 13, cursor: 'pointer', minHeight: 44, fontFamily: 'Manrope, sans-serif', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#3D1550'; e.currentTarget.style.color = '#FDF8F0'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3D1550'; }}
              >View Gallery →</button>
            </div>
          </div>
          <div className="photos-grid scroll-reveal-right">
            {PHOTOS.map(({ url, alt }, i) => (
              <div key={i} className={`scroll-reveal sr-delay-${i + 1}`} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', background: '#e5e0f0', cursor: 'pointer' }} onClick={() => navigate('gallery')}>
                <img src={url} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section style={{ background: '#F9F7FF', borderTop: '1px solid rgba(61,21,80,0.06)', padding: '56px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }} className="scroll-reveal">
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 700, color: '#1A1A2E', margin: '0 0 6px' }}>For Sponsorship &amp; Enquiries</h3>
          <p style={{ color: '#6B7280', fontSize: 13, margin: '0 0 28px' }}>Reach out to any of our planning committee leads</p>
          <div className="contact-cards">
            {[{ role: 'Chairman', num: '08160909017' }, { role: 'Ameer', num: '09077479849' }, { role: 'Vice Chairman', num: '09071107564' }].map(({ role, num }) => (
              <a key={role} href={`tel:${num}`}
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ffffff', border: '1.5px solid rgba(61,21,80,0.12)', borderRadius: 32, padding: '11px 18px', textDecoration: 'none', transition: 'all 0.2s', minHeight: 44, boxShadow: '0 1px 4px rgba(61,21,80,0.06)' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#D4A24C'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(212,162,76,0.15)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(61,21,80,0.12)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(61,21,80,0.06)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: 'rgba(26,26,46,0.4)', fontSize: 10, fontWeight: 500 }}>{role}</div>
                  <div style={{ color: '#1A1A2E', fontSize: 13, fontWeight: 600 }}>{num}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
