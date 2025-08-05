export interface Tile {
  x: number
  y: number
  building:any;
  update: () => void
}

export interface City {
  size: number
  data: Tile[][]
}
