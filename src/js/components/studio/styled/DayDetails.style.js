import styled from "styled-components";
import { DivWithCustomScroll } from "./Studio.styled";



export const dayColorContainer = styled.div`
  position: relative;
  top: 5px;
`

export const dayColorLabel = styled.label`
  & span {
    font-variant-caps: all-petite-caps;
  }
`

export const dayColorInput = styled.input`
  opacity: 0;
  width: 1px;
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;
`

export const dayColorPin = styled.div`
  background-color: ${props => `#${props.color}`};
  width: 32px;
  height: 32px;
  display: block;
  transition: background-color 300ms box-shadow 600ms;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 1px 2px 1px #b9b4b4;
  border: 1px solid #070707;
  margin: 0 auto;

  &:hover {
    box-shadow: inset 0 0 10px 0px #ffffff94;
  }
`

export const DayBodyHeading = styled.header`
    display: grid;
    grid-template-areas: "order color"
"title title";
    grid-template-rows: 70% 30%;
    grid-template-columns: 70% 30%;
    height: 10%;

  & .order {
    grid-area: order;
    align-self: center;
  }

  & .title {
    grid-area: title;
    
  }

  & .color {
    grid-area: color;
    justify-self: center;
    align-self: end;
  }
`

export const POICardContainer = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */

  overflow-y: scroll;
  border: 1px solid fuchsia;

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

  & .add-Poi {
    width: 50%;
    padding: 2px 6px;
    margin: 8px auto;
    display: block;
  }
`

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #bcbcbc;
    color: #565656;
    overflow: visible;
    text-align: center;
    height: 5px;
    margin: 15px 15% 0 15%;

/* &:after {
    background: #fff;
    content: '§';
    padding: 0 4px;
    position: relative;
    top: -10px;
} */
`

export const POICardsSection = styled.div`
  /* border: 2px solid black; */
  flex: 1 1 auto;
  height: 85%;
`

// TODO
// ! In another release...
// Fix this guesswork with the height %s, replace with a less specific solution.

export const DayContents = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
`

export const POICardsContainer = styled(DivWithCustomScroll)`
  overflow-y: auto;
  height: 89%;
`
