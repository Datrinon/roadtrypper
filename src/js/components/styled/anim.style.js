import styled, { keyframes } from "styled-components";

export const unravel = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0.5);
  }
  100% {
    opacity: 1.0;
    transform: scaleY(1.0);
  }
`