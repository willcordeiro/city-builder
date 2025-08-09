import { Asset } from "./assets";

export type Building = Asset;

export interface Tile {
  id: string;
  x: number;
  y: number;
  loading: boolean;
  building?: Building;
  terrainID: "grass";
  selected: boolean | null;
}

export interface City {
  width: number;
  height: number;
  size: number;
  data: Tile[][];
}

export type BuildingType = "residential" | "commercial" | "industrial" | "road";

export type CityGrid = City;
