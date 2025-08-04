import type { City, Tile } from "@/types/city"

export function createCity(size: number): City {
  const data: Tile[][] = []

  function initialize(): void {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = []
      for (let y = 0; y < size; y++) {
        const tile: Tile = { x, y, building:undefined }

        if(Math.random() < 0.10){
          tile.building = "building"
        }

        column.push(tile)
      }
      data.push(column)
    }
  }

  initialize()

  return {
    size,
    data,
  }
}
