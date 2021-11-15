export const TRIP_ACTIONS = {
  LOAD: "load",
  EDIT: "edit"
};

export function tripReducer(state, action) {
  switch (action.type) {
    case 'load': {
      return action.payload;
    }
    case 'edit': {
      
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