/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */

/**
 * Updates the database based on the taken action.
 * @param {object} state - the state object, with pre and post conditions.
 * pre would be equivalent to what the database currently has on file,
 * and post is what the application currently possesses. 
 * Our goal is to keep both of these in synchronization.
 * @param {object} action - the action object sent to the dispatch.
 */
function updateDatabase(state, action) {
  console.log({state, action});
}

const logger = (action) => {
  console.log("logger: ", action);
}

export default updateDatabase;