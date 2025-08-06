import { getAsset } from "./getAsset"; // importe se necessário

export function lightenColor(hex: number): number {
  return hex + 0x222222 > 0xffffff ? 0xffffff : hex + 0x222222;
}

export function getColorForBuilding(buildingId: string): number {
  const asset = getAsset(buildingId);
  if (!asset || !asset.color) return 0xaaaaaa;
  return Number.parseInt(asset.color.replace("#", "0x"));
}
