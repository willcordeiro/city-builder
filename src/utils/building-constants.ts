interface Building {
  height: number;
  id: string;
  updated: boolean;
  update: () => void;
}

interface BuildingFactory {
  [key: string]: () => Building;
}

const buildingFactory: BuildingFactory = {
  residential: () => ({
    height: 1,
    id: "residential",
    updated: true,
    update: function () {
      if (Math.random() < 0.05 && this.height < 5) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  residentialLarge: () => ({
    height: 1,
    id: "residentialLarge",
    updated: true,
    update: function () {
      if (Math.random() < 0.05 && this.height < 5) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  residentialApartment: () => ({
    height: 1,
    id: "residentialApartment",
    updated: true,
    update: function () {
      if (Math.random() < 0.05 && this.height < 5) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  commercial: () => ({
    height: 1,
    id: "commercial",
    updated: true,
    update: function () {
      if (Math.random() < 0.01 && this.height < 5) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  commercialSmall: () => ({
    height: 1,
    id: "commercialSmall",
    updated: true,
    update: function () {
      if (Math.random() < 0.01 && this.height < 3) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  commercialRestaurant: () => ({
    height: 1,
    id: "commercialRestaurant",
    updated: true,
    update: function () {
      // Sem crescimento para restaurante
      this.updated = false;
    },
  }),

  commercialOffice: () => ({
    height: 1,
    id: "commercialOffice",
    updated: true,
    update: function () {
      if (Math.random() < 0.02 && this.height < 4) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  commercialMall: () => ({
    height: 1,
    id: "commercialMall",
    updated: true,
    update: function () {
      if (Math.random() < 0.005 && this.height < 6) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  industrial: () => ({
    height: 1,
    id: "industrial",
    updated: true,
    update: function () {
      if (Math.random() < 0.01 && this.height < 5) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  industrialSmall: () => ({
    height: 1,
    id: "industrialSmall",
    updated: true,
    update: function () {
      this.updated = false;
    },
  }),

  industrialHeavy: () => ({
    height: 1,
    id: "industrialHeavy",
    updated: true,
    update: function () {
      if (Math.random() < 0.008 && this.height < 7) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  industrialLight: () => ({
    height: 1,
    id: "industrialLight",
    updated: true,
    update: function () {
      if (Math.random() < 0.01 && this.height < 4) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  industrialWarehouse: () => ({
    height: 1,
    id: "industrialWarehouse",
    updated: true,
    update: function () {
      if (Math.random() < 0.007 && this.height < 5) {
        this.height++;
        this.updated = true;
      }
    },
  }),

  road: () => ({
    height: 1,
    id: "road",
    updated: true,
    update: function () {
      this.updated = false;
    },
  }),
};

export default buildingFactory;
