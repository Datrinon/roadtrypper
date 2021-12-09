class Trip {
  
  tripId; // handled server-side.
  author;
  //id; // handled client-side...? id is per-project. // unnecessary actually.
  title;
  createDate;
  lastAccessed;
  uid;
  
  constructor(author, title, createDate = null, lastAccessed = null) {
    this.author = author;
    this.title = title;
    this.createDate = createDate ?? Date.now();
    this.lastAccessed = lastAccessed ?? Date.now();
  }
}

export default Trip;