import type { City, Tile } from "@/types/city"

export function createCity(size: number): City {
  const data: Tile[][] = [];

  function createTile(x: number, y: number): Tile {
    return {
      x,
      y,
      building:undefined,
      selected: null,
      terrainID: "grass",
    };
  }

  function initialize(): void {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        column.push(createTile(x, y));
      }
      data.push(column);
    }
  }

  initialize()

  return {
    size,
    data,
  }
}
