/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */
import Day from "../model/day";
import Poi from "../model/poi";
import { addTripData } from "./data";


/**
 * Make sure the following reducer functions work.
 * 1. Add
 *  a. Adding Day
 *  b.
 */



function handleAdd(post, payload, signal) {

  // use the payload value to correctly identify the post.
  let data;
  
  switch(payload.type) {
    case "days": {
      let day = post.days.find(day => day.order === payload.order);

      data = new Day(day.id, day.order, day.title, day.color);
      break;
    }
    case "add_poi": {
      let poi = post.pois.find(poi => {
        return poi.order === payload.order
          && poi.dayId === payload.dayId
      });
    
      data = new Poi(poi.id,
        poi.dayId,
        poi.description,
        poi.order,
        poi.title,
        poi.coordinates);

      // also need to take some time to handle the photos uploads, too.
      

      addTripData(post.tripId, "photos", )

      break;
    }
    default: {
      break;
    }
  }

  addTripData(post.tripId, payload.type, {...data}, signal);
}

/**
 * Updates the database based on the taken action.
 * @param {object} state - the state object, with pre and post conditions.
 * pre would be equivalent to what the database currently has on file,
 * and post is what the application currently possesses. 
 * Our goal is to keep both of these in synchronization.
 * @param {object} action - the action object sent to the dispatch.
 */
function updateDatabase(state, action, signal) {
  console.log({state, action});
  switch (action.type) {
    case "add": {
      handleAdd(state.post, action.payload, signal);
      break;
    }
    default: {
      break;
    }
  }
}

const logger = (action) => {
  console.log("logger: ", action);
}

export default updateDatabase;