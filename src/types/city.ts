import { Asset } from "@/utils/assets";

export type Building = Asset;

export interface Tile {
  id:string;
  x: number;
  y: number;
  loading:boolean;
  building?: Building;
  terrainID: "grass";
  selected: boolean | null;
}

export interface City {
  size: number;
  data: Tile[][];
}
