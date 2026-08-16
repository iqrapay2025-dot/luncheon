import { useState, useEffect, useRef } from 'react';
import type { NavigateFn } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import eventPhoto1 from '../imports/luncheon.jpeg';

const GALLERY_PHOTOS = [
  { url: eventPhoto1, thumb: eventPhoto1, caption: 'Celebrating together in faith', tag: 'Event' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/The_University_of_Ilorin_Senate_Building.jpeg/960px-The_University_of_Ilorin_Senate_Building.jpeg', thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/The_University_of_Ilorin_Senate_Building.jpeg/960px-The_University_of_Ilorin_Senate_Building.jpeg', caption: 'The iconic Senate Building', tag: 'Campus' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/University_of_Ilorin_.jpg/960px-University_of_Ilorin_.jpg', thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/University_of_Ilorin_.jpg/960px-University_of_Ilorin_.jpg', caption: 'Faculty of Education, UNILORIN', tag: 'Campus' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Photos_from_wiki_loves_earth_ilorin_03.jpg/960px-Photos_from_wiki_loves_earth_ilorin_03.jpg', thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Photos_from_wiki_loves_earth_ilorin_03.jpg/960px-Photos_from_wiki_loves_earth_ilorin_03.jpg', caption: 'Scenic views of Ilorin', tag: 'City' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Photos_from_wiki_loves_earth_ilorin_04.jpg/960px-Photos_from_wiki_loves_earth_ilorin_04.jpg', thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Photos_from_wiki_loves_earth_ilorin_04.jpg/960px-Photos_from_wiki_loves_earth_ilorin_04.jpg', caption: 'Landscape around Ilorin', tag: 'City' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/A_bus_loading_passengers_at_its_designated_bus_stop_in_the_University_of_Ilorin%2C_Ilorin_car_park_02.jpg/960px-A_bus_loading_passengers_at_its_designated_bus_stop_in_the_University_of_Ilorin%2C_Ilorin_car_park_02.jpg', thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/A_bus_loading_passengers_at_its_designated_bus_stop_in_the_University_of_Ilorin%2C_Ilorin_car_park_02.jpg/960px-A_bus_loading_passengers_at_its_designated_bus_stop_in_the_University_of_Ilorin%2C_Ilorin_car_park_02.jpg', caption: 'Around the main campus', tag: 'Campus' },
];

// Lightbox modal
function Lightbox({ photo, onClose, onPrev, onNext }: {
  photo: typeof GALLERY_PHOTOS[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'background 0.2s', zIndex: 1 }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        aria-label="Previous"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11,4 L6,9 L11,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 900, maxHeight: '90vh', width: '100%' }}>
        <img src={photo.url} alt={photo.caption} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12, display: 'block' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: '0 4px' }}>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 600, color: '#FDF8F0' }}>{photo.caption}</div>
            <div style={{ fontSize: 11, color: '#D4A24C', marginTop: 3, fontFamily: 'Manrope, sans-serif' }}>{photo.tag}</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3,3 L13,13 M13,3 L3,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'background 0.2s', zIndex: 1 }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        aria-label="Next"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7,4 L12,9 L7,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}

// Auto-advancing hero carousel
function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const featured = GALLERY_PHOTOS.slice(0, 5);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (i: number) => {
    setIdx((i + featured.length) % featured.length);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((j) => (j + 1) % featured.length), 4500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx((j) => (j + 1) % featured.length), 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [featured.length]);

  const photo = featured[idx];

  return (
    <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/7', background: '#1a0a30', marginBottom: 0 }}>
      {featured.map((p, i) => (
        <img key={i} src={p.url} alt={p.caption}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === idx ? 1 : 0, transition: 'opacity 0.9s ease', display: 'block' }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(15,5,30,0.85) 100%)' }} />

      {/* Arrows */}
      <button onClick={() => go(idx - 1)} aria-label="Previous"
        style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'background 0.2s', zIndex: 5 }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10,3 L5,8 L10,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button onClick={() => go(idx + 1)} aria-label="Next"
        style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'background 0.2s', zIndex: 5 }}
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6,3 L11,8 L6,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* Caption */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', zIndex: 5 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#D4A24C', letterSpacing: '0.1em', marginBottom: 4, fontFamily: 'Manrope, sans-serif' }}>{photo.tag.toUpperCase()}</div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(16px, 2.5vw, 24px)', fontWeight: 700, color: '#FDF8F0', marginBottom: 12 }}>{photo.caption}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {featured.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
              style={{ width: i === idx ? 24 : 7, height: 7, borderRadius: 4, background: i === idx ? '#D4A24C' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', transition: 'all 0.35s', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Infinite marquee strip
function Marquee() {
  const strip = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];
  return (
    <div style={{ overflow: 'hidden', padding: '24px 0', background: '#F9F7FF', borderTop: '1px solid rgba(61,21,80,0.06)', borderBottom: '1px solid rgba(61,21,80,0.06)' }}>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {strip.map((p, i) => (
          <div key={i} style={{ width: 180, height: 120, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
            <img src={p.thumb} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryPage({ navigate }: { navigate: NavigateFn }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  useScrollReveal([]);

  const open = (i: number) => { setLightboxIdx(i); document.body.style.overflow = 'hidden'; };
  const close = () => { setLightboxIdx(null); document.body.style.overflow = ''; };
  const prev = () => setLightboxIdx((i) => i !== null ? (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0);
  const next = () => setLightboxIdx((i) => i !== null ? (i + 1) % GALLERY_PHOTOS.length : 0);

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
      <style>{`
        .gallery-masonry {
          columns: 3;
          column-gap: 12px;
        }
        .gallery-masonry-item {
          break-inside: avoid;
          margin-bottom: 12px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }
        .gallery-masonry-item img {
          width: 100%;
          display: block;
          transition: transform 0.4s ease;
        }
        .gallery-masonry-item:hover img {
          transform: scale(1.04);
        }
        .gallery-masonry-item .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(10,3,25,0.75) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 12px;
        }
        .gallery-masonry-item:hover .overlay {
          opacity: 1;
        }
        @media (max-width: 900px) {
          .gallery-masonry { columns: 2; }
        }
        @media (max-width: 480px) {
          .gallery-masonry { columns: 1; }
        }
      `}</style>

      <Navbar navigate={navigate} />

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(160deg, #3D1550 0%, #5B2C74 100%)', padding: '100px 20px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }} aria-hidden="true">
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
            <defs><pattern id="g-pattern" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse"><path d="M10,100 L10,50 Q40,10 40,10 Q70,10 70,50 L70,100 Z" fill="none" stroke="#D4A24C" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#g-pattern)" />
          </svg>
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
          <div className="animate-fade-up stagger-1" style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#D4A24C', letterSpacing: '0.14em', fontFamily: 'Manrope, sans-serif' }}>THE FIRST GRAND LUNCHEON</div>
          </div>
          <h1 className="animate-fade-up stagger-2" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, color: '#FDF8F0', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Moments Gallery
          </h1>
          <p className="animate-fade-up stagger-3" style={{ color: 'rgba(253,248,240,0.6)', fontSize: 15, margin: '0 0 32px', maxWidth: 480, lineHeight: 1.65, fontFamily: 'Manrope, sans-serif' }}>
            A visual celebration of faith, community, and achievement — snapshots from our journey together.
          </p>
          {/* Coming soon badge */}
          {/* <div className="animate-fade-up stagger-3" style={{ maxWidth: 560, background: 'rgba(212,162,76,0.1)', border: '1px dashed rgba(212,162,76,0.45)', borderRadius: 18, padding: '34px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#FDF8F0', letterSpacing: '-0.01em', marginBottom: 8 }}>
              Coming Soon
            </div>
            <div style={{ fontSize: 14, color: 'rgba(253,248,240,0.6)', lineHeight: 1.65, fontFamily: 'Manrope, sans-serif', maxWidth: 380, margin: '0 auto' }}>
              A curated collection of event photos and campus moments will be published here shortly.
            </div>
          </div> */}
        </div>
      </div>

      {/* ── Coming Soon section ── */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '64px 20px' }}>
        <div style={{ textAlign: 'center', padding: '72px 24px', borderRadius: 20, background: '#F9F7FF', border: '1.5px dashed rgba(61,21,80,0.18)' }} className="scroll-reveal">
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, color: '#D4A24C', letterSpacing: '0.14em', marginBottom: 10 }}>PHOTO GALLERY</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: '#0F0A18', margin: 0 }}>Coming Soon</h2>
          <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.7, maxWidth: 460, margin: '14px auto 0', fontFamily: 'Manrope, sans-serif' }}>
            Lovely pictures from the send-forth, awards night, and our campus moments are being prepared. We'll publish them here as soon as they're ready — please check back.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#3D1550', padding: '60px 20px', textAlign: 'center' }}>
        <div className="scroll-reveal" style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#D4A24C', letterSpacing: '0.14em', marginBottom: 10, fontFamily: 'Manrope, sans-serif' }}>BE PART OF THE MOMENT</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 700, color: '#FDF8F0', margin: '0 0 12px', letterSpacing: '-0.015em' }}>
            Create your own lasting memory
          </h2>
          <p style={{ color: 'rgba(253,248,240,0.55)', fontSize: 14, lineHeight: 1.65, marginBottom: 28, fontFamily: 'Manrope, sans-serif' }}>
            Register for the First Grand Luncheon and be part of a historic celebration of faith, excellence, and community.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('register')}
              style={{ background: '#D4A24C', color: '#3D1550', border: 'none', borderRadius: 28, padding: '13px 32px', fontWeight: 700, fontSize: 14, cursor: 'pointer', minHeight: 48, fontFamily: 'Manrope, sans-serif', transition: 'background 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#E8C784')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#D4A24C')}
            >Register Now →</button>
            <button onClick={() => navigate('landing')}
              style={{ background: 'transparent', color: 'rgba(253,248,240,0.7)', border: '1.5px solid rgba(253,248,240,0.25)', borderRadius: 28, padding: '13px 28px', fontWeight: 500, fontSize: 14, cursor: 'pointer', minHeight: 48, fontFamily: 'Manrope, sans-serif', transition: 'all 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = '#D4A24C')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(253,248,240,0.25)')}
            >← Back to Home</button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
