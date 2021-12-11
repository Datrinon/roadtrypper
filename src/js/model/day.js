import { identity } from "lodash"

class Day {
  id;
  order;
  title;
  color;

  constructor(id, order, title, color) {
    this.id = id;
    this.order = order;
    this.title = title;
    this.color = color;
  }
}

export default Day;
