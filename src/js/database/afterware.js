/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */
import Photo from "../model/photo";
import Day from "../model/day";
import Poi from "../model/poi";
import { addTripData, addTripPhoto, deleteFile, deletePhoto, deleteTripData, editTripData, getPhotoStorageUri } from "./data";

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


      break;
    }
    case "photos": {
      dataInState = post.photos.find(photo => photo.realpath === payload.realpath);

      addTripPhoto(post.tripId, payload.file, payload.realpath, signalRef)
        .then(async ({ ref, path }) => {
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
}

/**
 * For standard edit cases, where we just have to edit a single field. 
 * Unlike others where we need to rearrange documents.
 */
function makeStandardEdit(payload) {
  // Just need the ref and the key / description assembled into an obj.
  let data = {
    [payload.key]: payload.value
  }

  editTripData(data, payload.ref, signalRef).then(() => {
    console.log("Trip data edited successfully.");
  })
}

function handleEdit(post, payload) {
  switch (payload.type) {
    case "photos": {
      if (payload.key === "description") {
        makeStandardEdit(payload);
      } else if (payload.key === "path") {
        replacePhoto(post, payload);
      }
      break;
    }
    case "pois": {
      if (payload.key === "coordinates"
        || payload.key === "title"
        || payload.key === "description"
      ) {
        makeStandardEdit(payload);
      }
      break;
    }
    case "days": {
      if (payload.key === "color"
        || payload.key === "title"
      ) {
        makeStandardEdit(payload);
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

function regeneratePOIOrders(poi) {
  let data = {
    order: poi.order
  };

  // return an array of promises for each POI in that day...
  return editTripData.bind(null, data, poi.ref, signalRef);
}

function handleDelete(state, payload) {
  switch (payload.type) {
    case "photos": {
      // photos is an easy case to deal with, it's just about deleting
      // the photo. Nothing to reorder.
      // just have to delete the doc.
      // and then delete the file.
      deletePhoto(payload.ref, signalRef);

      console.log("Photo deleted successfully");
      break;
    }
    case "pois": {
      // in pois you deal with your first case of waterfall deletion.
      // the associated photos must also be eliminated too.
      // also, you have to worry about reordering POIs.
      // suggest that you run a console.log here...
      console.log("case POIs, handleDelete, in afterware.js:")
      console.log({ state, payload });
      // for pois, simply just pois and photos
      // delete the poi.
      const poi = state.pre.pois.find(poi => poi.id === payload.id);
      deletePOIandPhotos(poi, state);

      break;
    }
    default: {
      break;
    }
  }
}

/**
 * Deletes a POI and its photos.
 * @param {POI} poi 
 */
async function deletePOIandPhotos(poi, state) {
  let requests;
  // then, delete the photos with the same poiId.
  const photosToDelete = state.pre.photos.filter(photo => photo.poiId === poi.id);

  const poiDeleteRequest = deleteTripData.bind(null, poi.ref, signalRef);
  
  const photoDeleteRequests = photosToDelete.map((photo) => {
    return deletePhoto.bind(null, photo.ref, signalRef);
  });

  const otherPOIsInSameDay = state.post.pois.filter(other => other.dayId === poi.dayId);

  const poiReorderReqs = otherPOIsInSameDay.map((poi) => {
    let data = {
      order: poi.order
    };

    return editTripData.bind(null, data, poi.ref, signalRef);
  });

  // now requests is full of async function binds.
  requests = [poiDeleteRequest, ...photoDeleteRequests, ...poiReorderReqs];

  debugger;

  // do the splice
  while (requests.length) {
    // 2 at a time
    await Promise.allSettled(requests.splice(0, 2).map(f => f()));
  }

}


function handleRearrange(state, payload) {
  // swapper, the record that was active when initiating the swap
  // swapped, the record that was in the place where swapper wants to move into.

  let preTable = state.pre[payload.type];

  let swapper = preTable.find(item => item.id === payload.id);

  let swappee;
  if (payload.fk) {
    // if it has a foreign key
    // make sure it has the same value
    // and then look for its place in the old table.
    // that's how you can get the ref for the object
    swappee = preTable.find(item => {
      return (
        item[payload.fk] === swapper[payload.fk]
        && item.order === payload.newOrder
      )
    });
  } else {
    swappee = preTable.find(item => {
      return (
        item.order === payload.newOrder
      )
    });
  }

  let swapperUpdate = {
    // swappee order is equivalent to
    // the payload order
    order: swappee.order,
  };

  let swappeeUpdate = {
    // give the swapped the swapper's old order.
    order: swapper.order
  }

  Promise.all([
    editTripData(swapperUpdate, swapper.ref, signalRef),
    editTripData(swappeeUpdate, swappee.ref, signalRef)
  ]).then(() => {
    console.log("Rearrangement saved.");
  }).catch((error) => {
    console.log("Rearrangement failed; some error occurred");
    console.error(error);
  })
}

function handlePOIMove(state, payload) {
  console.log("handlePOIMove, in afterware.js");
  console.log({ state, payload });

  // update object contains the order and dayId.
  // no other modifications.
  const prePoiTable = state.pre.pois;
  const postPoiTable = state.post.pois;

  const movedPoi = postPoiTable.find(poi => payload.id === poi.id);

  const movedItemData = {
    dayId: movedPoi.dayId,
    order: movedPoi.order
  };

  // now we get the other pois in the original one and we update that.
  const originalPoiDayId = prePoiTable.find(poi => poi.id === payload.id).dayId;
  const otherDayPOIs = state.post.pois.filter(poi => poi.dayId === originalPoiDayId);

  const otherPOIRequests = otherDayPOIs.map(regeneratePOIOrders);

  editTripData(movedItemData, movedPoi.ref, signalRef).then(async () => {
    console.log("The POI was moved successfully on Firestore.");

    // limit concurrency 
    while (otherPOIRequests.length) {
      await Promise.allSettled(otherPOIRequests.splice(0, 2).map(f => f()));
    }
  })
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
    case "rearrange": {
      handleRearrange(state, action.payload);
      break;
    }
    case "move_poi": {
      handlePOIMove(state, action.payload);
      break;
    }
    case "delete": {
      handleDelete(state, action.payload);
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