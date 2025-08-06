import buildingFactory from "@/utils/building-constants";

export type Building = ReturnType<typeof buildingFactory[keyof typeof buildingFactory]>;

export interface Tile {
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
