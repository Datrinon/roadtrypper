// Sample Data
import { MOCK_TRIP_ID } from '../../data/sample-days';



async function loadProjectData(tripId, signal) {
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

export { loadProjectData };