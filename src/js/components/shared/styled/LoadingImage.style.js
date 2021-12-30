import styled, { keyframes } from "styled-components";

const loading = keyframes`
  to {
    background-color: #eee;
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
  background-color: #bbb;
  animation: ${loading} 1.5s linear infinite alternate;

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