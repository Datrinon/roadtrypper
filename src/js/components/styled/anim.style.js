import styled, { keyframes } from "styled-components";

export const unravelX = keyframes`
  0% {
    opacity: 0;
    transform: scaleX(0.5);
  }
  100% {
    opacity: 1.0;
    transform: scaleX(1.0);
  }
`

export const unravelY = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0.5);
  }
  100% {
    opacity: 1.0;
    transform: scaleY(1.0);
  }
`

export const appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1.0;
  }
`

export const expandWidth = keyframes`
  from {
    width: 1px;
  }
`