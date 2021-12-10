import React, {useReducer} from 'react'

/**
 * A modified version of useReducer hook which in any dispatch call also
 * invokes a given middleware function
 * 
 * @credits to Robin Wieruch for writing this hook.
 */
function useReducerWithMiddleware(
  reducer,
  initialState,
  middlewareFn
) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function dispatchWithMiddleware(action) {
    middlewareFn(action);
    dispatch(action);
  }

  return [state, dispatchWithMiddleware];
}

export default useReducerWithMiddleware;