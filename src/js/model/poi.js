class Poi {
  
  id;
  dayId;
  description;
  order;
  title;
  coordinates;

  constructor(id, dayId, description, order, title, coordinates) {
    this.id = id;
    this.dayId = dayId;
    this.description = description;
    this.order = order;
    this.title = title;
    this.coordinates = coordinates;
  }
}

export default Poi;