export interface Asset {
  id: string;
  args?: [number, number, number, number?, number?, number?];
  color?: string;
  position?: [number, number, number];
  filename: string;
  scale: number;
  rotation: number;
}
