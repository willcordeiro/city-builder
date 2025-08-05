export type BuildingId = "bulldoze" | "residential" | "commercial" | "industrial" | "road";

export interface Tile {
  x: number;
  y: number;
  buildingId?: BuildingId;
  terrainID: "grass";
  update: () => void;
  selected: boolean | null;
}

export interface City {
  size: number;
  data: Tile[][];
}
