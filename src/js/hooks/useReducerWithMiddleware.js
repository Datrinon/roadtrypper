import React, {useReducer, useEffect, useRef, useState} from 'react'

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const signal = useRef(new AbortController());
  // represents the state before dispatch call.
  const [preState, setPreState] = useState(state);

  const actionRef = useRef();


  function dispatchWithMiddleware(action) {
    setPreState(state);

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
    afterwareFns.forEach((afterwareFn) => afterwareFn(
      {
        pre: preState,
        post: state
      },
      actionRef.current,
      signal.current));

    actionRef.current = null;

    return () => {
      signal.current.abort();
    }
  }, [afterwareFns]);

  return [state, dispatchWithMiddleware];
}

export default useReducerWithMiddleware;