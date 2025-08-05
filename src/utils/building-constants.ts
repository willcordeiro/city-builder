interface BuildingFactory {
  [key: string]: () => {
    height: number;
    id: string;
    update: () => void;
  };
}

const buildingFactory: BuildingFactory = {
  residential: () => {
    return {
      height: 1,
      id: "residential",
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height < 5) {
            this.height += 1;
          }
        }
      },
    };
  },
  commercial: () => {
    return {
      height: 1,
      id: "commercial",
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height < 5) {
            this.height += 1;
          }
        }
      },
    };
  },
  industrial: () => {
    return {
      height: 1,
      id: "industrial",
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height < 5) {
            this.height += 1;
          }
        }
      },
    };
  },
  road: () => {
    return {
      height: 1,
      id: "road",
      update: function () {
        if (Math.random() < 0.01) {
          if (this.height < 5) {
            this.height += 1;
          }
        }
      },
    };
  },
};

export default buildingFactory;