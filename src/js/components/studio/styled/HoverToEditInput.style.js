import styled from "styled-components";
import { BaseButton } from "./StudioButtons.style";

export const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    height: ${props => props.height ? `${props.height}px` : "auto"};
    flex-direction: row;
    align-items: center;
`

export const HoverEditButton = styled.button`
  all: unset;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  /* display: ${props => props.visible ? 'initial' : 'none'}; */
  cursor: pointer;
  color: #4285F4;
  border-radius: 50%;
  padding: ${props => props.visible ? '4px 6px' : '0px'};
  margin-left: ${props => props.visible ? '5px' : '0px'};
  width: ${props => props.visible ? '16px' : '1px'};
  height: 16px;

  &:hover {
    color: #75aaff;
    background-color: #e9f0fb;
  }

  /* &:hover::after {
    position: absolute;
    content: "Edit";
    font-variant-caps: all-small-caps;
    border-radius: 5px;
    background-color: rgb(45 45 45 / 68%);
    padding: 3px;
    color: beige;
    left: 100%;
    width: 100%;
  } */
`

export const EditModeOptions = styled.div`
  /* visibility: ${props => props.visible ? 'visible' : 'hidden'}; */

  display: ${props => props.visible ? 'inline' : 'none'};
`

export const EditModeOptionButton = styled(BaseButton)`
  margin: 0 5px;
  padding: 3px;
`

export const EditModeOptionButtonPrimary = styled(EditModeOptionButton)`
  color: white;
  background-color: hsl(217, 75%, 46%);

  &:hover:not([disabled]) {
    background-color: hsl(217, 75%, 66%);
  }

  &:active:not([disabled]) {
    background-color: hsl(217, 75%, 36%);
  }
`