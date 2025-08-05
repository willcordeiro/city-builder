export interface Asset {
  id: string;
  args: [number, number, number, number?, number?, number?];
  color: string;
  position: [number, number, number];
  filename: string;
  scale: number;
  rotation: number;
}

const assets: { [key: string]: Asset } = {
  grass: {
    id: "grass",
    args: [1, 1, 1],
    color: "#B9C753",
    position: [0, -0.5, 2],
    filename: "tile-road-straight.glb",
    scale: 8,
    rotation: 0,
  },
  residential: {
    id: "residential",
    args: [0.8, 1, 0.8],
    color: "#27ae60",
    position: [0, 0, 2],
    filename: "building-house-block-big.glb",
    scale: 8,
    rotation: 0,
  },
  commercial: {
    id: "commercial",
    args: [1, 0, 1],
    color: "#2980b9",
    position: [0, 0.05, 2],
    filename: "skyscraper-huge.glb",
    scale: 3,
    rotation: 0,
  },
  industrial: {
    id: "industrial",
    args: [0.5, 0.5, 1.2, 16, 1],
    color: "#f39c12",
    position: [0, 0, 2],
    filename: "industry-factory-old.glb",
    scale: 5,
    rotation: 0,
  },
  road: {
    id: "road",
    args: [1, 0.05, 1],
    color: "#3A3B3C",
    position: [0, 0.05, 2],
    filename: "tile-road-straight.glb",
    scale: 8,
    rotation: 0,
  },
};

export default assets;
