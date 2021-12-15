/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */
import Photo from "../model/photo";
import Day from "../model/day";
import Poi from "../model/poi";
import { addTripData, addTripPhoto, deleteFile, deletePhoto, editTripData, getPhotoStorageUri } from "./data";


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

  // this trip data
  addTripData(post.tripId, "pois", { ...data }, signalRef).then(docRef => {
    // use the ref to attach 
    dispatchRef({
      type: "attach_ref",
      payload: {
        type: "pois",
        id: poi.id,
        ref: docRef
      }
    })
  });


  // also need to take some time to handle the photos uploads, too.
  if (payload.photos !== null) {
    payload.photos.forEach(photo => {
      let postPhoto = post.photos.find(postPic => (
        postPic.realpath === photo.realpath));

      debugger;

      addTripPhoto(post.tripId, photo.file, photo.realpath, signalRef)
        .then(({ ref, path }) => {
          dispatchRef({
            type: "attach_ref_edit_photo_path",
            payload: {
              id: postPhoto.id,
              ref: ref,
              path: path,
            }
          });

          let photoInfo = new Photo(
            postPhoto.poiId,
            postPhoto.id,
            path,
            postPhoto.description
          );

          editTripData(
            { ...photoInfo },
            ref,
            signalRef
          );
        })

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
  editTripData(
    { ...remainingPhotoInfo },
    payload.ref,
    signalRef);

}

/** 
 * Handles various add cases.
 */
function handleAdd(post, payload) {
  // use the payload value to correctly identify the post.
  let dataInState;
  let data;

  switch (payload.type) {
    case "days": {
      dataInState = post.days.find(day => day.order === payload.order);

      data = new Day(dataInState.id,
        dataInState.order,
        dataInState.title,
        dataInState.color);

      break;
    }
    case "photos": {
      dataInState = post.photos.find(photo => photo.realpath === payload.realpath);

      addTripPhoto(post.tripId, payload.file, payload.realpath, signalRef).then(async ({ ref, path }) => {
        let remainingData = new Photo(
          dataInState.poiId,
          dataInState.id,
          path,
          dataInState.description
        )

        dispatchRef({
          type: "attach_ref_edit_photo_path",
          payload: {
            id: dataInState.id,
            ref: ref,
            path: path,
          }
        });

        //debugger; // remove this one and let's role afterward.

        await editTripData({ ...remainingData }, ref, signalRef);
      })
    }
    default: {
      break;
    }
  }

  addTripData(post.tripId, payload.type, { ...data }, signalRef).then(docRef => {
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


function handleEdit(post, payload) {
  switch (payload.type) {
    case "photos": {
      if (payload.key === "description") {
        // Just need the ref and the key / description assembled into an obj.
        let data = {
          [payload.key]: payload.value
        }

        editTripData(data, payload.ref, signalRef);
      } else if (payload.key === "path") {
        replacePhoto(post, payload);
      }
      break;
    }
    default:
      break;
  }
}

function replacePhoto(post, payload) {
  addTripPhoto(post.tripId, payload.file, payload.realpath, signalRef, false)
    .then(async ({ path, storageUri }) => {
      dispatchRef({
        type: "attach_ref_edit_photo_path",
        payload: {
          id: payload.id,
          ref: payload.ref,
          path: path
        }
      });

      let data = {
        path,
        storageUri
      };

      let oldStorageUri = await getPhotoStorageUri(payload.ref);

      await editTripData(data, payload.ref, signalRef);

      console.log("Photo changed successfully, we can delete now.");

      await deleteFile(oldStorageUri, signalRef);

      console.log("Photo deleted.");
    }).catch((error) => {
      console.error(error);
      console.log("Error committing photo change.");
    })
}


function handleDelete(post, payload) {
  switch(payload.type) {
    case "photos": {
      // photos is an easy case to deal with, it's just about deleting
      // the photo. Nothing to reorder.
      // just have to delete the doc.
      // and then delete the file.
      deletePhoto(payload.ref, signalRef);

      console.log("Photo deleted successfully");

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
function updateDatabase(dispatch, state, action, signal) {
  // assign the two globals we have these references
  dispatchRef = dispatch;
  signalRef = signal;
  // 

  switch (action.type) {
    case "add": {
      handleAdd(state.post, action.payload);
      break;
    }
    case "add_poi": {
      handleAddPoi(state.post, action.payload);
      break;
    }
    case "edit": {
      handleEdit(state.post, action.payload);
      break;
    }
    case "delete": {
      handleDelete(state.post, action.payload);
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