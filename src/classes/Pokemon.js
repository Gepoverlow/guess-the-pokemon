import { v4 as uuidv4 } from "uuid";

class Pokemon {
  constructor(response, randomNames) {
    this.id = response.id;
    this.name = response.name;
    this.sprite = response.sprites.other.home.front_default;
    this.randomNames = randomNames;
  }
}

export default Pokemon;
