/**
 * These functions manages the post-operations
 * after the dispatch of the app's reducer in Studio fires.
 */

const logger = (action) => {
  console.log("logger: ", action);
}

export default logger;