import styled from "styled-components";
import { appear } from "../../styled/anim.style";
import { BaseButton } from "./StudioButtons.style";

/**
 * For elements of which DayDetails and POIDetails share.
 */

export const Heading = styled.h1`
  margin: 25px 5px;
  font-size: 125%;
  text-align: center;
  font-variant: all-small-caps;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 5px;
  text-shadow: 1px 1px 11px #cfcfcf;
  letter-spacing: 1px;
`

export const deleteItemButton = styled.button`
  all: unset;
  position: absolute;
  top: -5px;
  left: 0px;
  color: maroon;
  font-size: 90%;
  padding: 8px 4px;
  border-radius: 50%;
  transition: background-color 300ms;
  cursor: pointer;

  &:hover {
    background-color: #ff9a9a;
  }

  &:hover::after {
    position: absolute;
    content: attr(data-tip);
    font-variant-caps: all-small-caps;
    border-radius: 5px;
    background-color: rgb(45 45 45 / 90%);
    padding: 3px;
    color: beige;
    /* bottom: 15px; */
    top: calc(80% + 5px);
    left: calc(50% + 5px);
    /* width: 100%; */
    -webkit-animation: dMBcsj 300ms;
    animation: dMBcsj 300ms;
  }
`