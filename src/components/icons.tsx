/* ALVAMITRA — icon set (feather-style line icons, blue stroke via currentColor) */
import type { ReactNode } from 'react';

interface IcoProps {
  d?: string;
  size?: number;
  fill?: boolean;
  vb?: number;
  children?: ReactNode;
  sw?: number;
  className?: string;
}

const Ico = ({ d, size = 22, fill, vb = 24, children, sw = 1.9, className }: IcoProps) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${vb} ${vb}`}
    fill="none"
    stroke={fill ? 'none' : 'currentColor'}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block' }}
    className={className}
  >
    {children || <path d={d} />}
  </svg>
);

type IconProps = Omit<IcoProps, 'd' | 'children'>;

export const IconCamera = (p: IconProps) => (
  <Ico {...p}><rect x="2.5" y="6.5" width="13" height="11" rx="2.5" /><path d="M15.5 10.5l5-3v9l-5-3" /></Ico>
);
export const IconEye = (p: IconProps) => (
  <Ico {...p}><path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12Z" /><circle cx="12" cy="12" r="3" /></Ico>
);
export const IconBolt = (p: IconProps) => (
  <Ico {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Ico>
);
export const IconStorage = (p: IconProps) => (
  <Ico {...p}><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" /><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /></Ico>
);
export const IconWifi = (p: IconProps) => (
  <Ico {...p}><path d="M2 8.5C5 6 8.3 4.7 12 4.7S19 6 22 8.5" /><path d="M5 12c2-1.7 4.4-2.6 7-2.6s5 .9 7 2.6" /><path d="M8 15.5c1.2-1 2.5-1.5 4-1.5s2.8.5 4 1.5" /><circle cx="12" cy="19" r="1.1" fill="currentColor" stroke="none" /></Ico>
);
export const IconCpu = (p: IconProps) => (
  <Ico {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></Ico>
);
export const IconGrid = (p: IconProps) => (
  <Ico {...p}><rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M3 9h18M9 3v18" /></Ico>
);
export const IconSliders = (p: IconProps) => (
  <Ico {...p}><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h7M15 18h5" /><circle cx="16" cy="6" r="2" fill="#fff" /><circle cx="8" cy="12" r="2" fill="#fff" /><circle cx="13" cy="18" r="2" fill="#fff" /></Ico>
);

/* value-band + ui glyphs */
export const IconFree = (p: IconProps) => (<Ico {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.2c.4-1 1.4-1.6 2.6-1.6 1.5 0 2.6.9 2.6 2.2 0 2.4-2.9 1.8-2.9 4M12 16.6h.01" stroke="currentColor"/></Ico>);
export const IconFlash = (p: IconProps) => (<Ico {...p}><path d="M12 2v6l4 2-8 12 1-8-4-2 7-10Z"/></Ico>);
export const IconDoc = (p: IconProps) => (<Ico {...p}><path d="M6 2.5h7l5 5v14H6z"/><path d="M13 2.5v5h5M9 13h6M9 17h6"/></Ico>);
export const IconDevices = (p: IconProps) => (<Ico {...p}><rect x="2.5" y="4.5" width="13" height="10" rx="1.5"/><path d="M2.5 17.5h13"/><rect x="16.5" y="8.5" width="5" height="11" rx="1.2"/></Ico>);
export const IconArrow = (p: IconProps) => (<Ico {...p} size={p.size || 16}><path d="M5 12h14M13 6l6 6-6 6" /></Ico>);
export const IconCheck = (p: IconProps) => (<Ico {...p}><path d="M4 12.5l5 5 11-12" /></Ico>);
