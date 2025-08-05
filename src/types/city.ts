export interface Tile {
  x: number
  y: number
  building: "building-1" | "building-2" | "building-3" | undefined
  terrainID: "grass"
  update: () => void
  selected:Boolean | null;
}


export interface City {
  size: number
  data: Tile[][]
}
