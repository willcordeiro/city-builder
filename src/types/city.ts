export interface Tile {
  x: number
  y: number
}

export interface City {
  size: number
  data: Tile[][]
}
