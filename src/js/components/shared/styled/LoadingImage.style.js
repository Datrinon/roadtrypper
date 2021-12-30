import styled, { keyframes } from "styled-components";

const loading = keyframes`
  to {
    background-position: 315px 0, 0 0, 0 190px, 50px 195px;
  }
`;

const rotating = keyframes`
  from {
    transform: translateY(-50%) rotate(0);
  }
  to {
    transform: translateY(-50%) rotate(360deg);
  }
`

export const LoadingImgContainer = styled.div`
  background:
  linear-gradient(0.25turn, transparent, #fff, transparent),
  linear-gradient(#eee, #eee),
  radial-gradient(38px circle at 19px 19px, #eee 50%, transparent 51%),
  linear-gradient(#eee, #eee);
  background-repeat: no-repeat;
  background-size: 315px 250px, 315px 180px, 100px 100px, 225px;
  animation: ${loading} 1.5s infinite;

  height: 100%;

  & .faImage {
    display: block;
    margin: 0 auto;
    position: relative;
    top: 50%;
    /* bottom: 25%; */
    font-size: 2.25em;
    animation: ${rotating} 2s linear infinite;
  }
`