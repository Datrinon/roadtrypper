import styled from "styled-components";


export const StudioBody = styled.main`
  display: grid;
  grid-template-areas:
  " header map "
  " general map "
  " add map "
  " days map ";
  grid-template-rows: 50px 80px 40px auto;
  grid-template-columns: minmax(15%, 300px) auto;
  width: 99%;
  height: 100%;
  border: 9px solid rebeccapurple;
  /* overflow: hidden; */
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
  overflow-y: scroll;
`

export const MapArea = styled.div`
  grid-area: map;
  position: relative;
  border-left: 1px solid #dedede;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -1px;
    height: 100%;
    width: 1px;
    background-color: transparent;
    box-shadow: 1px -1px 3px 0px #00000066;
    z-index: 99999;
  }
`