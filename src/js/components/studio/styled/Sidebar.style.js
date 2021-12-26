import styled from "styled-components";
import { expandWidth } from "../../styled/anim.style";

export const SidebarContainer = styled.div`
  display: ${props => props.visible ? "flex" : "none"};
  flex-direction: row;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  height: 100%;
  width: ${[props => props.collapsed ? "16px" : "325px"]};
  max-width: 33vw;
  transition: width 300ms ease;
  animation: ${expandWidth} 300ms ease-out;
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-shadow: -1px 0px 4px #a8a8a885;
  position: relative;
`

export const SidebarContent = styled.div`
  /* TODO debug this later with percentage height or just use vw. */
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: white;

  & .sidebar-contents {
    height: 100%;
  }
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
`

export const CloseButton = styled.button`
  position: absolute;
  justify-self: end;
  right: 0;

  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25em;

  &:hover {
    background-color: #dedede;
    border-radius: 50%;
  }
`
