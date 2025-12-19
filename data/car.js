class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carBrand, carModel) {
    this.#brand = carBrand;
    this.#model = carModel;
  }

  displayInfo() {
    console.log(
      `${this.#brand} ${this.#model}, speed: ${this.speed}, trunk: ${this.isTrunkOpen}`
    );
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    } else {
      console.log('car cannot start moving while trunk is open.')
    }
  }

  break() {
    this.speed -= 5;
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    } else {
      console.log('Trunk cannot be open while car is moving.')
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  go() {
    if (!this.isTrunkOpen) {
      this.speed += this.acceleration;
    } else {
      console.log('car cannot start moving while trunk is open.')
    }
  }

  openTrunk() {
    console.log(`Car cannot open trunk`);
  }

  closeTrunk() {
    console.log(`Car cannot open trunk`);
  }

  constructor(carBrand, carModel, acceleration) {
    super(carBrand, carModel);
    this.acceleration = acceleration;
  }
}

const myCar = new Car('BMW', 'F900R');
const mutiCar = new Car('Porsche', '911');
const raceCar = new RaceCar('McLaren', 'F1', 20);

myCar.displayInfo();
mutiCar.displayInfo();
raceCar.displayInfo();
