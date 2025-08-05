interface Asset {
  id: string;
  args: [number, number, number, number?, number?, number?];
  color: string;
  position: [number, number, number];
}

const assets: { [key: string]: Asset } = {
   grass: {
    id: "grass",
    args: [1, 1, 1],
    color: "#B9C753",
    position: [0, -0.5, 2],
  },
  residential: {
    id: "residential",
    args: [0.8, 1, 0.8],
    color: "#27ae60",
    position: [0, 0.5, 2],
  },
  commercial: {
    id: "commercial",
    args: [1, 1.4, 1],
    color: "#2980b9",
    position: [0, 0.7, 2],
  },
  industrial: {
    id: "industrial",
    args: [0.5, 0.5, 1.2, 16, 1],
    color: "#f39c12",
    position: [0, 0.6, 2],
  },
  road: {
    id: "road",
    args: [1, 0.1, 1],
    color: "#3A3B3C",
    position: [0, 0.05, 2],
  },
};

export default assets;
