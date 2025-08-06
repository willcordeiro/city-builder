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
  // Residencial
  residential: {
    id: "residential",
    args: [0.8, 1, 0.8],
    color: "#27ae60",
    position: [0, 0, 2],
    filename: "building-house-block-big.glb",
    scale: 8,
    rotation: 0,
  },
  residentialLarge: {
    id: "residentialLarge",
    args: [0.8, 1, 0.8],
    color: "#27ae60",
    position: [0, 0, 2],
    filename: "building-house-block-old.glb",
    scale: 8,
    rotation: 0,
  },
  residentialApartment: {
    id: "residentialApartment",
    args: [0.8, 1, 0.8],
    color: "#27ae60",
    position: [0, 0, 2],
    filename: "building-office-balcony.glb",
    scale: 8,
    rotation: 0,
  },

  // Comercial
  commercial: {
    id: "commercial",
    args: [1, 0, 1],
    color: "#2980b9",
    position: [0, 0.05, 2],
    filename: "skyscraper-huge.glb",
    scale: 3,
    rotation: 0,
  },
  commercialSmall: {
    id: "commercialSmall",
    args: [1, 0, 1],
    color: "#2980b9",
    position: [0, 0.05, 2],
    filename: "building-cafe.glb",
    scale: 8,
    rotation: 0,
  },
  commercialRestaurant: {
    id: "commercialRestaurant",
    args: [1, 0, 1],
    color: "#2980b9",
    position: [0, 0.05, 2],
    filename: "building-market-china.glb",
    scale: 8,
    rotation: 0,
  },
  commercialOffice: {
    id: "commercialOffice",
    args: [1, 0, 1],
    color: "#2980b9",
    position: [0, 0.05, 2],
    filename: "building-office-tall.glb",
    scale: 6,
    rotation: 0,
  },
  commercialMall: {
    id: "commercialMall",
    args: [1, 0, 1],
    color: "#2980b9",
    position: [0, 0.05, 2],
    filename: "",
    scale: 3,
    rotation: 0,
  },

  // Industrial
  industrial: {
    id: "industrial",
    args: [0.5, 0.5, 1.2, 16, 1],
    color: "#f39c12",
    position: [0, 0, 2],
    filename: "industry-factory-old.glb",
    scale: 5,
    rotation: 0,
  },
  industrialSmall: {
    id: "industrialSmall",
    args: [0.5, 0.5, 1.2, 16, 1],
    color: "#f39c12",
    position: [0, 0, 2],
    filename: "",
    scale: 5,
    rotation: 0,
  },
  industrialHeavy: {
    id: "industrialHeavy",
    args: [0.5, 0.5, 1.2, 16, 1],
    color: "#f39c12",
    position: [0, 0, 2],
    filename: "nuclear-power-plant.glb",
    scale: 5,
    rotation: 0,
  },
  industrialLight: {
    id: "industrialLight",
    args: [0.5, 0.5, 1.2, 16, 1],
    color: "#f39c12",
    position: [0, 0, 2],
    filename: "industry-factory.glb",
    scale: 5,
    rotation: 0,
  },
  industrialWarehouse: {
    id: "industrialWarehouse",
    args: [0.5, 0.5, 1.2, 16, 1],
    color: "#f39c12",
    position: [0, 0, 2],
    filename: "industry-factory-hall.glb",
    scale: 5,
    rotation: 0,
  },
  road: {
    id: "road",
    args: [1, 0.05, 1],
    color: "#3A3B3C",
    position: [0, 0.05, 2],
    filename: "",
    scale: 8,
    rotation: 0,
  },
};

export default assets;
