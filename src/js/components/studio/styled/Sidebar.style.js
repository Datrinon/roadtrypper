import styled from "styled-components";
import { expandWidth } from "../../styled/anim.style";

export const SidebarContainer = styled.div`
  /* Need flex for the sidebar button. */
  display: ${props => props.visible ? "flex" : "none"};
  flex-direction: row;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  height: 100%;
  width: ${[props => props.collapsed ? "16px" : "325px"]};
  transition: width 300ms ease;
  animation: ${expandWidth} 300ms ease-out;
  overflow: hidden;
`

/**
 * This wrapper manages the width of the collapsible sidebar.
 * It also provides a box shadow.
 * 
 * It is separate from the container so that we can set a variable 
 * width on the container; such is necessary for managing the 
 */
export const SidebarContent = styled.div`
  width: 100%;
  box-shadow: -1px 0px 6px 2px #69676785;
  position: relative;
  background-color: white;
`

export const CollapseButton = styled.button`
  all: unset;
  width: 16px;
  height: 64px;
  background-color: white;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  align-self: center;
  box-shadow: -3px 0px 4px #a8a8a885;
  color: #545454;
  cursor: pointer;
  position: relative;
  z-index: 1;
  position: relative;
  top: 1px;
  margin-left: 1px;
`

export const CloseButton = styled.button`
  position: absolute;
  justify-self: end;
  right: -5px;
  z-index: 1;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25em;

  &:hover {
    background-color: #dedede;
    border-radius: 50%;
  }
`
