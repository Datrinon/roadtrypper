import React, { useEffect, useRef } from "react";

function useAbortController() {
  const signal = useRef(new AbortController());

  useEffect(() => {

    return () => signal.current.abort();
  }, []);

  return signal.current;
}

export default useAbortController;