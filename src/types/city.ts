export interface Tile {
  x: number
  y: number
  building:any;
}

export interface City {
  size: number
  data: Tile[][]
}
