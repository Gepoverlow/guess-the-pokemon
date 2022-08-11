import { v4 as uuidv4 } from "uuid";

class Pokemon {
  constructor(name, sprite, randomNames) {
    this.id = uuidv4();
    this.name = name;
    this.sprite = sprite;
    this.randomNames = randomNames;
  }
}

export default Pokemon;
