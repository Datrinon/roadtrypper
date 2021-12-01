import _ from 'lodash'

export const TRIP_ACTIONS = {
  LOAD: "load",
  EDIT: "edit"
};

//TODO
//Add / Edit / Remove should trigger an timestamp update for tripReducer.
function findGreatestId(table) {
  let id = table.reduce((greatestId, item) => {
    if (item.id > greatestId) {
      return item.id;
    } else {
      return greatestId;
    }
  }, -1);

  id += 1;

  return id;
}


export function tripReducer(state, action) {
  switch (action.type) {
    case 'load': {
      return action.payload;
    }
    case 'add_poi': {
      const stateCopy = _.cloneDeep(state);
      const { dayId, photos, order,  ...values} = action.payload;

      let poiId = findGreatestId(stateCopy.pois);

      let record = {
          dayId,
          id: poiId,
          order,
          ...values
      };

      // deal with order here.
      // any poi on the same day that has an order >= to the one we chose,
      // we want to increment by one to make space for it.
      stateCopy.pois.forEach(poi => {
        if (poi.dayId === dayId && poi.order >= order) {
          poi.order += 1;
        }
      });

      stateCopy.pois.push(record);

      console.log({photos});

      // now add the photos here too.
      if (photos !== null && photos !== undefined) {
        let startingPhotoId = findGreatestId(stateCopy.photos);

        photos.forEach((photo, index) => {          
          stateCopy.photos.push({
            id: startingPhotoId + index,
            description: photo.description,
            path: photo.path,
            poiId
          });
        });
      }

      return stateCopy;
    }
    case 'add': {
      const stateCopy = _.cloneDeep(state);
      const { type, fkname, fkid, ...values } = action.payload;

      let id = findGreatestId(stateCopy[type]);

      let record;
      if (fkid === null || fkid === undefined) {
        record = {
          id,
          ...values
        };
      } else {
        record = {
          [fkname]: fkid,
          id,
          ...values
        };
      }

      stateCopy[type].push(record);

      return stateCopy;
    }
    case 'edit': {
      const stateCopy = _.cloneDeep(state);
      const { type, id, key, value } = action.payload;

      console.log(stateCopy);
      console.log({ type, id, key, value });

      // find does not make a duplicate, it gets reference to object.
      const item = stateCopy[type].find(record => record.id === id);

      item[key] = value;

      return stateCopy;
    }
    // ! TODO
    // Could be useful for other move operations outside of the POI.
    case 'move_poi': {
      // for moving POIs to another day.
      const stateCopy = _.cloneDeep(state);
      const { "id": poiId, "newDay": newDayOrder } = action.payload;

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
      poi.order = newPOIOrder === 0 ? 0 : newPOIOrder + 1;

      return stateCopy;
    }
    case 'rearrange_poi': {
      const stateCopy = _.cloneDeep(state);
      const { "id": poiId, "newOrder": newPoiOrder } = action.payload;

      const poi = stateCopy.pois.find(poi => poi.id === poiId);
      const poiWithNewOrder = stateCopy.pois.find(newPoi => (
        newPoi.dayId === poi.dayId && newPoi.order === newPoiOrder
        ));

      poiWithNewOrder.order = poi.order; // assign this the old order
      poi.order = newPoiOrder; // give ours the new order

      return stateCopy;
    }
    case 'delete': {
      const stateCopy = _.cloneDeep(state);
      const { type, id } = action.payload;

      const deleteIndex = stateCopy[type].findIndex(record => record.id === id);

      stateCopy[type].splice(deleteIndex, 1);

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