import { useState, useEffect, useRef } from 'react';
import type { NavigateFn } from '../App';
import Navbar from '../components/Navbar';
import mssnLogo from '../imports/mssn_logo.jpg';

const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwiwnmocxxEDwlfiZ3c7SkelmfYeUtcvn38YDQCTiLHbz6VyM6hYxPK_UH7Gaxl_QRW/exec';

// ── Package price map ──
const PKG_AMOUNTS: Record<string, string> = {
  Barakah: '0',
  Fadl: '5000',
  Ihsan: '10000',
  Ikram: '15000',
};

interface FormData {
  // Step 1 – Package
  package: string;
  amount: string;
  // Step 2 – Meal
  meal: string;
  mealNote: string;
  // Step 3 – Personal
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  gender: string;
  level: string;
  matricNumber: string;
  department: string;
  faculty: string;
  // Step 4 – Ikram customisation
  ikramWantsCustom: string;       // 'Yes' | 'No' | ''
  ikramCustomization: string;     // free-text details
  // Step 5 – Alumni
  joinAlumni: string;
  alumniName: string;
  alumniYear: string;
  occupation: string;
  // Step 6 – Bus donation
  busDonate: string;
  busAmount: string;
  // Step 7 – Payment
  receiptFile: File | null;
  payerName: string;
  // Step 8 – Confirm
  confirmed: boolean;
}

const INIT: FormData = {
  package: '', amount: '',
  meal: '', mealNote: '',
  firstName: '', lastName: '', email: '', whatsapp: '', gender: '', level: '', matricNumber: '', department: '', faculty: '',
  ikramWantsCustom: '', ikramCustomization: '',
  joinAlumni: '', alumniName: '', alumniYear: '', occupation: '',
  busDonate: '', busAmount: '',
  receiptFile: null, payerName: '',
  confirmed: false,
};

const PACKAGES = [
  { name: 'Barakah', price: 'Free',    badge: 'Free',    desc: 'Event access & programme booklet' },
  { name: 'Fadl',    price: '₦5,000',  badge: 'Standard',desc: 'Access + food, drinks, souvenir' },
  { name: 'Ihsan',   price: '₦10,000', badge: 'Premium', desc: 'Priority seating + premium souvenir' },
  { name: 'Ikram',   price: '₦15,000', badge: 'VIP',     desc: 'VIP seating + personalised souvenir' },
];

const MEALS = ['Jollof Rice & Chicken', 'Fried Rice & Fish', 'Vegetarian Combo', 'Tuwo Shinkafa & Egusi'];

const LEVEL_OPTS = ['100L', '200L', '300L', '400L', '500L', '600L', 'Graduate Alumni', 'Madrasah Graduand', 'Haflah Graduate', 'Other'];
const STUDENT_LEVELS = ['100L', '200L', '300L', '400L', '500L', '600L', 'Graduate Alumni'];

const CAROUSEL_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1780847615151-5f6397829786?w=640&h=900&fit=crop&auto=format', caption: 'Celebrating together in faith' },
  { url: 'https://images.unsplash.com/photo-1528862973381-9bc5ad6d4227?w=640&h=900&fit=crop&auto=format', caption: 'Grand architecture and tradition' },
  { url: 'https://images.unsplash.com/photo-1504164996022-09080787b6b8?w=640&h=900&fit=crop&auto=format', caption: 'A community of excellence' },
  { url: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=640&h=900&fit=crop&auto=format', caption: 'Marking milestones that matter' },
];

const STEPS = ['Package', 'Meal', 'Personal Info', 'Customise', 'Alumni', 'Donation', 'Payment', 'Review'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(61,21,80,0.15)',
  fontSize: 14, color: '#1A1A2E', background: '#ffffff', outline: 'none', fontFamily: 'Manrope, sans-serif',
  transition: 'border-color 0.15s', minHeight: 44, boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: '#3D1550', marginBottom: 6, display: 'block', fontFamily: 'Manrope, sans-serif',
};
const sectionTitle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#1A1A2E', margin: '0 0 4px', letterSpacing: '-0.01em',
};
const sectionSub: React.CSSProperties = {
  fontSize: 13, color: '#9CA3AF', marginBottom: 28, fontFamily: 'Manrope, sans-serif',
};

function FieldSet({ label, helper, children }: { label: string; helper?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {helper && <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5, fontFamily: 'Manrope, sans-serif' }}>{helper}</div>}
    </div>
  );
}

function ToggleBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ flex: 1, padding: '11px 16px', borderRadius: 10, border: `1.5px solid ${active ? '#3D1550' : 'rgba(61,21,80,0.12)'}`, background: active ? 'rgba(61,21,80,0.06)' : '#ffffff', fontWeight: active ? 600 : 400, fontSize: 13, color: '#1A1A2E', cursor: 'pointer', transition: 'all 0.15s', minHeight: 44, fontFamily: 'Manrope, sans-serif' }}
    >{label}</button>
  );
}

// ── Left panel carousel ──
function LeftPanel({ pkg, step, total }: { pkg: string; step: number; total: number }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx((i) => (i + 1) % CAROUSEL_IMAGES.length), 4200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((i) => (i + 1) % CAROUSEL_IMAGES.length), 4200);
  };

  const img = CAROUSEL_IMAGES[idx];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 'inherit', background: '#1a0a30' }}>
      {CAROUSEL_IMAGES.map((im, i) => (
        <img key={i} src={im.url} alt={im.caption}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === idx ? 1 : 0, transition: 'opacity 0.8s ease', display: 'block' }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,10,48,0.28) 0%, rgba(26,10,48,0.15) 40%, rgba(26,10,48,0.85) 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={mssnLogo} alt="MSSN logo" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 6, filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.35))' }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FDF8F0', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.04em', lineHeight: 1.2 }}>MSSN UNILORIN</div>
            <div style={{ fontSize: 9, color: '#D4A24C', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.08em' }}>GRAND LUNCHEON 2026</div>
          </div>
        </div>
        {pkg && (
          <div style={{ background: 'rgba(212,162,76,0.22)', border: '1px solid rgba(212,162,76,0.45)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: '#E8C784', fontFamily: 'Manrope, sans-serif' }}>
            {pkg}
          </div>
        )}
      </div>
      <div style={{ position: 'absolute', bottom: 188, right: 20, zIndex: 10 }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-label={`Step ${step} of ${total}`}>
          <circle cx="26" cy="26" r="21" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="rgba(0,0,0,0.3)" />
          <circle cx="26" cy="26" r="21" stroke="#D4A24C" strokeWidth="3" fill="none"
            strokeDasharray={`${2 * Math.PI * 21}`}
            strokeDashoffset={`${2 * Math.PI * 21 * (1 - step / total)}`}
            strokeLinecap="round" transform="rotate(-90 26 26)" style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          <text x="26" y="26" dominantBaseline="central" textAnchor="middle" fill="#FDF8F0" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">{step}/{total}</text>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 28px', zIndex: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#D4A24C', letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'Manrope, sans-serif' }}>REGISTRATION NOW OPEN</div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 700, color: '#FDF8F0', lineHeight: 1.28, marginBottom: 6 }}>The First Grand Luncheon</div>
        <div style={{ fontSize: 12, color: 'rgba(253,248,240,0.6)', marginBottom: 18, fontFamily: 'Manrope, sans-serif', lineHeight: 1.5 }}>{img.caption}</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {CAROUSEL_IMAGES.map((_, i) => (
            <button key={i} onClick={() => { setIdx(i); resetTimer(); }} aria-label={`Image ${i + 1}`}
              style={{ width: i === idx ? 22 : 7, height: 7, borderRadius: 4, background: i === idx ? '#D4A24C' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', transition: 'all 0.35s', padding: 0, flexShrink: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step 1: Package ──
function Step1({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <div style={sectionTitle}>Choose Your Package</div>
      <div style={sectionSub}>Select the experience that suits you best</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PACKAGES.map((p) => {
          const sel = data.package === p.name;
          return (
            <button key={p.name}
              onClick={() => setData({ package: p.name, amount: PKG_AMOUNTS[p.name] ?? '0' })}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 12, border: `1.5px solid ${sel ? '#3D1550' : 'rgba(61,21,80,0.12)'}`, background: sel ? 'rgba(61,21,80,0.05)' : '#ffffff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', boxShadow: sel ? '0 0 0 3px rgba(61,21,80,0.08)' : 'none', minHeight: 64 }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${sel ? '#3D1550' : 'rgba(61,21,80,0.2)'}`, background: sel ? '#3D1550' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                {sel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4A24C' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 15, color: '#1A1A2E' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, fontFamily: 'Manrope, sans-serif' }}>{p.desc}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: sel ? '#3D1550' : '#1A1A2E' }}>{p.price}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#D4A24C', background: 'rgba(212,162,76,0.1)', borderRadius: 6, padding: '2px 7px', fontFamily: 'Manrope, sans-serif' }}>{p.badge}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2: Meal ──
function Step2({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <div style={sectionTitle}>Select Your Meal</div>
      <div style={sectionSub}>Your meal preference for the luncheon</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {MEALS.map((m) => {
          const sel = data.meal === m;
          return (
            <button key={m} onClick={() => setData({ meal: m })}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, border: `1.5px solid ${sel ? '#3D1550' : 'rgba(61,21,80,0.12)'}`, background: sel ? 'rgba(61,21,80,0.05)' : '#ffffff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', minHeight: 52, width: '100%' }}
            >
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${sel ? '#3D1550' : 'rgba(61,21,80,0.2)'}`, background: sel ? '#3D1550' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {sel && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4A24C' }} />}
              </div>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: sel ? 600 : 400, color: '#1A1A2E' }}>{m}</span>
            </button>
          );
        })}
      </div>
      <FieldSet label="Dietary Notes (optional)">
        <textarea value={data.mealNote} onChange={(e) => setData({ mealNote: e.target.value })}
          placeholder="Allergies, preferences, or special requests..."
          style={{ ...inputStyle, resize: 'none', height: 88, paddingTop: 10, lineHeight: 1.55 }}
        />
      </FieldSet>
    </div>
  );
}

// ── Step 3: Personal Info ──
function Step3({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  const inp = (key: keyof FormData, ph: string, type = 'text') => (
    <input type={type} value={data[key] as string} onChange={(e) => setData({ [key]: e.target.value } as Partial<FormData>)} placeholder={ph} style={inputStyle}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
    />
  );
  const selField = (key: keyof FormData, opts: string[]) => (
    <select value={data[key] as string} onChange={(e) => setData({ [key]: e.target.value } as Partial<FormData>)}
      style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36 }}
      onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
    >
      <option value="">Select…</option>
      {opts.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  const isHaflah = data.level === 'Haflah Graduate';
  const needsMatric = STUDENT_LEVELS.includes(data.level);

  return (
    <div>
      <div style={sectionTitle}>Personal Information</div>
      <div style={sectionSub}>Tell us a bit about yourself</div>
      <div className="reg-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
        <FieldSet label="First Name">{inp('firstName', 'Fatimah')}</FieldSet>
        <FieldSet label="Last Name">{inp('lastName', 'Abdullahi')}</FieldSet>
      </div>
      <FieldSet label="Email Address" helper="Optional — required if you want your ticket emailed to you">
        {inp('email', 'you@example.com', 'email')}
      </FieldSet>
      <FieldSet label="WhatsApp Number">{inp('whatsapp', '08012345678', 'tel')}</FieldSet>
      <div className="reg-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
        <FieldSet label="Gender">{selField('gender', ['Male', 'Female'])}</FieldSet>
        <FieldSet label="Level / Status">{selField('level', LEVEL_OPTS)}</FieldSet>
      </div>
      {/* Matric Number — conditional */}
      {data.level && (
        <FieldSet label={`Matric Number${needsMatric ? '' : ' (optional)'}`}>
          <input
            type="text"
            value={isHaflah ? 'N/A' : data.matricNumber}
            onChange={(e) => !isHaflah && setData({ matricNumber: e.target.value })}
            placeholder={isHaflah ? '' : 'e.g. 18/52HA010'}
            disabled={isHaflah}
            style={{ ...inputStyle, background: isHaflah ? '#F3F4F6' : '#ffffff', color: isHaflah ? '#9CA3AF' : '#1A1A2E', cursor: isHaflah ? 'not-allowed' : 'text' }}
            onFocus={(e) => !isHaflah && (e.currentTarget.style.borderColor = '#3D1550')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
          />
          {isHaflah && <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5, fontFamily: 'Manrope, sans-serif' }}>Not applicable for Haflah Graduates</div>}
        </FieldSet>
      )}
      <FieldSet label="Department">{inp('department', 'Computer Science')}</FieldSet>
      <FieldSet label="Faculty">{inp('faculty', 'Communication & Information Sciences')}</FieldSet>
    </div>
  );
}

// ── Step 4: Ikram Customisation ──
function Step4({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <div style={sectionTitle}>VIP Personalisation</div>
      <div style={sectionSub}>Customise your Ikram package souvenir</div>
      <div style={{ background: 'rgba(212,162,76,0.08)', border: '1px solid rgba(212,162,76,0.25)', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
        <span style={{ fontSize: 12.5, color: '#8B6914', fontFamily: 'Manrope, sans-serif', lineHeight: 1.55 }}>
          Opt-in for a personalised souvenir engraved with your custom details.
        </span>
      </div>

      <FieldSet label="Would you like to customise your VIP souvenir?">
        <div style={{ display: 'flex', gap: 10 }}>
          <ToggleBtn label="Yes, customise it" active={data.ikramWantsCustom === 'Yes'} onClick={() => setData({ ikramWantsCustom: 'Yes' })} />
          <ToggleBtn label="No, use default" active={data.ikramWantsCustom === 'No'} onClick={() => setData({ ikramWantsCustom: 'No', ikramCustomization: '' })} />
        </div>
      </FieldSet>

      {data.ikramWantsCustom === 'Yes' && (
        <FieldSet label="Customisation Details" helper="Include preferred name, colour, and any special requests">
          <textarea
            value={data.ikramCustomization}
            onChange={(e) => setData({ ikramCustomization: e.target.value })}
            placeholder="e.g. Name: Fatimah A., Colour: Gold, Notes: Please add a star motif"
            style={{ ...inputStyle, resize: 'none', height: 110, paddingTop: 10, lineHeight: 1.6 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
          />
        </FieldSet>
      )}
    </div>
  );
}

// ── Step 5: Alumni ──
function Step5({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <div style={sectionTitle}>MSSN Alumni Association</div>
      <div style={sectionSub}>We are officially launching the alumni network at this event</div>
      <FieldSet label="Interested in joining MSSN Alumni Group 1.0?">
        <div style={{ display: 'flex', gap: 10 }}>
          <ToggleBtn label="Yes, add me" active={data.joinAlumni === 'Yes, add me'} onClick={() => setData({ joinAlumni: 'Yes, add me' })} />
          <ToggleBtn label="No, skip" active={data.joinAlumni === 'No, skip'} onClick={() => setData({ joinAlumni: 'No, skip' })} />
        </div>
      </FieldSet>
      {data.joinAlumni === 'Yes, add me' && (
        <>
          <FieldSet label="Full Name for Alumni Register">
            <input type="text" value={data.alumniName} onChange={(e) => setData({ alumniName: e.target.value })} placeholder="Your full name" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
            />
          </FieldSet>
          <div className="reg-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
            <FieldSet label="Graduation Year">
              <input type="text" value={data.alumniYear} onChange={(e) => setData({ alumniYear: e.target.value })} placeholder="e.g. 2024" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
              />
            </FieldSet>
            <FieldSet label="Occupation">
              <input type="text" value={data.occupation} onChange={(e) => setData({ occupation: e.target.value })} placeholder="e.g. Engineer, Student" style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
              />
            </FieldSet>
          </div>
        </>
      )}
    </div>
  );
}

// ── Step 6: Bus Donation ──
function Step6({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <div style={sectionTitle}>MSSN Bus Donation Drive</div>
      <div style={sectionSub}>Help us acquire a dedicated bus for student welfare</div>
      <div style={{ background: 'rgba(61,21,80,0.04)', border: '1px solid rgba(61,21,80,0.1)', borderRadius: 12, padding: '14px 16px', marginBottom: 22 }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: 14, color: '#3D1550', marginBottom: 4 }}>Why we need a bus</div>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#5a4060', lineHeight: 1.65, margin: 0 }}>
          A dedicated MSSN bus will ease transportation for programs, dawah activities, and inter-campus events.
        </p>
      </div>
      <FieldSet label="Would you like to pledge?">
        <div style={{ display: 'flex', gap: 10 }}>
          <ToggleBtn label="Yes, I'll pledge" active={data.busDonate === "Yes, I'll pledge"} onClick={() => setData({ busDonate: "Yes, I'll pledge" })} />
          <ToggleBtn label="No, skip" active={data.busDonate === 'No, skip'} onClick={() => setData({ busDonate: 'No, skip' })} />
        </div>
      </FieldSet>
      {data.busDonate === "Yes, I'll pledge" && (
        <FieldSet label="Pledge Amount (₦)">
          <input type="number" value={data.busAmount} onChange={(e) => setData({ busAmount: e.target.value })} placeholder="e.g. 5000" style={inputStyle} min="0"
            onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
          />
        </FieldSet>
      )}
    </div>
  );
}

// ── Step 7: Payment ──
function Step7({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  const isPaid = data.package !== 'Barakah';
  return (
    <div>
      <div style={sectionTitle}>Payment Details</div>
      <div style={sectionSub}>{isPaid ? 'Upload your payment receipt' : 'No payment needed for Barakah'}</div>
      {isPaid ? (
        <>
          <div style={{ background: '#F0F4FF', border: '1px solid rgba(61,21,80,0.12)', borderRadius: 12, padding: '16px 18px', marginBottom: 20 }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, color: '#3D1550', marginBottom: 8 }}>Transfer to:</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#1A1A2E', lineHeight: 1.9 }}>
              <div><span style={{ color: '#9CA3AF' }}>Bank: </span><strong>GTBank</strong></div>
              <div><span style={{ color: '#9CA3AF' }}>Account No: </span><strong style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}>0588812694</strong></div>
              <div><span style={{ color: '#9CA3AF' }}>Name: </span><strong>Zakariyah Habeeb-llahi Mukadam</strong></div>
            </div>
          </div>
          <FieldSet label="Payer Name (as on receipt)">
            <input type="text" value={data.payerName} onChange={(e) => setData({ payerName: e.target.value })} placeholder="Name used during transfer" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#3D1550')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(61,21,80,0.15)')}
            />
          </FieldSet>
          <FieldSet label="Upload Payment Receipt">
            <label style={{ display: 'block', border: '1.5px dashed rgba(61,21,80,0.2)', borderRadius: 10, padding: '20px', textAlign: 'center', cursor: 'pointer', background: data.receiptFile ? 'rgba(61,21,80,0.04)' : '#FAFAFA', transition: 'background 0.2s' }}>
              <input type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={(e) => setData({ receiptFile: e.target.files?.[0] ?? null })} />
              {data.receiptFile ? (
                <div>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>✓</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#3D1550', fontWeight: 600 }}>{data.receiptFile.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>Click to replace</div>
                </div>
              ) : (
                <div>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(61,21,80,0.3)" strokeWidth="1.5" style={{ marginBottom: 8, display: 'block', marginInline: 'auto' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#6B7280' }}>JPG, PNG or PDF — click to browse</div>
                </div>
              )}
            </label>
          </FieldSet>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎟️</div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 600, color: '#3D1550', marginBottom: 6 }}>No Payment Required</div>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#9CA3AF', maxWidth: 300, marginInline: 'auto', lineHeight: 1.6 }}>The Barakah package grants free entry. Just confirm below.</p>
        </div>
      )}
    </div>
  );
}

// ── Step 8: Review ──
function Step8({ data, setData }: { data: FormData; setData: (d: Partial<FormData>) => void }) {
  const row = (label: string, val: string) => val ? (
    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(61,21,80,0.07)', gap: 12 }}>
      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#9CA3AF', flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 500, color: '#1A1A2E', textAlign: 'right', wordBreak: 'break-word' }}>{val}</span>
    </div>
  ) : null;
  const pkgDisplay = PACKAGES.find((p) => p.name === data.package);
  return (
    <div>
      <div style={sectionTitle}>Review & Confirm</div>
      <div style={sectionSub}>Verify your details before submitting</div>
      <div style={{ background: '#FAFAFA', borderRadius: 12, padding: '16px 18px', marginBottom: 20, border: '1px solid rgba(61,21,80,0.08)' }}>
        {row('Package', data.package)}
        {row('Amount', pkgDisplay?.price ?? '—')}
        {row('Meal', data.meal)}
        {row('Name', `${data.firstName} ${data.lastName}`.trim())}
        {row('Email', data.email)}
        {row('WhatsApp', data.whatsapp)}
        {row('Gender', data.gender)}
        {row('Level', data.level)}
        {row('Matric No.', data.matricNumber)}
        {row('Department', data.department)}
        {row('Faculty', data.faculty)}
        {data.package === 'Ikram' ? row('Customisation', data.ikramWantsCustom === 'Yes' ? data.ikramCustomization : 'Default (no custom)') : null}
        {row('Alumni Group', data.joinAlumni)}
        {data.joinAlumni === 'Yes, add me' ? row('Occupation', data.occupation) : null}
        {data.joinAlumni === 'Yes, add me' ? row('Graduation Year', data.alumniYear) : null}
        {row('Bus Pledge', data.busDonate === "Yes, I'll pledge" ? `₦${data.busAmount}` : data.busDonate)}
        {data.package !== 'Barakah' ? row('Payer Name', data.payerName) : null}
        {data.receiptFile ? row('Receipt', data.receiptFile.name) : null}
      </div>
      <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
        <input type="checkbox" checked={data.confirmed} onChange={(e) => setData({ confirmed: e.target.checked })}
          style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, accentColor: '#3D1550', cursor: 'pointer' }}
        />
        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
          I confirm these details are accurate. I understand that <strong>no changes can be made after submission</strong> and allocation depends on payment verification.
        </span>
      </label>
    </div>
  );
}

// ── Main page ──
export default function RegistrationPage({ navigate }: { navigate: NavigateFn }) {
  const [data, setDataRaw] = useState<FormData>(INIT);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const setData = (patch: Partial<FormData>) => setDataRaw((prev) => ({ ...prev, ...patch }));

  const activeSections = data.package === 'Ikram'
    ? [0, 1, 2, 3, 4, 5, 6, 7]
    : [0, 1, 2, 4, 5, 6, 7];

  const currentIdx = activeSections.indexOf(step);
  const totalSteps = activeSections.length;

  const canGoNext = () => {
    if (step === 0) return !!data.package;
    if (step === 1) return !!data.meal;
    if (step === 2) return !!(data.firstName && data.lastName && data.whatsapp && data.gender && data.level);
    if (step === 7) return data.confirmed;
    return true;
  };

  const goNext = () => {
    if (currentIdx < activeSections.length - 1) {
      setStep(activeSections[currentIdx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (currentIdx > 0) {
      setStep(activeSections[currentIdx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('landing');
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      let receiptBase64 = '';
      let receiptFileName = '';
      let receiptMimeType = '';
      if (data.receiptFile) {
        const buf = await data.receiptFile.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = '';
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        receiptBase64 = btoa(binary);
        receiptFileName = data.receiptFile.name;
        receiptMimeType = data.receiptFile.type || 'application/octet-stream';
      }

      // Exact key names expected by the Google Apps Script backend
      const payload = {
        fullName: `${data.firstName} ${data.lastName}`.trim(),
        phone: data.whatsapp,
        email: data.email,
        gender: data.gender,
        department: data.department,
        level: data.level,
        matricNumber: data.level === 'Haflah Graduate' ? 'N/A' : data.matricNumber,
        package: data.package,
        amount: data.amount || PKG_AMOUNTS[data.package] || '0',
        meal: data.meal,
        ikramCustomization: data.package === 'Ikram'
          ? (data.ikramWantsCustom === 'Yes' ? data.ikramCustomization : 'Default — no customisation')
          : '',
        paymentName: data.payerName,
        receiptBase64,
        receiptFileName,
        receiptMimeType,
        alumniInterest: data.joinAlumni,
        graduationYear: data.alumniYear,
        occupation: data.occupation,
        busPledge: data.busDonate,
        pledgeAmount: data.busAmount,
      };

      // Debug: verify every field before sending
      console.log('[MSSN] Submitting payload:', payload);

      const res = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      const json = await res.json() as { success: boolean; referenceId?: string; error?: string };

      if (!json.success) throw new Error(json.error || 'Server returned an error');

      navigate('confirmation', {
        referenceId: json.referenceId ?? `GL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        fullName: payload.fullName,
        email: data.email,
        package: data.package,
        meal: data.meal,
        amount: payload.amount,
      });
    } catch (_err) {
      console.error('[MSSN] Submission error:', _err);
      setSubmitError('Something went wrong. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const isLast = currentIdx === activeSections.length - 1;
  const stepLabel = STEPS[step];

  const renderStep = () => {
    switch (step) {
      case 0: return <Step1 data={data} setData={setData} />;
      case 1: return <Step2 data={data} setData={setData} />;
      case 2: return <Step3 data={data} setData={setData} />;
      case 3: return <Step4 data={data} setData={setData} />;
      case 4: return <Step5 data={data} setData={setData} />;
      case 5: return <Step6 data={data} setData={setData} />;
      case 6: return <Step7 data={data} setData={setData} />;
      case 7: return <Step8 data={data} setData={setData} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7FF', fontFamily: 'Manrope, sans-serif', overflowX: 'hidden' }}>
      <Navbar navigate={navigate} />

      <style>{`
        @media (min-width: 768px) {
          .reg-left { display: block !important; }
          .reg-right { max-width: 58% !important; }
        }
        @media (max-width: 600px) {
          .reg-form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ display: 'flex', gap: 24, maxWidth: 1240, margin: '0 auto', padding: '92px 16px 48px', alignItems: 'flex-start', minHeight: 'calc(100vh - 60px)', boxSizing: 'border-box' }}>

        {/* LEFT: sticky panel */}
        <div className="reg-left" style={{ display: 'none', width: '42%', flexShrink: 0, borderRadius: 20, overflow: 'hidden', position: 'sticky', top: 84, height: 'calc(100vh - 108px)' }}>
          <LeftPanel pkg={data.package} step={currentIdx + 1} total={totalSteps} />
        </div>

        {/* RIGHT: form */}
        <div className="reg-right" ref={formRef} style={{ flex: 1, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <button onClick={() => navigate('landing')} style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: 13, cursor: 'pointer', padding: 0, fontFamily: 'Manrope, sans-serif', transition: 'color 0.15s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#3D1550')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#9CA3AF')}
            >Home</button>
            <span style={{ color: '#D1D5DB', fontSize: 13 }}>›</span>
            <span style={{ color: '#3D1550', fontSize: 13, fontWeight: 500, fontFamily: 'Manrope, sans-serif' }}>Registration</span>
          </div>

          {/* Progress stepper */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28, overflowX: 'auto', paddingBottom: 4 }}>
            {activeSections.map((s, i) => {
              const done = i < currentIdx;
              const active = i === currentIdx;
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < activeSections.length - 1 ? 1 : 0, minWidth: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#D4A24C' : active ? '#3D1550' : 'rgba(61,21,80,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s' }}>
                    {done
                      ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2,6 L5,9 L10,3" stroke="#3D1550" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      : <span style={{ fontSize: 10, fontWeight: 700, color: active ? '#FDF8F0' : 'rgba(61,21,80,0.35)', fontFamily: 'Outfit, sans-serif' }}>{i + 1}</span>
                    }
                  </div>
                  {i < activeSections.length - 1 && (
                    <div style={{ flex: 1, height: 2, borderRadius: 2, background: done ? '#D4A24C' : 'rgba(61,21,80,0.1)', margin: '0 6px', transition: 'background 0.4s' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#D4A24C', letterSpacing: '0.1em', fontFamily: 'Manrope, sans-serif' }}>STEP {currentIdx + 1} OF {totalSteps}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>{stepLabel}</div>
          </div>

          {/* Form card */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: '28px 20px 24px', boxShadow: '0 2px 12px rgba(61,21,80,0.07)', border: '1px solid rgba(61,21,80,0.06)', marginBottom: 16 }}>
            {renderStep()}
          </div>

          {/* Error */}
          {submitError && (
            <div style={{ background: 'rgba(166,61,64,0.08)', border: '1.5px solid rgba(166,61,64,0.25)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="7" stroke="#A63D40" strokeWidth="1.5" /><path d="M8,5 L8,8.5" stroke="#A63D40" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="11" r="0.75" fill="#A63D40" /></svg>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: '#A63D40', lineHeight: 1.5 }}>{submitError}</span>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={goBack}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: '1.5px solid rgba(61,21,80,0.15)', background: 'transparent', color: '#3D1550', fontWeight: 500, fontSize: 14, cursor: 'pointer', minHeight: 46, fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s' }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(61,21,80,0.05)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9,2 L4,7 L9,12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back
            </button>
            <div style={{ flex: 1 }} />
            {!isLast ? (
              <button onClick={goNext} disabled={!canGoNext()}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 10, border: 'none', background: canGoNext() ? '#3D1550' : '#D1D5DB', color: canGoNext() ? '#FDF8F0' : '#9CA3AF', fontWeight: 600, fontSize: 14, cursor: canGoNext() ? 'pointer' : 'not-allowed', minHeight: 46, fontFamily: 'Manrope, sans-serif', transition: 'background 0.15s' }}
                onMouseOver={(e) => { if (canGoNext()) e.currentTarget.style.background = '#5B2C74'; }}
                onMouseOut={(e) => { if (canGoNext()) e.currentTarget.style.background = '#3D1550'; }}
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5,2 L10,7 L5,12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!data.confirmed || submitting}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 10, border: 'none', background: data.confirmed && !submitting ? '#D4A24C' : '#D1D5DB', color: data.confirmed && !submitting ? '#3D1550' : '#9CA3AF', fontWeight: 700, fontSize: 14, cursor: data.confirmed && !submitting ? 'pointer' : 'not-allowed', minHeight: 46, fontFamily: 'Manrope, sans-serif' }}
              >
                {submitting ? (
                  <><svg width="14" height="14" viewBox="0 0 14 14" style={{ animation: 'spin 0.8s linear infinite' }} aria-hidden="true"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="28" strokeDashoffset="10" fill="none" /></svg>Submitting…</>
                ) : (
                  <>Submit Registration <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5,2 L10,7 L5,12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
