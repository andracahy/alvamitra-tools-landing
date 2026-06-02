/* ALVAMITRA — mini-demo previews (live, interactive teasers for each tool) */
import { useState } from 'react';
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
function Seg<T extends string | number>({ opts, val, set }: { opts: SegOpt<T>[]; val: T; set: (v: T) => void }) {
  return (
    <div className="seg">
      {opts.map((o) => (
        <button key={String(o.v)} className={val === o.v ? 'on' : ''} onClick={() => set(o.v)}>{o.l}</button>
      ))}
    </div>
  );
}

const Stepper = ({ val, set, min = 1, max = 99 }: { val: number; set: (v: number) => void; min?: number; max?: number }) => (
  <div className="stepper">
    <button onClick={() => set(Math.max(min, val - 1))}>−</button>
    <span className="n">{val}</span>
    <button onClick={() => set(Math.min(max, val + 1))}>+</button>
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
  const sensorW = 4.8; // mm (1/2.7")
  const horizRes = ({ 2: 1920, 4: 2560, 8: 3840 } as Record<number, number>)[mp];
  const density = (horizRes * focal) / (sensorW * d); // px/m
  const reached = DORI.filter((l) => density >= l.min);
  const top = reached.length ? reached[reached.length - 1].k : 'Di bawah deteksi';
  return (
    <div className="demo">
      <Field label="Focal length">
        <Seg val={focal} set={setFocal} opts={[{ v: 2.8, l: '2.8' }, { v: 3.6, l: '3.6' }, { v: 6, l: '6' }, { v: 12, l: '12mm' }]} />
      </Field>
      <Field label="Resolusi">
        <Seg val={mp} set={setMp} opts={[{ v: 2, l: '2MP' }, { v: 4, l: '4MP' }, { v: 8, l: '8MP' }]} />
      </Field>
      <Field label="Jarak ke objek"><span className="demo-val">{d} m</span></Field>
      <input type="range" min="1" max="20" step="1" value={d} onChange={(e) => setD(+e.target.value)} />
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
  // fan geometry
  const cx = 20, cy = 48, L = 188, half = (aov / 2) * Math.PI / 180;
  const tx = cx + L * Math.cos(half), ty = cy - L * Math.sin(half);
  const bx = cx + L * Math.cos(half), by = cy + L * Math.sin(half);
  return (
    <div className="demo">
      <Field label="Focal length"><span className="demo-val">{f.toFixed(1)} mm</span></Field>
      <input type="range" min="2.8" max="12" step="0.2" value={f} onChange={(e) => setF(+e.target.value)} />
      <svg viewBox="0 0 230 96" style={{ width: '100%', height: 'auto', marginTop: 12 }}>
        <path d={`M${cx} ${cy} L${tx} ${ty} A${L} ${L} 0 0 1 ${bx} ${by} Z`} fill="color-mix(in srgb, var(--blue) 16%, transparent)" stroke="var(--blue)" strokeOpacity="0.4" strokeWidth="1" />
        <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="var(--blue)" strokeWidth="1.4" />
        <line x1={cx} y1={cy} x2={bx} y2={by} stroke="var(--blue)" strokeWidth="1.4" />
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
      <Field label="Jumlah kamera"><Stepper val={cams} set={setCams} min={1} max={32} /></Field>
      <Field label="Resolusi">
        <Seg val={res} set={setRes} opts={[{ v: 2, l: '2MP' }, { v: 4, l: '4MP' }, { v: 8, l: '8MP' }]} />
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
      <Field label="Jumlah kamera">
        <Seg val={cams} set={setCams} opts={[{ v: 4, l: '4' }, { v: 8, l: '8' }, { v: 16, l: '16' }]} />
      </Field>
      <Field label="Retensi"><span className="demo-val">{days} hari</span></Field>
      <input type="range" min="3" max="90" step="1" value={days} onChange={(e) => setDays(+e.target.value)} />
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
      <input type="range" min="0.1" max="5" step="0.1" value={d} onChange={(e) => setD(+e.target.value)} />
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
        <Seg val={budget} set={setBudget} opts={[{ v: 65, l: '65W' }, { v: 130, l: '130W' }, { v: 250, l: '250W' }]} />
      </Field>
      <Field label="Jumlah kamera"><Stepper val={cams} set={setCams} min={1} max={48} /></Field>
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
      <input type="range" min="22" max="30" step="1" value={cidr} onChange={(e) => setCidr(+e.target.value)} />
      <Result sub="host yang dapat dipakai">{hosts.toLocaleString('id-ID')}</Result>
      <div className="demo-row" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <span className="demo-label">Subnet mask</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700, color: 'var(--ink)', fontSize: 14 }}>{mask}</span>
      </div>
      <div className="demo-row" style={{ marginTop: 8 }}>
        <span className="demo-label">Contoh network</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: 'var(--blue)', fontSize: 13.5 }}>192.168.1.0/{cidr}</span>
      </div>
    </div>
  );
};

/* 8 — Port Forwarding Test -------------------------------------------- */
export const PortTestDemo = () => {
  const [port, setPort] = useState<string | number>(554);
  const [state, setState] = useState<'idle' | 'checking' | 'done'>('idle');
  const open = [80, 443, 554, 8000, 8200, 37777, 34567, 8899].includes(+port);
  const run = () => { setState('checking'); setTimeout(() => setState('done'), 1000); };
  const common: Record<number, string> = { 554: 'RTSP', 80: 'HTTP', 443: 'HTTPS', 37777: 'Dahua', 8000: 'Hikvision' };
  return (
    <div className="demo">
      <div className="demo-row" style={{ alignItems: 'center' }}>
        <span className="demo-label">Port number {common[+port] ? `· ${common[+port]}` : ''}</span>
        <input type="number" value={port} onChange={(e) => { setPort(e.target.value); setState('idle'); }}
          style={{ width: 92, padding: '8px 10px', border: '1px solid var(--border-strong)', borderRadius: 8, fontFamily: 'ui-monospace, monospace', fontWeight: 700, fontSize: 14, color: 'var(--ink)', textAlign: 'center' }} />
      </div>
      <button onClick={run} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 14, padding: '11px' }}>
        {state === 'checking' ? 'Mengecek…' : 'Cek port'}
      </button>
      <div style={{ marginTop: 14, minHeight: 44, display: 'flex', alignItems: 'center', gap: 11 }}>
        {state === 'idle' && <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>Tekan “Cek port” untuk simulasi hasil.</span>}
        {state === 'checking' && (
          <span style={{ display: 'inline-block', width: 18, height: 18, border: '3px solid var(--border-strong)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
        )}
        {state === 'done' && (
          <>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: open ? 'var(--ok)' : 'var(--warm)' }} />
            <span style={{ fontWeight: 700, color: open ? 'var(--ok)' : 'var(--warm)', fontFamily: 'var(--font-head)' }}>
              Port {port} {open ? 'TERBUKA' : 'TERTUTUP'}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
