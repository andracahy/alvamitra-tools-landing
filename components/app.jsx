/* ALVAMITRA — tools section + app assembly */
const { useEffect } = React;
const U = 'https://alvamitra.com/tools/';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2563eb",
  "density": "comfortable"
}/*EDITMODE-END*/;

const GROUPS = [
  {
    label: 'Coverage Planning',
    tools: [
      { ico: IconCamera, name: 'CCTV Calculator', sub: 'Kalkulator DORI', url: U + 'cctv-calculator',
        desc: 'Hitung kepadatan pixel (px/m) dari focal length, ukuran sensor, dan resolusi untuk tahu level DORI — Deteksi, Observasi, Kenali, Identifikasi — pada jarak tertentu.',
        when: 'menentukan lensa & posisi kamera agar wajah/plat terbaca jelas', Demo: CctvCalcDemo },
      { ico: IconEye, name: 'Viewing Angle', sub: 'Sudut pandang & lensa', url: U + 'viewing-angle',
        desc: 'Lihat hubungan focal length dengan angle of view serta lebar area yang tertangkap pada jarak tertentu.',
        when: 'memilih lensa fixed / varifocal untuk tiap titik', Demo: ViewingAngleDemo },
    ],
  },
  {
    label: 'Network & Storage',
    tools: [
      { ico: IconBolt, name: 'Bandwidth Calculator', sub: 'Beban jaringan', url: U + 'bandwidth',
        desc: 'Hitung total throughput dari seluruh kamera supaya switch dan uplink tidak kelebihan beban.',
        when: 'merancang topologi jaringan & memilih switch', Demo: BandwidthDemo },
      { ico: IconStorage, name: 'Storage Needs', sub: 'Kapasitas rekaman', url: U + 'storage',
        desc: 'Estimasi kapasitas HDD/NVR berdasarkan jumlah kamera, bitrate, dan lama retensi rekaman.',
        when: 'menentukan ukuran storage & durasi backup', Demo: StorageDemo },
    ],
  },
  {
    label: 'Wireless & Power',
    tools: [
      { ico: IconWifi, name: 'Wireless Link Signal', sub: 'Kualitas link nirkabel', url: U + 'wireless-signal',
        desc: 'Perkirakan kekuatan sinyal point-to-point berdasarkan jarak untuk link antar gedung.',
        when: 'memasang kamera di lokasi tanpa kabel', Demo: WirelessDemo },
      { ico: IconCpu, name: 'PoE Budget Calculator', sub: 'Anggaran daya switch', url: U + 'poe-budget',
        desc: 'Pastikan total konsumsi daya seluruh kamera tidak melebihi PoE budget dari switch yang dipilih.',
        when: 'memilih PoE switch & mencegah kamera mati mendadak', Demo: PoeDemo },
    ],
  },
  {
    label: 'Setup & Testing',
    tools: [
      { ico: IconGrid, name: 'IPv4 / Subnet Planner', sub: 'Pengalamatan IP', url: U + 'subnet',
        desc: 'Rencanakan subnet, jumlah host, dan subnet mask untuk jaringan kamera yang rapi dan terstruktur.',
        when: 'setup IP statis & segmentasi jaringan', Demo: SubnetDemo },
      { ico: IconSliders, name: 'Port Forwarding Test', sub: 'Akses jarak jauh', url: U + 'port-test',
        desc: 'Cek apakah port untuk akses remote (RTSP, HTTP, web NVR) sudah terbuka dari internet.',
        when: 'mengaktifkan akses CCTV dari luar jaringan', Demo: PortTestDemo },
    ],
  },
];

const ToolCard = ({ t, delay }) => {
  const Demo = t.Demo;
  return (
    <article className="tcard reveal" style={{ transitionDelay: delay + 'ms' }} data-screen-label={t.name}>
      <div className="tcard-top">
        <div className="tbadge"><t.ico size={23} /></div>
        <div className="meta">
          <h3>{t.name}</h3>
          <div className="id-sub">{t.sub}</div>
        </div>
        <span className="demo-pill"><i></i>Demo</span>
      </div>
      <p className="desc">{t.desc}</p>
      <div className="when"><b>Kapan dipakai:</b> {t.when}.</div>
      <Demo />
      <div className="tcard-foot">
        <a className="tcta" href={t.url}><span>Buka tool lengkap</span><IconArrow className="arrow" size={17} /></a>
      </div>
    </article>
  );
};

const ToolsSection = () => (
  <section id="tools" className="wrap section">
    <div className="sec-intro reveal">
      <div className="kicker">Tools</div>
      <h2>Coba langsung sebelum membuka tool penuh</h2>
      <p>Setiap kartu punya demo mini interaktif — geser dan klik untuk merasakan cara kerjanya. Siap menghitung serius? Buka tool versi lengkapnya.</p>
    </div>
    {GROUPS.map((g) => (
      <div className="group" key={g.label}>
        <div className="group-label reveal">{g.label}</div>
        <div className="group-grid">
          {g.tools.map((t, i) => <ToolCard key={t.name} t={t} delay={i * 80} />)}
        </div>
      </div>
    ))}
  </section>
);

/* scroll reveal — robust: reveal in-view items immediately, observe the rest,
   and fail-safe so nothing stays hidden if the observer never fires. */
const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const show = (e) => e.classList.add('in');
    const inView = (e) => { const r = e.getBoundingClientRect(); return r.top < window.innerHeight * 0.95 && r.bottom > 0; };
    // anything already on screen at load -> reveal now
    els.forEach((e) => { if (inView(e)) show(e); });
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => { if (!e.classList.contains('in')) io.observe(e); });
    // fail-safe: never leave content hidden
    const t = setTimeout(() => els.forEach(show), 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
};

const App = () => {
  useReveal();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--blue', t.accent);
    r.style.setProperty('--sec-pad', t.density === 'compact' ? '52px' : '80px');
  }, [t.accent, t.density]);
  return (
    <React.Fragment>
      <Hero />
      <ValueBand />
      <ToolsSection />
      <Workflow />
      <FinalCTA />
      <Footer />
      <TweaksPanel>
        <TweakSection label="Tampilan" />
        <TweakColor label="Warna aksen" value={t.accent}
          options={['#2563eb', '#4f46e5', '#0d9488', '#e23b2e']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Kerapatan" value={t.density}
          options={['comfortable', 'compact']}
          onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
