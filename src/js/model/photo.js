class Photo {
  poiId;
  id;
  path;
  description;

  constructor(poiId, id, path, description) {
    this.poiId = poiId;
    this.id = id;
    this.path = path;
    this.description = description;
  }
}

export default Photo;