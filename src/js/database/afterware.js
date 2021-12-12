/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */
import Photo from "../model/photo";
import Day from "../model/day";
import Poi from "../model/poi";
import { addTripData, addTripPhoto, editTripData } from "./data";


/**
 * Make sure the following reducer functions work.
 * 1. Add
 *  a. Adding Day
 *  b.
 */

function handleAddPoi(post, payload, signal) {
  let poi = post.pois.find(poi => {
    return poi.order === payload.order
      && poi.dayId === payload.dayId
  });

  let data = new Poi(poi.id,
    poi.dayId,
    poi.description,
    poi.order,
    poi.title,
    poi.coordinates);

  addTripData(post.tripId, "pois", {...data}, signal);

  // also need to take some time to handle the photos uploads, too.
  // where tf is the file upload lmao.
  if (payload.photos !== null) {
    payload.photos.forEach(photo => {
      let postPhoto = post.photos.find(postPic => postPic.path === photo.path);

      // photo after work has been done to it in the reducer.
      let photoToUpload = {
        ...photo, // get file + path + description
        // also need the poiId and id 
        id: postPhoto.id,
        poiId: postPhoto.poiId
      }

      addTripPhoto(post.tripId, photoToUpload, signal);

      //! Gonna run into an issue when uploading, need to stop it at the form.
    })
  }
}

function handleAddPhoto(post, payload, signal) {
  
  let postPhoto = post.photos.find(postPic => postPic.path === payload.path);
  
  // get the photo information
  let remainingPhotoInfo = new Photo(
    postPhoto.poiId,
    postPhoto.id,
    postPhoto.path,
    postPhoto.description
  );
  
  // the photo document is already there from the pre-dispatch,
  // so all we have to do now is just edit it to account for
  // the logic that the dispatch ran.
  editTripData(post.tripId,
    "photos",
    {...remainingPhotoInfo},
    "path",
    postPhoto.path,
    signal);
  
}

/** 
 * Handles various add cases.
 */
function handleAdd(post, payload, signal) {
  // use the payload value to correctly identify the post.
  let data;
  
  switch(payload.type) {
    case "days": {
      let day = post.days.find(day => day.order === payload.order);

      data = new Day(day.id, day.order, day.title, day.color);

      addTripData(post.tripId, payload.type, {...data}, signal);
      break;
    }
    default: {
      break;
    }
  }
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
      if (action.payload.type === "photos") {
        handleAddPhoto(state.post, action.payload, signal);
      } else {
        handleAdd(state.post, action.payload, signal);
      } 
      break;
    }
    case "add_poi": {
      handleAddPoi(state.post, action.payload, signal);
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