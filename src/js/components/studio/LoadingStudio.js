import React, {useState, useEffect, useRef } from 'react'

import LoadingCar from "../../../data/Roadtrypper.png"

import * as lS from "./styled/LoadingStudio.style"

function LoadingStudio() {

  const [ellipses, setEllipses] = useState("");
  const intervalFuncId = useRef();

  useEffect(() => {
    
    intervalFuncId.current = setInterval(() => {
      setEllipses(prev => {
        if (prev === "...") {
          return "";
        } else {
          return prev + ".";
        }
      })
    }, 500)

    return () => {
      clearInterval(intervalFuncId.current);
    }
  }, []);

  return (
    <lS.LoadContainer>
      <lS.MovingCarBox>
        <lS.MovingCarImg
          src={LoadingCar}
          alt={"A loop of a moving car."} />
      </lS.MovingCarBox>
      <lS.LoadingTxt>
        Loading Trip{ellipses}
      </lS.LoadingTxt>
    </lS.LoadContainer>
  )
}

export default LoadingStudio
