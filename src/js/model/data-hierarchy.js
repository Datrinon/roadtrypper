/**
 * A dictionary containing a listing of the tables used in this 
 * application, alongside their relations to others.
 */
const SCHEMA = {
  day : {
    parent: null,
    parentKey: null,
    child: "poi"
  },
  poi : {
    parent: "day",
    parentKey: "dayId",
    child: "photo",
  },
  photo: {
    parent: "poi",
    parentKey: "poiId",
    child: null
  },
  general: {
    parent: null,
    parentKey: null,
    child: null
  }

}

export default SCHEMA;