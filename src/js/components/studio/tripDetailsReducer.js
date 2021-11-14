export const TRIP_DETAIL_ACTIONS = {
  EDIT: "edit"
};

export function tripDetailsReducer(setTrip, state, action) {
  switch (action.type) {
    case 'edit': {
      break;
    }
    default:
      break;
  }

  // Any time this reducer is called, we should update the last updated value
  // of the trip.
  setTrip(prevTrip => {
    return {
      ...prevTrip,
      "lastUpdated": Date.now()
    }
  })

  return state;
}

// ! ! !
// Note: Reducer should not have any side effects.
// Do not allow API / fetch calls inside of the reducer.
// That is not the right place.
// ! ! !