export const TRIP_DETAIL_ACTIONS = {
  SET: "set"
};

export function tripDetailsReducer(state, action) {
  switch (action.type) {
    case 'set': {
      return action.payload;
    }
    case 'initialLoad': {
      break;
    }
    default:
      break;
  }

  return state;
}

// ! ! !
// Note: Reducer should not have any side effects.
// Do not allow API / fetch calls inside of the reducer.
// That is not the right place.
// ! ! !