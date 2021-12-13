/* eslint-disable no-loop-func */
import _ from 'lodash'
import DATA_SCHEMA from '../../model/data-hierarchy';


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

function getIndexWithGreatestOrder(table) {
  let order = table.reduce((greatestOrder, item) => {
    if (item.order > greatestOrder) {
      return item.order;
    } else {
      return greatestOrder;
    }
  }, -1);

  return table.findIndex(item => item.order === order);
}

function deleteItem(stateCopy, action) {
  const t0 = performance.now();

  const { type, id } = action.payload;
  let typesToReorder = [];

  // first, delete the record.
  const deleteIndex = stateCopy[type].findIndex(record => record.id === id);

  // does it need to be reordered? Yes if not the end of the array
  // and the item of that array has an order attribute
  // we need to also get the parent key to narrow each categorization.
  if (deleteIndex !== stateCopy[type].length - 1
    && stateCopy[type][deleteIndex].order !== undefined) {

    let parentKey = DATA_SCHEMA[type].parentKey;
    let parentKeyVals = [];

    if (parentKey) {
      parentKeyVals.push(stateCopy[type][deleteIndex][parentKey]);
    }

    typesToReorder.push({
      type,
      parentKey,
      parentKeyVals,
    });
  }

  stateCopy[type].splice(deleteIndex, 1);

  // now we need to recursively delete anything else containing that id as
  // a foreign key.
  // we go down the tree if there's actually a child branch.
  let child = DATA_SCHEMA[type].child;
  let idsToDelete = [id];

  while (child !== null) {
    // get the name of the parent key in that object.
    let parentKey = DATA_SCHEMA[child].parentKey;

    let deletedChildrenIds = [];

    for (let id of idsToDelete) {
      // then we run a filter to get all items with IDs that aren't that,
      // effectively eliminating the entries with id.
      let tableLength = stateCopy[child].length;

      let result = stateCopy[child].filter((item, index) => {
        if (item[parentKey] !== id) {
          return true;
        }

        deletedChildrenIds.push(item.id);

        // add to reorder if the item.id is not the end of the array.
        if (index !== tableLength - 1) {
          let parentKey = DATA_SCHEMA[child].parentKey;
          let parentKeyVals = [];

          if (parentKey) {
            parentKeyVals.push(stateCopy[child][index][parentKey]);
          }

          typesToReorder.push({
            type : child,
            parentKey,
            parentKeyVals,
          });
        }

        return false;
      });

      // assign that result to the table now.
      stateCopy[child] = result;
    }

    // now get the child of this child.
    child = DATA_SCHEMA[child].child;
    // assign the children ids to the idsToDelete variable,
    // as we do not want to keep any descendants associated with these children.
    idsToDelete = deletedChildrenIds;

    // repeat until null to delete.
  }

  // filter out duplicate objects
  let inSet = [];
  let typesSet = [];
  for (let i = 0; i < typesToReorder.length; i++) {
    if (inSet.includes(typesToReorder.type)) {
      continue;
    } else {
      inSet.push(typesToReorder.type);
      typesSet.push(typesToReorder[i]);
    }
  }

  typesToReorder = typesSet;

  for (let attr of typesToReorder) {
    // use reduce to group each of these items by their parentKey.

    if (attr.parentKey) {
      const groups = [];

      for (let i = 0; i < attr.parentKeyVals; i++) {
        let group =
          stateCopy[attr.type]
            .filter(item => item[attr.parentKey] === attr.parentKeyVals[i]);

        groups.push(group);
      }

      // ? Ideally, I don't have to do anything since these items
      // ? maintain their original references.
      groups.forEach(group => {
        group
          .sort((itemA, itemB) => itemA.order - itemB.order)
          .forEach((item, index) => {
            item.order = index;
          })
      })

      // for each of these groups, sort their items.
    } else {
      // no parent key? in this case we just can sort directly
      // sort each of these
      stateCopy[type].sort((itemA, itemB) => itemA.order - itemB.order);
      // Needs to account for foreign key differences.
      // use hierarchy...
      for (let i = 0; i < stateCopy[type].length; i++) {
        stateCopy[type][i].order = i;
      }
    }
  }

  const t1 = performance.now();

  console.log("TIME TO DELETE: " + (t1 - t0));

  return stateCopy;
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

      let { dayId, photos, order, title, description, ...values } = action.payload;

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

      console.log({ photos });

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

      if (values.order !== null && values.order !== undefined) {
        // we can take that order to 
        // get the index of any existing item
        // and then splice.
        let index = stateCopy[type].findIndex(item => item.order === values.order);

        // none were found, so we just add it to the end of the array.
        if (index === -1) {
          index = stateCopy[type].length;
        }

        stateCopy[type].splice(index, 0, record);

        // now, use a for loop to increment each subsequent item's order by 1.
        // start on current index plus one.
        for (let i = index + 1; i < stateCopy[type].length; i++) {
          console.log(i);
          stateCopy[type][i].order += 1;
        }

      } else {
        // otherwise just push it to end.
        stateCopy[type].push(record);
      }


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
    case 'rearrange': {

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
      return deleteItem(stateCopy, action);
    }
    case 'attach_ref': {
      const { type, id, ref } = action.payload;
      const item = stateCopy[type].find(item => item.id === id);

      item.ref = ref;

      return stateCopy;
    }
    case 'attach_ref_edit_photo_path': {
      // not only does this attach the ref but also edit the photo path.
      // added b/c of firestore.
      const { id, ref, path } = action.payload;
      const item = stateCopy['photos'].find(item => item.id === id);

      item.path = path;
      item.ref = ref;

      return stateCopy;
    }
    default:
      break;
  }

  return state;
}