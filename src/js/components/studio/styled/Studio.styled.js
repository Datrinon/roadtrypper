import styled from "styled-components";
import { device } from "../../styled/breakpoints.style";

// v1
// export const StudioBody = styled.main`
//   display: grid;
//   grid-template-areas:
//   " header map "
//   " general map "
//   " add map "
//   " days map ";
//   grid-template-rows: 50px 80px 40px auto;
//   /* 5% 10% 5% 80%;  This doesn't restrict height to 100%.*/
//   grid-template-columns: minmax(15%, 300px) auto;
//   width: 100%;
//   height: 100%;
//   /* overflow: hidden; */
// `

/*
v2
  display: grid;
  grid-template-areas:
  " header "
  " general "
  " add "
  " days ";
  grid-template-rows: 50px 80px 40px auto;
  grid-template-columns: 300px;
*/

export const StudioBody = styled.main`
  position: relative;
`

export const PrimarySidebar = styled.main`
  display: grid;
  grid-template-areas:
  " header"
  " general"
  " add"
  " days";
  grid-template-rows: 50px 80px 40px auto;
  grid-template-columns: 225px;
  position: absolute;
  background-color: white;
  z-index: 2;
  height: 100%;
  left: ${props => props.collapsed ? "-225px" : "0"};
  box-shadow: -1px 0px 6px 2px #69676785;
  transition: left 300ms;

  @media ${device.tablet} {
    grid-template-columns: 300px;
    left: ${props => props.collapsed ? "-300px" : "0"};
  }

  & .collapse-button {
    all: unset;
    display: block;
    width: 16px;
    height: 64px;
    background-color: white;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    position: absolute;
    left: 100%;
    bottom: 46%;
    cursor: pointer;
    box-shadow: 4px 0px 4px 1px #6967673d;

    & .icon {
      position: relative;
      right: 3px;
      font-size: 1.00em;
      color: #545454;
    }
  }
`

export const MapArea = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  border-left: 1px solid #dedede;
  z-index: 1;

  /* &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -1px;
    height: 100%;
    width: 1px;
    background-color: transparent;
    box-shadow: 1px -1px 3px 0px #00000066;
    z-index: 99;
  } */
`


export const HeaderWrapper = styled.div`
  grid-area: header;
`

export const TripGeneral = styled.div`
  grid-area: general;
  max-width: 300px;
`
/* Map contains the sidebar too. */

export const AddOptions = styled.div`
  grid-area: add;
  display: flex;
  justify-content: space-evenly;
  /* margin: 8px 0; */
  padding: 5px 0;
  border-bottom: 1px solid #dedede;
`


export const DayHeading = styled.h1`
  text-align: center;
  margin: 8px auto;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 80%;
  font-style: italic;
`


export const Days = styled.div`
  grid-area: days;
  overflow: hidden;
`

export const DayCardSectionHeading = styled.h1`
  /* text-align: center;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 80%;
  font-style: italic;
  font-family: "tw cen mt"; */
  margin: 8px auto;
  font-size: 125%;
  text-align: center;
  font-variant: all-small-caps;
  padding-bottom: 5px;
  text-shadow: 1px 1px 11px #cfcfcf;
  letter-spacing: 1px;
  height: 3%;
`

export const DivWithCustomScroll = styled.div`
  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: darkgrey; 
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #b30000; 
  }
`

export const DayCardContainer = styled(DivWithCustomScroll)`
  overflow-y: auto;
  height: 95%;
`

