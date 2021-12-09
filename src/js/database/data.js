// Sample Data
import { MOCK_TRIP_ID } from '../../data/sample-days';


/**
 * Load a sample trip
 * @param {AbortController} signal - Allows for aborting
 * @param {boolean} duplicate - Whether or not to duplicate the trip,
 * which is useful for layout purposes. Duplicated trips
 * get a random name and timestamp.
 * @returns 
 */
async function loadSampleTrip(signal, duplicate=false) {
  let trips = [];

  let trip = (await import("../../data/sample-trip.json")).default;

  let alphabet = "abcdefghijklmnop";

  trips.push(trip);

  if (duplicate) {
    for (let i = 0; i < 10; i++) {
      let tripClone = {...trip};
      tripClone.title = alphabet[i] + "-trip";
      tripClone.lastAccessed = Date.now() + 176670000 * i;
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

export { loadSampleTrip, loadSampleProjectData };