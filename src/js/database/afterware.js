/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */
import Photo from "../model/photo";
import Day from "../model/day";
import Poi from "../model/poi";
import { addTripData,
  addTripPhoto,
  deleteFile,
  deletePhoto,
  deleteTrip,
  deleteTripData,
  editTripData,
  getPhotoStorageUri,
  getRef,
  updateTimestamp } from "./data";

// let these be global (in the span of this file) for easier use.
let dispatchRef;
/**
 * Make sure the following reducer functions work.
 * 1. Add
 *  a. Adding Day
 *  b.
 */

function handleAddPoi(state, payload) {
  const post = state.post;

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
  addTripData(post.tripId, "pois", { ...data }).then(docRef => {
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

      // debugger;

      addTripPhoto(post.tripId, photo.file, photo.realpath)
        .then(({ ref, path, storageUri }) => {
          dispatchRef({
            type: "attach_ref_edit_photo_path",
            payload: {
              id: postPhoto.id,
              ref: ref,
              path: path,
              storageUri
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
            ref
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
    payload.ref);

}

/** 
 * Handles various add cases.
 */
function handleAdd(state, payload) {
  const post = state.post;
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

      addTripData(post.tripId, payload.type, { ...data }).then(docRef => {
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

      addTripPhoto(post.tripId, payload.file, payload.realpath)
        .then(async ({ ref, path, storageUri }) => {
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
              storageUri
            }
          });

          //debugger; // remove this one and let's role afterward.

          await editTripData({ ...remainingData }, ref);
        })
      break;
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

  editTripData(data, getRef(payload.ref.path)).then(() => {
    console.log("Trip data edited successfully.");
  })
}

function handleEdit(state, payload) {
  const post = state.post;
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
  addTripPhoto(post.tripId, payload.file, payload.realpath, false)
    .then(async ({ path, storageUri }) => {
      dispatchRef({
        type: "attach_ref_edit_photo_path",
        payload: {
          id: payload.id,
          ref: payload.ref,
          path: path,
          storageUri
        }
      });

      let data = {
        path,
        storageUri
      };

      let oldStorageUri = payload.storageUri;

      await editTripData(data, getRef(payload.ref.path));

      console.log("Photo changed successfully, we can delete now.");

      await deleteFile(oldStorageUri);

      console.log("Photo deleted.");
    }).catch((error) => {
      console.error(error);
      console.log("Error committing photo change.");
    })
}

/**
 *  */
function regenerateOrder(item) {
  let data = {
    order: item.order
  };

  // return an array of promises for each POI in that day...
  return editTripData.bind(null, data, getRef(item.ref.path));
}

async function handleDelete(state, payload) {
  switch (payload.type) {
    case "photos": {
      // photos is an easy case to deal with, it's just about deleting
      // the photo. Nothing to reorder.
      // just have to delete the doc.
      // and then delete the file.
      await deletePhoto(getRef(payload.ref.path), payload.storageUri);
      break;
    }
    case "pois": {
      console.log("case POIs, handleDelete, in afterware.js:")
      console.log({ state, payload });
      // for pois, simply just pois and photos

      const poi = state.pre.pois.find(poi => poi.id === payload.id);
      deletePOIandPhotos(poi, state);

      break;
    }
    case "days": {
      // now for this, we have to delete the associated POIs AND all their photos.
      // we probably want to try multiple delete on a day before we
      // delete the day itself. 
      // like we just take it in strides.
      console.log("case Days, handleDelete, in afterware.js:");
      console.log({ state, payload });
      // first thing to do is identify all POIs removed...
      // then we can run deletePOI and photos for each of them.
      // we start with the day.id...
      const dayId = payload.id;
      // and then we can use that to identify all associated POIs.
      const pois = state.pre.pois.filter(poi => poi.dayId === dayId);
      // we can run all of those in a for loop.
      (async () => {
        for (let i = 0; i < pois.length; i++) {
          // and because of the merit of async we can await each of these.
          await deletePOIandPhotos(pois[i], state);
        }

        // then after that runs, we can delete the day itself.
        await deleteTripData(getRef(payload.ref.path));

        // then we just need to reorder all of the days...
        const dayOrderReqs = state.post.days.map(regenerateOrder);


        while (dayOrderReqs.length) {
          await Promise.allSettled(dayOrderReqs.splice(0, 1).map(f => f()))
        }

        // and then we'll be done after that.
      })();

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

  const poiDeleteRequest = deleteTripData.bind(null, getRef(poi.ref.path));

  const photoDeleteRequests = photosToDelete.map((photo) => {
    return deletePhoto.bind(null, getRef(photo.ref.path), photo.storageUri);
  });

  const otherPOIsInSameDay = state.post.pois.filter(other => other.dayId === poi.dayId);

  const poiReorderReqs = otherPOIsInSameDay.map((poi) => {
    let data = {
      order: poi.order
    };

    return editTripData.bind(null, data, getRef(poi.ref.path));
  });

  // now requests is full of async function binds.
  requests = [poiDeleteRequest, ...photoDeleteRequests, ...poiReorderReqs];

  // debugger;

  // do the splice
  while (requests.length) {
    //// 2 at a time
    // just 1 at a time for fear of mutation exception.
    await Promise.allSettled(requests.splice(0, 1).map(f => f()));
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

  editTripData(swapperUpdate, getRef(swapper.ref.path))
    .then(() => {
      return editTripData(swappeeUpdate, getRef(swappee.ref.path))
    })
    .then(() => {
      console.log("Rearrangement saved.");
    })
    .catch((error) => {
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

  const otherPOIRequests = otherDayPOIs.map(regenerateOrder);

  editTripData(movedItemData, getRef(movedPoi.ref.path)).then(async () => {
    console.log("The POI was moved successfully on Firestore.");

    // limit concurrency 
    while (otherPOIRequests.length) {
      // one at a time, please.
      await Promise.allSettled(otherPOIRequests.splice(0, 1).map(f => f()));
    }
  })
}


function handleGeneralEdit(state, payload) {
  // alright so we can use edit trip data
  // so we just need the general ref
  // then the key
  // then the update
  // object key update
  // thats the data
  // pass it over to edit trip data...

  // take the value from after dispatch in case some preprocessing is done
  // with it.
  let data = {
    [payload.key]: state.post.general[payload.key]
  };

  editTripData(data, getRef(state.post.ref.path));
  // !
  // Stale ref theory confirmed
  // !
  // Running this code, EVEN with the promise chain in the main func.,
  // results in this error
  /*
  index.js:1 [2021-12-23T23:30:30.485Z]  @firebase/firestore: Firestore (9.6.1): INTERNAL UNHANDLED ERROR:  TypeError: Cannot read properties of undefined (reading 'mutations')
  */
  // editTripData(data, state.post.ref, signalRef);
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

  let dbAction;
  let isDatabaseAction = true;
  // assign the two globals we have these references
  dispatchRef = dispatch;
  // 
  switch (action.type) {
    case "add": {
      dbAction = handleAdd;
      // handleAdd(state, action.payload);
      break;
    }
    case "add_poi": {
      dbAction = handleAddPoi;
      // handleAddPoi(state, action.payload);
      break;
    }
    case "edit": {
      dbAction = handleEdit;
      // handleEdit(state, action.payload);
      break;
    }
    case "rearrange": {
      dbAction = handleRearrange;
      // handleRearrange(state, action.payload);
      break;
    }
    case "move_poi": {
      dbAction = handlePOIMove;
      // handlePOIMove(state, action.payload);
      break;
    }
    case "delete": {
      dbAction = handleDelete;
      // await handleDelete(state, action.payload);
      break;
    }
    case "edit_general": {
      dbAction = handleGeneralEdit;
      // handleGeneralEdit(state, action.payload);
      break;
    }
    default: {
      // nothing to do, return early.
      return;
    }
  }

  let timestamp = {
    lastAccessed: state.post.general.lastAccessed
  };


  updateTimestamp(state.post.ref.path, timestamp).then(() => {
    dbAction(state, action.payload);
  })

  

  // editTripData(timestamp, state.post.ref, signalRef);
  
  // console.log("Timestamp editing");
  // updateDoc(state.post.ref, timestamp).then(() => {
  //   console.log("Timestamp finished");
    
  //   dbAction(state, action.payload);
  // })



  // if (isDatabaseAction) {
  //   let timestamp = {
  //     lastAccessed: state.post.general.lastAccessed
  //   };

  //   editTripData(timestamp, state.post.ref, signalRef);
  // }

  // ! Temporarily disabled
  // ! It is causing mutation issues 
  // ! signals we need to await our changes here too.
  // if the user committed a database action,
  // we should update the last accessed time for the trip doc.
  // if (isDatabaseAction) {
  //   let timestamp = {
  //     lastAccessed: state.post.general.lastAccessed
  //   };

  //   editTripData(timestamp, state.post.ref, signalRef);
  // }
}

const logger = (action) => {
  console.log("logger: ", action);
}

export default updateDatabase;