import _ from 'lodash'

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
      const stateCopy = _.cloneDeep(state);
      const {type, id, key, value} = action.payload;
      console.log(stateCopy);
      console.log ({type, id, key, value});
      
      stateCopy[type][id][key] = value;
      
      return stateCopy;
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