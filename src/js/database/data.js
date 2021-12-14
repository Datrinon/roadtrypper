import fbService from "./config";
// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
  limit,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

// Models
import Trip from "../model/trip";

// Sample Data
import { MOCK_TRIP_ID } from '../../data/sample-days';

// const fbService = initializeApp(firebaseConfig);

const db = getFirestore(fbService);
const tripsStore = collection(db, "trips");

const storage = getStorage(fbService);
const storageRef = ref(storage);

// TODO
// remove later
function getSubcollection(tripId, category) {
  return collection(db, "trips", tripId, category);
}

/**
 * Adds a trip to the database. Just provide the author name; other attributes
 * in `Trip` will be assigned default values and user-specific chracteristics.
 * 
 * @param {UserImpl} User authentication object associated with the log-in.
 * @returns 
 */
async function addTrip(user, signal) {
  try {
    let trip = new Trip(
      user.email,
      "Untitled Trip"
    );

    // addDoc only wants objects, not custom objects, so let's try shallow copying properties.
    // worked.
    trip = { ...trip };

    // extra security tag.
    trip.uid = user.uid;

    const docRef = await addDoc(tripsStore, trip);

    if (signal.aborted) {
      return Promise.reject(new Error("The request was cancelled early."));
    }

    console.log("Document written: ", docRef);

    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * Load the user's trips.
 * @param {UserImpl} user - The authenticated user's information.
 * @param {AbortController} signal - Allows request to be canceled if user navigates before finish.
 * @param {string} orderByAttr - The attribute on trip to order by (title / date).
 * @param {string} direction - Direction to sort by; 'asc' or 'desc'.
 * @returns 
 */
async function loadTrips(user,
  signal,
  orderByAttr = 'lastAccessed',
  direction = 'desc') {
  const trips = [];

  const q = query(tripsStore,
    where("uid", "==", user.uid),
    orderBy(orderByAttr, direction));

  const querySnapshot = await getDocs(q);

  if (signal.aborted) {
    return Promise.reject(new Error("The request was cancelled early."));
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const trip = new Trip(
      data.email, // censor the UID from being published.
      // in the upcoming sec phase the UID won't be accessible on reads.
      data.title,
      data.createDate,
      data.lastAccessed
    );

    trip.tripId = doc.id;

    trips.push(trip);
  })

  return trips;
}

/**
 * Delete a trip.
 * TODO Need to also delete the documents in its subcollections too.
 */
async function deleteTrip(tripId) {
  await deleteDoc(doc(db, "trips", tripId));
}

//#region Sample Data

/**
 * Load a sample trip
 * @param {AbortController} signal - Allows for aborting
 * @param {boolean} duplicate - Whether or not to duplicate the trip,
 * which is useful for layout purposes. Duplicated trips
 * get a random name and timestamp.
 * @returns 
 */
async function loadSampleTrip(signal, duplicate = false) {
  let trips = [];

  let trip = (await import("../../data/sample-trip.json")).default;

  let alphabet = "amcdnopbefghijkl";

  trips.push(trip);

  if (duplicate) {
    for (let i = 0; i < 10; i++) {
      let tripClone = { ...trip };
      tripClone.title = alphabet[i] + "-trip";
      tripClone.lastAccessed = Date.now() + 176670000 * i;
      tripClone.id = i + 1;
      trips.push(tripClone);
    }
  }


  if (signal.aborted) {
    return Promise.reject(new Error("The request was cancelled early."));
  }

  return Promise.resolve(trips);
}


async function loadSampleProjectData(tripId, signal) {
  let general;
  let days;
  let pois;
  let photos;

  if (tripId === MOCK_TRIP_ID) {
    general = (await import("../../data/sample-trip.json")).default;
    days = (await import("../../data/sample-days")).SAMPLE_DAYS_v2;
    pois = (await import("../../data/sample-pois")).default;
    photos = (await import("../../data/sample-photos")).default;
  }

  if (signal.aborted) {
    return Promise.reject(new Error("The request was cancelled early."));
  }

  return Promise.resolve({
    general,
    days,
    pois,
    photos,
  })
}

//#endregion


async function loadTripData(tripId, signal) {
  let tripData = {};

  let collectionNames = ["days", "pois", "photos"];

  if (signal.aborted) {
    return Promise.reject(new Error("The request was cancelled early."));
  }

  for (let name of collectionNames) {
    let docsArr = [];
    let subcolQuery = query(collection(db, "trips", tripId, name));

    let data = await getDocs(subcolQuery);

    if (!data.empty) {
      data.forEach((doc) => {
        let obj = {
          ref: doc.ref,
          ...doc.data(),
        };

        docsArr.push(obj);
      })
    }

    tripData[name] = docsArr;
  }

  let generalDoc = await getDoc(doc(db, "trips", tripId));

  tripData.general = generalDoc.data();

  tripData.tripId = tripId;

  return tripData;
}

/**
 * Adds data to a specific subcollection in the trip.
 * @param {*} collectionName 
 * @param {*} data 
 */
async function addTripData(tripId, collectionName, data, signal) {
  let subcol = collection(db, "trips", tripId, collectionName);


  if (signal.aborted) {
    return Promise.reject(new Error("Operation failed; request was cancelled."));
  }


  const docRef = await addDoc(subcol, data);

  console.log(`Data successfully added; can be seen at ${docRef.id}.`);

  return docRef;
}


/**
 * Edit a trip's data.
 * @param {*} data - Object containing data.
 * @param {*} ref - Reference to particular document in collection.
 * @param {*} signal - Signal for abort in case the request should be cancelled.
 * @returns 
 */
async function editTripData(
  data,
  ref,
  signal) {


  if (signal.aborted) {
    return Promise.reject(new Error("Operation failed; request was cancelled."));
  }

  debugger;

  // let subcol = collection(db, "trips", tripId, collectionName, ref);
  // const q = query(subcol, where(idAttr, "==", idVal), limit(1));
  // const querySnapshot = await getDocs(q);

  // console.log({data})
  ;
  await updateDoc(ref, data);

  console.log('Data successfully edited.');
}



async function addTripPhoto(tripId, file, path, signal) {
  if (signal.aborted) {
    return Promise.reject(new Error("Operation failed; request was cancelled."));
  }

  // (Moved this to AddPOI so we can have a way to identify the photo
  //  on firestore)
  ////const filepath = `trips/${tripId}/${uuidv4()}/${photo.path}`;


  const imgRef = ref(storage, path);

  // upload the photo and get the filepath.
  // Note -- either add BLOB property or use a base64 encoded string.
  const fileSnapshot = await uploadBytes(imgRef, file);
  const publicImageUrl = await getDownloadURL(imgRef);

  // // and then add photos to the firestore.
  // const photoObjForDoc = {
  //   poiId: photo.poiId,
  //   id: photo.id,
  //   path: publicImageUrl,
  //   storageUri: fileSnapshot.metadata.fullPath,
  //   description: photo.description
  // };

  const photoDataForDoc = {
    path: publicImageUrl,
    storageUri: fileSnapshot.metadata.fullPath
  };

  const docRef = await addTripData(tripId, "photos", photoDataForDoc, signal);

  return {ref: docRef, path: publicImageUrl};
}

export {
  loadSampleTrip,
  loadSampleProjectData,
  addTrip,
  addTripData,
  addTripPhoto,
  loadTrips,
  loadTripData,
  deleteTrip,
  editTripData
};