import styled from 'styled-components';
import { Divider } from './DayDetails.style';
import { DayOrder, DayTitle, HeadingLv2 } from './Details.style';
import { BaseButton } from './StudioButtons.style';

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

export const POIHeadingLv3 = styled(HeadingLv2)`
  margin: 0;
  text-align: start;
  padding-left: 24px;
`

export const Desc = styled.textarea`
    padding: 12px;
    width: 85%;
    height: 400px;
    margin: 0 auto;
    display: block;
    border: 2px solid transparent;
    border-left: 1px solid black;
    font-family: inherit;
    font-size: 100%;
    resize: vertical;
    max-height: 45vh;
    min-height: 200px;

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

    &:focus {
      border-color: #54B4D3;
    }
`

export const POIPhotosHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`

export const POIPhotosContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const Thumbnail = styled.figure`
  border: 1px solid rgb(45, 45, 45);
  border-radius: 4px;
  width: 85px;
  height: 128px;
  margin-left: 8px;
  cursor: pointer;
  transition: border 300ms, transform 300ms;
  position: relative;
  z-index: 3;

  &:hover {
    border: 1px solid #54B4D3;
    transform: scale(1.05);
  }

  & button {
    all: unset;
    height: 100%;
  }

  & .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`

export const SeeAll = styled(BaseButton)`
  background-color: white;
  box-shadow: none;
  color: #54B4D3;

  &:hover:not([disabled]) {
    background-color: white;
    box-shadow: initial;
    text-shadow: 1px 1px 12px #92dff8;
  }
`;