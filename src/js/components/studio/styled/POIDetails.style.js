import styled from 'styled-components';
import { Divider } from './DayDetails.style';
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
   "dayTitle dayTitle";
  width: 100%;
  grid-template-rows: auto 32px auto;
  grid-template-columns: 65% 35%;

   & .poi-title {
    grid-area: title;
    padding-bottom: 1em;
   }

   & .day-num {
    grid-area: dayNum;
    /* align-self: end; */
   }

   & .day-title {
    grid-area: dayTitle;
    /* align-self: top; */
   } 

   & .poi-order {
    grid-area: location;
   }
`

// POI title styling (display mode).
export const POITitleDisplay = styled.h3`
  width: 84%;
  text-align: start;
  font-size: 2.5rem;
  font-weight: 300;
  padding-left: 12px;
  /* height: 100%; */
  overflow: hidden;
  /* overflow-x: hidden; */
  text-overflow: ellipsis;
`

// Day Numbering display
export const POIDayOrder = styled(DayOrder)`
  padding-left: 12px;
  margin: 5px 0;
  font-size: 150%;
  font-weight: 500;
`

// Day title display
export const POIDayTitle = styled(DayTitle)`
  padding-left: 12px;
  margin: 0;
  font-size: 125%;
  font-weight: 500;
`

export const POIDayTitleNone = styled(POIDayTitle)`
`


// POI Order display
export const POIOrderDisplay = styled.p`
  padding-left: 12px;
  width: max-content;
  & .location-label {
    font-variant: all-petite-caps;
  }

  & .location-value {
    text-align: center;
    width: 100%;
    display: block;
  }
`

export const DescDivider = styled(Divider)``;

export const Desc = styled.p`
  padding: 12px;
`