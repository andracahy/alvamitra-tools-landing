/* ALVAMITRA — mini-demo previews (live, interactive teasers for each tool) */
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { IconCheck } from '../icons';

/* shared bits ---------------------------------------------------------- */
const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="demo-row" style={{ marginBottom: 12 }}>
    <span className="demo-label">{label}</span>
    {children}
  </div>
);

interface SegOpt<T> { v: T; l: string; }
function Seg<T extends string | number>({ opts, val, set, label }: { opts: SegOpt<T>[]; val: T; set: (v: T) => void; label?: string }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {opts.map((o) => (
        <button key={String(o.v)} className={val === o.v ? 'on' : ''} aria-pressed={val === o.v} onClick={() => set(o.v)}>{o.l}</button>
      ))}
    </div>
  );
}

const Stepper = ({ val, set, min = 1, max = 99, label }: { val: number; set: (v: number) => void; min?: number; max?: number; label?: string }) => (
  <div className="stepper" role="group" aria-label={label}>
    <button aria-label={`Kurangi${label ? ' ' + label : ''}`} onClick={() => set(Math.max(min, val - 1))}>−</button>
    <span className="n" aria-live="polite">{val}</span>
    <button aria-label={`Tambah${label ? ' ' + label : ''}`} onClick={() => set(Math.min(max, val + 1))}>+</button>
  </div>
);

const Bar = ({ pct, color }: { pct: number; color?: string }) => (
  <div className="bar-track" style={{ marginTop: 12 }}>
    <div className="bar-fill" style={{ width: Math.max(3, Math.min(100, pct)) + '%', background: color || undefined }} />
  </div>
);

const Result = ({ children, sub }: { children: ReactNode; sub?: string }) => (
  <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 8 }}>
    <span className="demo-out" style={{ fontSize: 30 }}>{children}</span>
    {sub && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{sub}</span>}
  </div>
);

/* 1 — CCTV Calculator (DORI) ------------------------------------------ */
const DORI = [
  { k: 'Deteksi', min: 25 }, { k: 'Observasi', min: 62.5 },
  { k: 'Kenali', min: 125 }, { k: 'Identifikasi', min: 250 },
];
export const CctvCalcDemo = () => {
  const [focal, setFocal] = useState(3.6);
  const [mp, setMp] = useState(2);
  const [d, setD] = useState(9);
  const sensorW = 4.8; // mm (lebar sensor 1/3")
  const horizRes = ({ 2: 1920, 4: 2560, 8: 3840 } as Record<number, number>)[mp];
  const density = (horizRes * focal) / (sensorW * d); // px/m
  const reached = DORI.filter((l) => density >= l.min);
  const top = reached.length ? reached[reached.length - 1].k : 'Di bawah deteksi';
  return (
    <div className="demo">
        <Field label="Focal length">
          <Seg label="Focal length" val={focal} set={setFocal} opts={[{ v: 2.8, l: '2.8' }, { v: 3.6, l: '3.6' }, { v: 6, l: '6' }, { v: 12, l: '12mm' }]} />
        </Field>
        <Field label="Resolusi">
          <Seg label="Resolusi" val={mp} set={setMp} opts={[{ v: 2, l: '2MP' }, { v: 4, l: '4MP' }, { v: 8, l: '8MP' }]} />
        </Field>
        <Field label="Jarak ke objek"><span className="demo-val">{d} m</span></Field>
        <input type="range" aria-label="Jarak ke objek (meter)" min="1" max="20" step="1" value={d} onChange={(e) => setD(+e.target.value)} />
      <div className="demo-row" style={{ marginTop: 14, alignItems: 'baseline' }}>
        <span className="demo-out" style={{ fontSize: 28 }}>{density.toFixed(0)} <span style={{ fontSize: 14, fontWeight: 700 }}>px/m</span></span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>{top}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginTop: 12 }}>
        {DORI.map((l) => {
          const ok = density >= l.min;
          return (
            <div key={l.k} className={'dori-cell' + (ok ? ' ok' : '')}>
              <div className="dl">{l.k}</div>
              <div className="dm">{l.min}</div>
              <span className="dc">{ok ? <IconCheck size={13} /> : '—'}</span>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 9 }}>Standar DORI · px/m = kepadatan pixel pada objek</div>
    </div>
  );
};

/* 2 — Viewing Angle ---------------------------------------------------- */
export const ViewingAngleDemo = () => {
  const [f, setF] = useState(4);
  const sensorW = 4.8; // 1/3" approx
  const aov = 2 * Math.atan(sensorW / (2 * f)) * 180 / Math.PI;
  const widthAt10 = 2 * 10 * Math.tan((aov / 2) * Math.PI / 180);
  // Jarak DIKUNCI (radius tetap = jarak acuan 10 m); hanya sudut/lebar yang
  // berubah. Panjang kipas tidak boleh berubah ikut sudut — itu menyesatkan
  // (terbaca seolah jangkauan mengecil). Sudut lebar = liputan lebih lebar.
  const cx = 24, cy = 95, R = 120, half = (aov / 2) * Math.PI / 180;
  const tx = cx + R * Math.cos(half), ty = cy - R * Math.sin(half);
  const bx = cx + R * Math.cos(half), by = cy + R * Math.sin(half);
  return (
    <div className="demo">
      <Field label="Focal length"><span className="demo-val">{f.toFixed(1)} mm</span></Field>
      <input type="range" aria-label="Focal length (mm)" min="2.8" max="12" step="0.2" value={f} onChange={(e) => setF(+e.target.value)} />
      <svg viewBox="0 0 220 190" style={{ width: '100%', height: 'auto', marginTop: 12 }}>
        <path d={`M${cx} ${cy} L${tx} ${ty} A${R} ${R} 0 0 1 ${bx} ${by} Z`} fill="color-mix(in srgb, var(--blue) 16%, transparent)" stroke="var(--blue)" strokeOpacity="0.4" strokeWidth="1" />
        <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="var(--blue)" strokeWidth="1.4" />
        <line x1={cx} y1={cy} x2={bx} y2={by} stroke="var(--blue)" strokeWidth="1.4" />
        {/* garis tengah = jarak acuan tetap 10 m */}
        <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke="var(--blue)" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.55" />
        <text x={cx + R / 2} y={cy - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--muted)" fontFamily="ui-monospace, monospace">10 m</text>
        <circle cx={cx} cy={cy} r="6" fill="var(--blue)" />
      </svg>
      <div className="demo-row" style={{ marginTop: 6 }}>
        <span><span className="demo-out" style={{ fontSize: 24 }}>{aov.toFixed(0)}°</span> <span style={{ fontSize: 12, color: 'var(--muted)' }}>angle of view</span></span>
        <span style={{ fontSize: 12.5, color: 'var(--body)' }}>≈ {widthAt10.toFixed(1)} m lebar @ 10 m</span>
      </div>
    </div>
  );
};

/* 3 — Bandwidth Calculator -------------------------------------------- */
export const BandwidthDemo = () => {
  const [cams, setCams] = useState(8);
  const [res, setRes] = useState(4);
  const per = ({ 2: 4, 4: 8, 8: 16 } as Record<number, number>)[res];
  const total = cams * per;
  return (
    <div className="demo">
      <Field label="Jumlah kamera"><Stepper label="jumlah kamera" val={cams} set={setCams} min={1} max={32} /></Field>
      <Field label="Resolusi">
        <Seg label="Resolusi" val={res} set={setRes} opts={[{ v: 2, l: '2MP' }, { v: 4, l: '4MP' }, { v: 8, l: '8MP' }]} />
      </Field>
      <Result sub={`Mbps total · H.265 · ${per} Mbps/kamera`}>{total} <span style={{ fontSize: 16, fontWeight: 700 }}>Mbps</span></Result>
      <Bar pct={(total / 200) * 100} />
      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 7 }}>Relatif terhadap uplink 200 Mbps</div>
    </div>
  );
};

/* 4 — Storage Needs ---------------------------------------------------- */
export const StorageDemo = () => {
  const [days, setDays] = useState(30);
  const [cams, setCams] = useState(8);
  const gbPerCamDay = 86.4; // 8 Mbps H.265
  const tb = (cams * gbPerCamDay * days) / 1000;
  return (
    <div className="demo">
      <Field label="Jumlah kamera"><Stepper label="jumlah kamera" val={cams} set={setCams} min={1} max={32} /></Field>
      <Field label="Retensi"><span className="demo-val">{days} hari</span></Field>
      <input type="range" aria-label="Retensi (hari)" min="3" max="90" step="1" value={days} onChange={(e) => setDays(+e.target.value)} />
      <Result sub="storage dibutuhkan">{tb.toFixed(1)} <span style={{ fontSize: 16, fontWeight: 700 }}>TB</span></Result>
      <Bar pct={(tb / 24) * 100} />
      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 7 }}>Asumsi 8 Mbps/kamera, perekaman 24 jam</div>
    </div>
  );
};

/* 5 — Wireless Link Signal -------------------------------------------- */
export const WirelessDemo = () => {
  const [d, setD] = useState(1.2);
  const pct = Math.max(5, Math.min(100, 102 - d * 19));
  const dbm = Math.round(-38 - d * 8.5);
  const bars = pct > 75 ? 4 : pct > 50 ? 3 : pct > 28 ? 2 : 1;
  const label = pct > 75 ? 'Sangat baik' : pct > 50 ? 'Baik' : pct > 28 ? 'Cukup' : 'Lemah';
  const col = pct > 50 ? 'var(--ok)' : pct > 28 ? 'var(--warn)' : 'var(--warm)';
  return (
    <div className="demo">
      <Field label="Jarak link"><span className="demo-val">{d.toFixed(1)} km</span></Field>
      <input type="range" aria-label="Jarak link (km)" min="0.1" max="5" step="0.1" value={d} onChange={(e) => setD(+e.target.value)} />
      <div className="demo-row" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 38 }}>
          {[1, 2, 3, 4].map((b) => (
            <span key={b} style={{ width: 12, height: 9 + b * 8, borderRadius: 3, background: b <= bars ? col : 'var(--border-strong)', transition: 'background .3s' }} />
          ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="demo-out" style={{ fontSize: 24, color: col }}>{dbm} dBm</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: col }}>{label}</div>
        </div>
      </div>
    </div>
  );
};

/* 6 — PoE Budget Calculator ------------------------------------------- */
export const PoeDemo = () => {
  const [budget, setBudget] = useState(130);
  const [cams, setCams] = useState(12);
  const per = 6.5;
  const used = cams * per;
  const pct = (used / budget) * 100;
  const over = used > budget;
  const col = over ? 'var(--warm)' : pct > 80 ? 'var(--warn)' : 'var(--blue)';
  return (
    <div className="demo">
      <Field label="PoE budget switch">
        <Seg label="PoE budget switch" val={budget} set={setBudget} opts={[{ v: 65, l: '65W' }, { v: 130, l: '130W' }, { v: 250, l: '250W' }]} />
      </Field>
      <Field label="Jumlah kamera"><Stepper label="jumlah kamera" val={cams} set={setCams} min={1} max={48} /></Field>
      <div className="demo-row" style={{ marginTop: 14 }}>
        <span className="demo-out" style={{ fontSize: 24, color: col }}>{used.toFixed(0)} W</span>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>dari {budget} W ({per} W/kamera)</span>
      </div>
      <Bar pct={pct} color={over ? 'var(--warm)' : col} />
      <div style={{ fontSize: 12, fontWeight: 600, color: col, marginTop: 8 }}>
        {over ? '⚠ Melebihi budget — perlu switch lebih besar' : `Sisa ${(budget - used).toFixed(0)} W tersedia`}
      </div>
    </div>
  );
};

/* 7 — IPv4 / Subnet Planner ------------------------------------------- */
export const SubnetDemo = () => {
  const [cidr, setCidr] = useState(24);
  const hosts = Math.max(0, Math.pow(2, 32 - cidr) - 2);
  const maskParts: number[] = [];
  let bits = cidr;
  for (let i = 0; i < 4; i++) { const t = Math.min(8, Math.max(0, bits)); maskParts.push(256 - Math.pow(2, 8 - t)); bits -= 8; }
  const mask = maskParts.join('.');
  return (
    <div className="demo">
      <Field label="Subnet prefix"><span className="demo-val">/{cidr}</span></Field>
      <input type="range" aria-label="Subnet prefix (CIDR)" min="22" max="30" step="1" value={cidr} onChange={(e) => setCidr(+e.target.value)} />
      <Result sub="host yang dapat dipakai">{hosts.toLocaleString('id-ID')}</Result>
      <div className="demo-row" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <span className="demo-label">Subnet mask</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700, color: 'var(--ink)', fontSize: 14 }}>{mask}</span>
      </div>
      <div className="demo-row" style={{ marginTop: 8 }}>
        <span className="demo-label">Contoh network</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: 'var(--blue)', fontSize: 13.5 }}>192.168.0.0/{cidr}</span>
      </div>
    </div>
  );
};

/* 8 — Port Forwarding Test -------------------------------------------- */
// Demo NYATA: panggil API yang sama dengan tool lengkap. Server Vercel ada di
// luar jaringan lokal, jadi hasil benar-benar mencerminkan akses dari internet.
const PORT_API = 'https://port-forwarding-test-jyhx.vercel.app/api/check-port';
const IP_APIS = ['https://api.ipify.org?format=json', 'https://api64.ipify.org?format=json'];
const PORT_SVC: Record<number, string> = { 554: 'RTSP', 80: 'HTTP', 443: 'HTTPS', 37777: 'Dahua', 8000: 'Hikvision', 34567: 'XMEye' };
const inputStyle = { padding: '8px 10px', border: '1px solid var(--border-strong)', borderRadius: 8, fontFamily: 'ui-monospace, monospace', fontWeight: 700, fontSize: 13, color: 'var(--ink)' } as const;

export const PortTestDemo = () => {
  const [host, setHost] = useState('');
  const [ipState, setIpState] = useState<'loading' | 'ok' | 'failed'>('loading');
  const [port, setPort] = useState<string | number>(554);
  const [state, setState] = useState<'idle' | 'checking' | 'open' | 'closed' | 'error'>('idle');

  // Auto-deteksi IP publik (use case dominan: cek port forwarding IP sendiri).
  useEffect(() => {
    let alive = true;
    (async () => {
      for (const url of IP_APIS) {
        try {
          const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!r.ok) continue;
          const d = await r.json();
          if (d?.ip && alive) { setHost(d.ip); setIpState('ok'); return; }
        } catch { /* service ini gagal — coba berikutnya */ }
      }
      if (alive) setIpState('failed');
    })();
    return () => { alive = false; };
  }, []);

  const run = async () => {
    const p = +port;
    if (!host.trim() || !p) return;
    setState('checking');
    try {
      const r = await fetch(PORT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host: host.trim(), port: p, protocol: 'tcp' }),
        signal: AbortSignal.timeout(12000),
      });
      const d = await r.json();
      if (!r.ok) { setState('error'); return; }
      setState(d.isOpen ? 'open' : 'closed');
    } catch { setState('error'); }
  };

  const reset = () => setState('idle');
  return (
    <div className="demo">
      <div className="demo-row" style={{ alignItems: 'center' }}>
        <span className="demo-label">IP / domain</span>
        <input type="text" aria-label="IP atau domain target" value={host} onChange={(e) => { setHost(e.target.value); reset(); }}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          placeholder={ipState === 'loading' ? 'mendeteksi IP…' : '203.0.113.1'}
          style={{ ...inputStyle, width: 150 }} />
      </div>
      <div className="demo-row" style={{ alignItems: 'center', marginTop: 10 }}>
        <span className="demo-label">Port {PORT_SVC[+port] ? `· ${PORT_SVC[+port]}` : ''}</span>
        <input type="number" aria-label="Nomor port" value={port} onChange={(e) => { setPort(e.target.value); reset(); }}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          style={{ ...inputStyle, width: 92, textAlign: 'center' }} />
      </div>
      <button onClick={run} disabled={!host.trim() || !(+port) || state === 'checking'} className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', marginTop: 14, padding: '11px', opacity: (!host.trim() || !(+port)) ? 0.6 : 1 }}>
        {state === 'checking' ? 'Mengecek…' : 'Cek port'}
      </button>
      <div style={{ marginTop: 14, minHeight: 44, display: 'flex', alignItems: 'center', gap: 11 }}>
        {state === 'idle' && <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>Dicek dari server eksternal agar hasilnya akurat.</span>}
        {state === 'checking' && (
          <span style={{ display: 'inline-block', width: 18, height: 18, border: '3px solid var(--border-strong)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
        )}
        {(state === 'open' || state === 'closed') && (
          <>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: state === 'open' ? 'var(--ok)' : 'var(--warm)' }} />
            <span style={{ fontWeight: 700, color: state === 'open' ? 'var(--ok)' : 'var(--warm)', fontFamily: 'var(--font-head)' }}>
              Port {port} {state === 'open' ? 'TERBUKA' : 'TERTUTUP'}
            </span>
          </>
        )}
        {state === 'error' && <span style={{ fontSize: 12.5, color: 'var(--warm)', fontWeight: 600 }}>Gagal cek — coba lagi.</span>}
      </div>
    </div>
  );
};
