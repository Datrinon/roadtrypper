import styled from 'styled-components';
import { color } from '../../styled/colors.style';

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
  background-color: white;
  position: -webkit-sticky;
  position: relative;
  top: 50%;
  width: fit-content;
  height: fit-content;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5em;
  border-radius: 5px;

  & .exit-container {
    height: 1em;
  }

  & .modal-exit-button {
    display: block;
    border: none;
    background-color: initial;
    font-size: 150%;
    float: right;
    font-weight: 600;
    font-stretch: expanded;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 300ms, color 300ms;

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
      color: rgb(34, 34, 34);
    }
  }

  & .modal-heading {
    font-size: 200%;
    font-weight: 600;
  }

  & .controls .confirm, .controls .cancel {
    all: unset;
    text-align: center;
    border-radius: 3px;
    background-color: #eeeeee;
    box-shadow: 0px 1px 1px 0px #0000002b;
    font-weight: 600;
    padding: 5px;
    margin: 3px;
    cursor: pointer;
    transition: all 300ms;

    &:hover:not([disabled]) {
      background-color: #f1f3f4;
      box-shadow: 0px 1px 2px 1px #0000002b;
    }

    &:active:not([disabled]) {
      background-color: #e6e6e6;
      box-shadow: inset 0px 2px 6px 1px #0000002b;
    }

    &:disabled {
      background-color: #bbbbbb;
      color: grey;
      cursor: default;
    }
  }

  & .controls .confirm {
    color: white;
    background-color: ${color.primary};

    
    &:hover:not([disabled]) {
      background-color: ${color.primaryHover};

    }

    &:active:not([disabled]) {
      background-color: ${color.primaryPress};
      box-shadow: inset 1px 2px 7px black;
    }
  }
`;
