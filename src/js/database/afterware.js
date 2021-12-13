/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */
import Photo from "../model/photo";
import Day from "../model/day";
import Poi from "../model/poi";
import { addTripData, addTripPhoto, editTripData } from "./data";


// let these be global (in the span of this file) for easier use.
let dispatchRef;
let signalRef;

/**
 * Make sure the following reducer functions work.
 * 1. Add
 *  a. Adding Day
 *  b.
 */

function handleAddPoi(post, payload) {
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

  addTripData(post.tripId, "pois", {...data});

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

      addTripPhoto(post.tripId, photoToUpload, signalRef);

      //! Gonna run into an issue when uploading, need to stop it at the form.
    })
  }
}

function handleAddPhoto(post, payload) {
  
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
    signalRef);
  
}

/** 
 * Handles various add cases.
 */
function handleAdd(post, payload) {
  // use the payload value to correctly identify the post.
  let dataInState;
  let data;
  
  switch(payload.type) {
    case "days": {
      dataInState = post.days.find(day => day.order === payload.order);

      data = new Day(dataInState.id,
        dataInState.order,
        dataInState.title,
        dataInState.color);

      break;
    }
    default: {
      break;
    }
  }

  addTripData(post.tripId, payload.type, {...data}, signalRef).then(docRef => {
    // use the ref to attach 
    dispatchRef({
      type: "attach_ref",
      payload: {
        type: payload.type,
        id: dataInState.id,
        ref: docRef
      }
    })
  });

}

/**
 * Updates the database based on the taken action.
 * @param {object} state - the state object, with pre and post conditions.
 * pre would be equivalent to what the database currently has on file,
 * and post is what the application currently possesses. 
 * Our goal is to keep both of these in synchronization.
 * @param {object} action - the action object sent to the dispatch.
 */
function updateDatabase(dispatch, state, action, signal) {
  // assign the two globals we have these references
  dispatchRef = dispatch;
  signalRef = signal;
  // 

  switch (action.type) {
    case "add": {
      // photos is a special case because it requires use of 
      // firebase storage.
      if (action.payload.type === "photos") {
        handleAddPhoto(state.post, action.payload);
      // everything else is normal.
      } else {
        handleAdd(state.post, action.payload);
      } 
      break;
    }
    case "add_poi": {
      handleAddPoi(state.post, action.payload);
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