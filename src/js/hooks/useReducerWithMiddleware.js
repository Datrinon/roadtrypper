import React, {useReducer, useEffect} from 'react'

/**
 * A modified version of useReducer hook which in any dispatch call also
 * invokes a given middleware function
 * 
 * @credits to Robin Wieruch for writing this hook.
 */
function useReducerWithMiddleware(
  reducer,
  initialState,
  middlewareFns,
  afterwareFns
) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const actionRef = React.useRef();


  function dispatchWithMiddleware(action) {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action));
    
    actionRef.current = action;

    dispatch(action);
  }

  // given this dependency, this hook will always execute after
  // the state re-renders because arrays, being objects, always have different
  // references.
  useEffect(() => {
    // prevent the hook from executing on mount -- only on updates.
    if (!actionRef.current) return;

    console.log("in the chamber of use effect...");
    console.log(state);
    afterwareFns.forEach((afterwareFn) => afterwareFn(actionRef.current));

    actionRef.current = null;
  }, [afterwareFns]);

  return [state, dispatchWithMiddleware];
}

export default useReducerWithMiddleware;