import styled, { keyframes } from "styled-components";

const hover = keyframes`
  0% {
    transform: translateY(-2px);
  }
  25% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(-2px);
  }
  75% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
  
`

const appear = keyframes`
  0%{
    opacity: 0;
  }
  100% {
    opacity: 1.0;
  }
`

const pulse = keyframes`
  0% {
    box-shadow: inset 0px 0px 16px 4px #eeff6a;
  }
  100% {
    box-shadow: inset 0px 0px 16px 20px #e7e7e7;
  }
`

export const LoadContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${appear} 150ms;
`

export const MovingCarBox = styled.div`
    min-width: 200px;
    width: 200px;
    max-width: 50vw;
    padding: 2px;
    border-radius: 50%;
    animation: ${pulse} 1.5s ease-in-out infinite alternate;    
`

export const MovingCarImg = styled.img`
  width: 100%;
  position: relative;
  z-index: -1;
`

export const LoadingTxt = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 15px auto;
  width: fit-content;
  animation: ${hover} 5s ease-in-out infinite alternate;    
`