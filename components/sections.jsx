/* ALVAMITRA — page sections (nav, hero, value band, workflow, CTA, footer) */
const LOGO = 'assets/alvamitra-logo.png';
const TOOLS_URL = 'https://alvamitra.com/tools';

/* ---- HERO coverage scene (animated FOV) ---- */
const CoverageScene = () => (
  <div className="scene reveal">
    <div className="scene-head">
      <span className="t">Denah coverage · contoh</span>
      <span className="live"><i></i>Live preview</span>
    </div>
    <svg viewBox="0 0 440 300" role="img" aria-label="Ilustrasi cakupan kamera">
      {/* room */}
      <rect x="24" y="24" width="392" height="252" rx="10" fill="#fff" stroke="var(--border-strong)" strokeWidth="2" />
      <rect x="24" y="24" width="392" height="252" rx="10" fill="url(#grid)" />
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#eef2f8" strokeWidth="1" />
        </pattern>
      </defs>
      {/* furniture blocks */}
      <rect x="70" y="150" width="86" height="46" rx="6" fill="#eef2f8" />
      <rect x="250" y="80" width="64" height="64" rx="6" fill="#eef2f8" />
      <rect x="300" y="196" width="80" height="40" rx="6" fill="#eef2f8" />
      {/* FOV wedge 1 (top-left, facing down-right) */}
      <g>
        <path d="M52 52 L300 120 L210 250 Z" fill="rgba(37,99,235,.13)" stroke="rgba(37,99,235,.32)" strokeWidth="1.4" />
        <animateTransform attributeName="transform" type="rotate" values="-6 52 52;7 52 52;-6 52 52" dur="6.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
      </g>
      {/* FOV wedge 2 (top-right, facing down-left) */}
      <g>
        <path d="M388 52 L150 116 L250 252 Z" fill="rgba(37,99,235,.1)" stroke="rgba(37,99,235,.28)" strokeWidth="1.4" />
        <animateTransform attributeName="transform" type="rotate" values="5 388 52;-7 388 52;5 388 52" dur="7.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
      </g>
      {/* cameras */}
      {[[52, 52], [388, 52]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="13" fill="var(--blue)" />
          <circle cx={x} cy={y} r="13" fill="none" stroke="var(--blue)" strokeWidth="2" opacity="0.35">
            <animate attributeName="r" values="13;24;13" dur="3s" begin={i * 1.2 + 's'} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin={i * 1.2 + 's'} repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r="4.5" fill="#fff" />
        </g>
      ))}
    </svg>
  </div>
);

const Hero = () => (
  <header className="hero">
    <div className="wrap hero-in">
      <div>
        <div className="hero-brand reveal">
          <img src={LOGO} alt="ALVAMITRA" />
          <span className="hero-brand-div"></span>
          <span className="hero-brand-tag">Tools</span>
        </div>
        <span className="eyebrow reveal"><span className="dot"></span>8 tools gratis dari ALVAMITRA</span>
        <h1 className="reveal">Rancang sistem CCTV <span className="hl">tanpa tebak-tebakan.</span></h1>
        <p className="lede reveal">Hitung coverage, bandwidth, storage, PoE budget, sampai subnet — semua dalam hitungan detik. Tools gratis dari ALVAMITRA untuk bikin setiap proposal presisi sejak awal.</p>
        <div className="hero-cta reveal">
          <a className="btn btn-primary" href="#tools">Jelajahi tools <IconArrow className="arrow" /></a>
          <a className="btn btn-ghost" href="#alur">Lihat alur kerja</a>
        </div>
        <div className="hero-stats reveal">
          <div className="s"><b>8</b><span>kalkulator siap pakai</span></div>
          <div className="s"><b>Gratis</b><span>tanpa login</span></div>
          <div className="s"><b>Instan</b><span>hasil real-time</span></div>
        </div>
      </div>
      <div className="hero-visual"><CoverageScene /></div>
    </div>
  </header>
);

/* ---- VALUE BAND ---- */
const VALUES = [
  { ico: IconFree, t: 'Gratis & tanpa login', d: 'Buka, hitung, selesai. Tidak ada paywall atau pendaftaran.' },
  { ico: IconFlash, t: 'Hasil real-time', d: 'Geser slider, angka langsung berubah. Tanpa tunggu loading.' },
  { ico: IconDoc, t: 'Siap untuk quotation', d: 'Angka akurat yang bisa langsung dipakai di proposal klien.' },
  { ico: IconDevices, t: 'Jalan di mana saja', d: 'Mulus di HP saat survei lokasi maupun desktop di kantor.' },
];
const ValueBand = () => (
  <section className="wrap values" style={{ marginTop: 8 }}>
    <div className="values-grid">
      {VALUES.map((v, i) => (
        <div className="vcard reveal" key={i} style={{ transitionDelay: i * 70 + 'ms' }}>
          <div className="vico"><v.ico size={20} /></div>
          <h4>{v.t}</h4>
          <p>{v.d}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ---- WORKFLOW ---- */
const STEPS = [
  { n: '01', t: 'Perencanaan coverage', d: 'Tentukan jumlah kamera & sudut pandang sesuai luas area.', tools: ['CCTV Calculator', 'Viewing Angle'] },
  { n: '02', t: 'Network & storage', d: 'Hitung beban bandwidth dan kapasitas penyimpanan rekaman.', tools: ['Bandwidth', 'Storage Needs'] },
  { n: '03', t: 'Wireless & power', d: 'Pastikan link nirkabel kuat dan PoE budget mencukupi.', tools: ['Wireless Signal', 'PoE Budget'] },
  { n: '04', t: 'Setup & testing', d: 'Susun pengalamatan IP lalu uji akses port dari luar.', tools: ['Subnet Planner', 'Port Test'] },
];
const Workflow = () => (
  <section id="alur" className="flow">
    <div className="wrap section">
      <div className="sec-intro reveal">
        <div className="kicker">Alur kerja</div>
        <h2>Satu alur, dari survei sampai uji coba</h2>
        <p>Setiap tool memetakan satu tahap proyek CCTV. Pakai berurutan, dan tidak ada detail teknis yang terlewat.</p>
      </div>
      <div className="flow-grid">
        <div className="flow-line"></div>
        {STEPS.map((s, i) => (
          <div className="fstep reveal" key={i} style={{ transitionDelay: i * 90 + 'ms' }}>
            <div className="num">{s.n}</div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
            <div className="ftools">{s.tools.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---- FINAL CTA ---- */
const FinalCTA = () => (
  <section className="wrap section" style={{ paddingTop: 40 }}>
    <div className="cta-band reveal">
      <div className="cta-brand">ALVAMITRA · TOOLS</div>
      <h2>Siap merancang proyek berikutnya?</h2>
      <p>Buka semua tools ALVAMITRA dan ubah perkiraan jadi angka yang bisa dipertanggungjawabkan.</p>
      <a className="btn btn-white" href={TOOLS_URL}>Buka semua tools <IconArrow className="arrow" /></a>
    </div>
  </section>
);

/* ---- FOOTER ---- */
const Footer = () => (
  <footer className="wrap">
    <div className="foot-grid">
      <div className="foot-brand">
        <img src={LOGO} alt="ALVAMITRA" />
        <p>Toko & solusi CCTV terpercaya. Tools perencanaan gratis untuk teknisi, reseller, dan integrator di Indonesia.</p>
      </div>
      <div className="foot-col">
        <h5>Coverage</h5>
        <a href="https://alvamitra.com/tools/cctv-calculator">CCTV Calculator</a>
        <a href="https://alvamitra.com/tools/viewing-angle">Viewing Angle</a>
      </div>
      <div className="foot-col">
        <h5>Network</h5>
        <a href="https://alvamitra.com/tools/bandwidth">Bandwidth</a>
        <a href="https://alvamitra.com/tools/storage">Storage Needs</a>
        <a href="https://alvamitra.com/tools/subnet">Subnet Planner</a>
      </div>
      <div className="foot-col">
        <h5>Power & test</h5>
        <a href="https://alvamitra.com/tools/wireless-signal">Wireless Signal</a>
        <a href="https://alvamitra.com/tools/poe-budget">PoE Budget</a>
        <a href="https://alvamitra.com/tools/port-test">Port Test</a>
      </div>
    </div>
    <div className="foot-bottom">
      <span>© 2026 ALVAMITRA. Semua hak dilindungi.</span>
      <span>Dibuat untuk para teknisi CCTV Indonesia.</span>
    </div>
  </footer>
);

Object.assign(window, { Hero, ValueBand, Workflow, FinalCTA, Footer });
