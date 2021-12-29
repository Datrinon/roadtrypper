import styled from 'styled-components';
import { DayOrder, DayTitle } from './Details.style';

export const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
`
export const EditModeInput = styled.input`
  display: block;
`

export const EditModeTextBox = styled.textarea`
  display: block;
`

export const Modal = styled.div`
  border: 1px solid lime;
`

export const ToggleVisibilityDiv = styled.div`
  display: ${props => props.visible ? "block" : "none"};
`

export const POIHeadingInfo = styled.div`
  display: grid;
  grid-template-areas:
   "title title"
   "dayNum location"
   "dayTitle location";
  border: 1px solid black;
  height: 200px;
  width: 100%;
  grid-template-rows: 50% 25% 25%;
  grid-template-columns: 70% 30%;

   & .poi-title {
    grid-area: title;
    align-self: center;
   }

   & .day-title {
    grid-area: dayTitle;
   } 

   & .day-num {
    grid-area: dayNum;
   }

   & .poi-order {
    grid-area: location;
   }
`

// POI title styling (display mode).
export const POITitleDisplay = styled.h3`
  width: 100%;
  text-align: start;
  font-size: 2.5rem;
  font-weight: 300;
`

// Day Numbering display
export const POIDayOrder = styled(DayOrder)`
  margin: 0;
  font-size: 150%;
  font-weight: 500;
`

// Day title display
export const POIDayTitle = styled(DayTitle)`
  margin: 0;
  font-size: 125%;
  font-weight: 500;
`

export const POIDayTitleNone = styled(POIDayTitle)``


// POI Order display
export const POIOrderDisplay = styled.p`
  width: 100%;
  text-align: center;
  & .location-label {
    font-variant: all-petite-caps;
  }
`