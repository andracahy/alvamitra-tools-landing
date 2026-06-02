/* ALVAMITRA — data deklaratif: tools, workflow steps, value props */
import type { ComponentType } from 'react';
import {
  IconCamera, IconEye, IconBolt, IconStorage, IconWifi, IconCpu, IconGrid, IconSliders,
  IconFree, IconFlash, IconDoc, IconDevices,
} from '../components/icons';

const U = 'https://alvamitra.com/tools/';

// id demo dipetakan ke komponen island di index.astro (import eksplisit
// diperlukan agar Astro bisa generate hydration script untuk client:visible).
export type DemoId =
  | 'cctv' | 'viewing' | 'bandwidth' | 'storage'
  | 'wireless' | 'poe' | 'subnet' | 'port';

export interface Tool {
  ico: ComponentType<{ size?: number }>;
  name: string;
  sub: string;
  url: string;
  desc: string;
  when: string;
  demo: DemoId;
}

export interface ToolGroup {
  label: string;
  tools: Tool[];
}

export const GROUPS: ToolGroup[] = [
  {
    label: 'Coverage Planning',
    tools: [
      { ico: IconCamera, name: 'CCTV Calculator', sub: 'Kalkulator DORI', url: U + 'cctv-calculator',
        desc: 'Hitung kepadatan pixel (px/m) dari focal length, ukuran sensor, dan resolusi untuk tahu level DORI — Deteksi, Observasi, Kenali, Identifikasi — pada jarak tertentu.',
        when: 'menentukan lensa & posisi kamera agar wajah/plat terbaca jelas', demo: 'cctv' },
      { ico: IconEye, name: 'Viewing Angle', sub: 'Sudut pandang & lensa', url: U + 'viewing-angle',
        desc: 'Lihat hubungan focal length dengan angle of view serta lebar area yang tertangkap pada jarak tertentu.',
        when: 'memilih lensa fixed / varifocal untuk tiap titik', demo: 'viewing' },
    ],
  },
  {
    label: 'Network & Storage',
    tools: [
      { ico: IconBolt, name: 'Bandwidth Calculator', sub: 'Beban jaringan', url: U + 'bandwidth',
        desc: 'Hitung total throughput dari seluruh kamera supaya switch dan uplink tidak kelebihan beban.',
        when: 'merancang topologi jaringan & memilih switch', demo: 'bandwidth' },
      { ico: IconStorage, name: 'Storage Needs', sub: 'Kapasitas rekaman', url: U + 'storage',
        desc: 'Estimasi kapasitas HDD/NVR berdasarkan jumlah kamera, bitrate, dan lama retensi rekaman.',
        when: 'menentukan ukuran storage & durasi backup', demo: 'storage' },
    ],
  },
  {
    label: 'Wireless & Power',
    tools: [
      { ico: IconWifi, name: 'Wireless Link Signal', sub: 'Kualitas link nirkabel', url: U + 'wireless-signal',
        desc: 'Perkirakan kekuatan sinyal point-to-point berdasarkan jarak untuk link antar gedung.',
        when: 'memasang kamera di lokasi tanpa kabel', demo: 'wireless' },
      { ico: IconCpu, name: 'PoE Budget Calculator', sub: 'Anggaran daya switch', url: U + 'poe-budget',
        desc: 'Pastikan total konsumsi daya seluruh kamera tidak melebihi PoE budget dari switch yang dipilih.',
        when: 'memilih PoE switch & mencegah kamera mati mendadak', demo: 'poe' },
    ],
  },
  {
    label: 'Setup & Testing',
    tools: [
      { ico: IconGrid, name: 'IPv4 / Subnet Planner', sub: 'Pengalamatan IP', url: U + 'subnet',
        desc: 'Rencanakan subnet, jumlah host, dan subnet mask untuk jaringan kamera yang rapi dan terstruktur.',
        when: 'setup IP statis & segmentasi jaringan', demo: 'subnet' },
      { ico: IconSliders, name: 'Port Forwarding Test', sub: 'Akses jarak jauh', url: U + 'port-test',
        desc: 'Cek apakah port untuk akses remote (RTSP, HTTP, web NVR) sudah terbuka dari internet.',
        when: 'mengaktifkan akses CCTV dari luar jaringan', demo: 'port' },
    ],
  },
];

export interface ValueProp {
  ico: ComponentType<{ size?: number }>;
  t: string;
  d: string;
}

export const VALUES: ValueProp[] = [
  { ico: IconFree, t: 'Gratis & tanpa login', d: 'Buka, hitung, selesai. Tidak ada paywall atau pendaftaran.' },
  { ico: IconFlash, t: 'Hasil real-time', d: 'Geser slider, angka langsung berubah. Tanpa tunggu loading.' },
  { ico: IconDoc, t: 'Siap untuk quotation', d: 'Angka akurat yang bisa langsung dipakai di proposal klien.' },
  { ico: IconDevices, t: 'Jalan di mana saja', d: 'Mulus di HP saat survei lokasi maupun desktop di kantor.' },
];

export interface WorkflowStep {
  n: string;
  t: string;
  d: string;
  tools: string[];
}

export const STEPS: WorkflowStep[] = [
  { n: '01', t: 'Perencanaan coverage', d: 'Tentukan jumlah kamera & sudut pandang sesuai luas area.', tools: ['CCTV Calculator', 'Viewing Angle'] },
  { n: '02', t: 'Network & storage', d: 'Hitung beban bandwidth dan kapasitas penyimpanan rekaman.', tools: ['Bandwidth', 'Storage Needs'] },
  { n: '03', t: 'Wireless & power', d: 'Pastikan link nirkabel kuat dan PoE budget mencukupi.', tools: ['Wireless Signal', 'PoE Budget'] },
  { n: '04', t: 'Setup & testing', d: 'Susun pengalamatan IP lalu uji akses port dari luar.', tools: ['Subnet Planner', 'Port Test'] },
];

export const TOOLS_URL = 'https://alvamitra.com/tools';
export const LOGO = '/assets/alvamitra-logo.png';
