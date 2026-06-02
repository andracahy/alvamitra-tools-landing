/* Wrapper island: satu import statis agar Astro bisa hydrate via client:visible.
   Switch ke demo yang tepat berdasarkan id dari data. */
import {
  CctvCalcDemo, ViewingAngleDemo, BandwidthDemo, StorageDemo,
  WirelessDemo, PoeDemo, SubnetDemo, PortTestDemo,
} from './demos';
import type { DemoId } from '../data/tools';

const DEMOS: Record<DemoId, React.ComponentType> = {
  cctv: CctvCalcDemo,
  viewing: ViewingAngleDemo,
  bandwidth: BandwidthDemo,
  storage: StorageDemo,
  wireless: WirelessDemo,
  poe: PoeDemo,
  subnet: SubnetDemo,
  port: PortTestDemo,
};

export default function DemoIsland({ id }: { id: DemoId }) {
  const Demo = DEMOS[id];
  return <Demo />;
}
