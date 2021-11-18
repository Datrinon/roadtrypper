import _ from 'lodash'

export const TRIP_ACTIONS = {
  LOAD: "load",
  EDIT: "edit"
};

//TODO
//Add / Edit / Remove should trigger an update for tripReducer.

export function tripReducer(state, action) {
  switch (action.type) {
    case 'load': {
      return action.payload;
    }
    case 'add': {
      const stateCopy = _.cloneDeep(state);
      const {type, fkname, fkid, ...values} = action.payload;

      const record = {
        [fkname]: fkid,
        id: stateCopy[type].length,
        ...values
      }

      stateCopy[type].push(record);

      return stateCopy;
    }
    case 'edit': {
      const stateCopy = _.cloneDeep(state);
      const {type, id, key, value} = action.payload;

      console.log(stateCopy);
      console.log ({type, id, key, value});
      
      // find does not make a duplicate, it gets reference to object.
      const item = stateCopy[type].find(record => record.id === id);
      
      item[key] = value;
      
      return stateCopy;
    }
    case 'move_poi': {
      // for moving POIs to another day.
      const stateCopy = _.cloneDeep(state);
      const { "id" : poiId, "newDay" : newDayOrder } = action.payload;
      debugger;

      const poi = stateCopy.pois.find(poi => poi.id === poiId);
      const day = stateCopy.days.find(day => day.order === newDayOrder);
      
      // find the last placed item of that day.
      const newPOIOrder = stateCopy.pois.reduce((max, poi) => {
        if (poi.dayId === day.id && poi.order > max) {
          max = poi.order;
        }
        return max;
      }, 0);

      // change the dayId of this poi
      poi.dayId = day.id;
      // place the poi at the end of the pois belonging to that day.
      poi.order = newPOIOrder + 1;
      
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