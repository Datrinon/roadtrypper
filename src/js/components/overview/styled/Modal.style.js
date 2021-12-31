import styled from 'styled-components';

export const ModalBG = styled.div`
  display: ${props => props.visible ? "block" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: rgba(0,0,0,0.75);
`

export const ModalHeader = styled.h1`
  border: 1px solid black;
`;
export const ModalContainer = styled.div`
  border: 1px solid lime;
  background-color: white;
  position: -webkit-sticky;
  position: relative;
  top: 50%;
  width: fit-content;
  height: fit-content;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ModalBody = styled.div`
  border: 1px solid fuchsia;
`;
