interface BuildingFactory {
  [key: string]: () => {
    height: number;
    id: string;
    updated: boolean;
    update: () => void;
  };
}

const buildingFactory: BuildingFactory = {
  residential: () => {
    return {
      height: 1,
      id: "residential",
      updated: true,
      update: function () {
        if (Math.random() <0.05) {
          if (this.height < 5) {
            this.height += 1;
            this.updated = true;
          }
        }
      },
    };
  },
  commercial: () => {
    return {
      height: 1,
      id: "commercial",
      updated: true,
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height < 5) {
            this.height += 1;
            this.updated = true;
          }
        }
      },
    };
  },
  industrial: () => {
    return {
      id: "industrial",
      height: 1,
      updated: true,
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height < 5) {
            this.height += 1;
            this.updated = true;
          }
        }
      },
    };
  },
  road: () => {
    return {
      id: "road",
      height: 1,
      updated: true,
      update: function () {
        this.updated = false;
      },
    };
  },
};



export default buildingFactory;
