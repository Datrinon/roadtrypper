import styled from "styled-components";

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
    /* padding-bottom: 15px;
    border-bottom: 1px solid #dedede; */
  /* & > div {
    border: 1px solid red;
  } */

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
  display: flex;
  flex-direction: column;
  align-items: center;

  & .add-Poi {
    width: 80%;
    padding: 8px;
    margin: 8px auto;
    display: block;
  }
`

export const fightclubhr = styled.hr`
    border: none;
    border-top: 3px double #ababab;
    color: #565656;
    overflow: visible;
    text-align: center;
    height: 5px;
    margin: 25px 25% 0 25%;

&:after {
    background: #fff;
    content: '§';
    padding: 0 4px;
    position: relative;
    top: -10px;
}


`