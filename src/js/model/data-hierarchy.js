/**
 * A dictionary containing a listing of the tables used in this 
 * application, alongside their relations to others.
 */
const DATA_SCHEMA = {
  days : {
    parent: null,
    parentKey: null,
    child: "pois"
  },
  pois : {
    parent: "day",
    parentKey: "dayId",
    child: "photos",
  },
  photos: {
    parent: "pois",
    parentKey: "poiId",
    child: null
  },
  general: {
    parent: null,
    parentKey: null,
    child: null
  }

}

export default DATA_SCHEMA;