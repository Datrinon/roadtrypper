class Trip {
  
  tripId; // handled server-side.
  author;
  //id; // handled client-side...? id is per-project. // unnecessary actually.
  title;
  createDate;
  lastAccessed;
  uid;
  
  constructor(author, email, title, createDate = null, lastAccessed = null) {
    this.author = author;
    this.email = email;
    this.title = title;
    this.createDate = createDate ?? Date.now();
    this.lastAccessed = lastAccessed ?? Date.now();
  }
}

export default Trip;