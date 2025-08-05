import type { City, Tile } from "@/types/city"

export function createCity(size: number): City {
  const data: Tile[][] = []

  function initialize(): void {
    for (let x = 0; x < size; x++) {
      const column: Tile[] = [];
      for (let y = 0; y < size; y++) {
        const tile: Tile = {
          x,
          y,
          building: undefined,
          update() {
            const x = Math.random();
            if (x < 0.10) {
              if (this.building === undefined) {
                this.building = 'building-1';
              } else if (this.building === 'building-1') {
                this.building = 'building-2';
              } else if (this.building === 'building-2') {
                this.building = 'building-3';
              }
            }
          }
        };

        // Call update multiple times to increase building chance
        for (let i = 0; i < 5; i++) {
          tile.update();
        }
        column.push(tile);
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
