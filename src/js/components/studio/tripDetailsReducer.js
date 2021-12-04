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
  // make a copy of the state before working with it.
  const stateCopy = _.cloneDeep(state);
  // and then update the accessed time.
  if (stateCopy !== null) {
    stateCopy.general.lastAccessed = Date.now();
  }


  switch (action.type) {
    case 'init': {
      return action.payload;
    }
    case 'edit_general': {
      
      let { key, value } = action.payload;

      stateCopy.general[key] = value;

      return stateCopy;
    }
    case 'add_poi': {
      
      let { dayId, photos, order, title, description, ...values} = action.payload;

      let poiId = findGreatestId(stateCopy.pois);

      // assign default title
      if (title.length === 0) {
        title = "Untitled POI";
      }

      let record = {
          dayId,
          id: poiId,
          order,
          title,
          description,
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
      
      const { type, id, key, value } = action.payload;

      console.log(stateCopy);
      console.log({ type, id, key, value });

      // find does not make a duplicate, it gets reference to object.
      const item = stateCopy[type].find(record => record.id === id);

      item[key] = value;

      return stateCopy;
    }
    // for moving POIs to another day.
    case 'move_poi': {
      
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
    // rearrange a POI or day. provide the type, id, new value to move to,
    // and the FK to categorize records (if any).
    case 'rearrange' : {
      
      const { type, id, newOrder, fk } = action.payload;

      const table = stateCopy[type];
      const record = table.find(item => item.id === id);

      let existingRecordWithMatchingOrder;
      
      if (fk) {
        existingRecordWithMatchingOrder = table.find(item => (
          item[fk] === record[fk] && item.order === newOrder
        ));
      } else {
        existingRecordWithMatchingOrder = table.find(item => (
          item.order === newOrder
        ));
      }

      existingRecordWithMatchingOrder.order = record.order; // assign this old order
      record.order = newOrder; // give this the new order value.

      return stateCopy;
    }
    case 'delete': {
      
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