import styled from "styled-components";

/**
 * Contains all stylings for buttons used in the trip studio (excluding the map).
 */

const BaseButton = styled.button`
  all: unset;
  text-align: center;
  border-radius: 3px;
  background-color: #eeeeee;
  box-shadow: 0px 1px 1px 0px #0000002b;
  font-weight: 600;
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
`

export const AddButton = styled(BaseButton)`
    /* border: 1px solid black; */
    /* padding: 5px 13px; */
    width: 46%;
    font-size: 80%;

  &:hover:not([disabled]) {

  }

  &:active:not([disabled]) {

  }

  &:disabled {

  }
`