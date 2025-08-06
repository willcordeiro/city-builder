import { Asset } from "@/utils/assets";

export type Building = Asset;

export interface Tile {
  x: number;
  y: number;
  loading:boolean;
  building?: Building;
  terrainID: "grass";
  selected: boolean | null;
}

export interface City {
  city: any;
  size: number;
  data: Tile[][];
}
