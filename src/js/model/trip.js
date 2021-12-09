class Trip {
  
  tripId; // handled server-side.
  author; // on write, is uid, on read, is email.
  title;
  createDate;
  lastAccessed;
  
  constructor(author, title, createDate = null, lastAccessed = null) {
    this.author = author;
    this.title = title;
    this.createDate = createDate ?? Date.now();
    this.lastAccessed = lastAccessed ?? Date.now();
  }
}

export default Trip;