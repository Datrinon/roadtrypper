import styled from "styled-components";
import { appear } from "../../styled/anim.style";
import { device } from "../../styled/breakpoints.style";
import { color } from "../../styled/colors.style";
import { Header } from "../../styled/template.style";


export const OverviewHeader = styled(Header)`
  justify-content: space-evenly;
  position: relative;
`

export const HeaderContent = styled.div`
  max-width: 800px;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  grid-template-columns: minmax(25%, 170px) auto 40px;
  margin: 0 auto;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  gap: 1em 4px;
`

export const TripCardContainer = styled.div`
  max-width: 710px;
  margin: 0 auto;

`

export const TripCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 10px;
  @supports not (gap: 1em) {
    margin-left: 25px;
    margin-right: 25px;
  }
  align-items: center;

  @media ${device.mobileL} {
    justify-content: flex-start;
  }
`

export const AddTripButton = styled.button`
  transition: background-color 300ms;
  all: unset;
  display: block;
  margin: 0 auto;
  position: fixed;
  bottom: 2vh;
  right: 5vw;
  padding: 25px 22px;
  border-radius: 50%;
  background-color: ${color.primary};
  box-shadow: 2px 3px 6px 1px #686868;
  color: white;

  cursor: pointer;

  &:hover {
    background-color: ${color.primaryHover};
  }

  &:hover::after {
    position: absolute;
    content: "Add a New Trip";
    font-variant-caps: all-small-caps;
    border-radius: 5px;
    background-color: rgb(45 45 45 / 68%);
    padding: 3px;
    color: beige;
    bottom: 0;
    right: calc(100% + 5px);
    width: 100%;
    animation: ${appear} 300ms;
  }
`

export const SortContainer = styled.div`
  margin: 5px;
  text-align: end;
`

export const SortButton = styled.button`
  all: unset;
  -webkit-transition: all 150ms;
  transition: all 150ms;
  font-variant: all-petite-caps;
  /* border: 1px solid black; */
  border-radius: 3px;
  margin: 0 5px;
  padding: 0 3px;
  color: #353535;
  background-color: #f9f9f9;
  box-shadow: 0px 1px 2px 0px #a9a9a9;
  cursor: pointer;

  & > .svg-inline--fa {
    width: 0.85rem;
  }

  & > span {
    position: relative;
    bottom: 3px;
  }

  &:hover {
    box-shadow: 0px 2px 5px 1px #9a9393;
    color: #434343;
  }
`


export const AddTripMessage = styled.p`
  position: absolute;
  bottom: 5%;
  left: 25%;
  right: 25%;
  text-align: center;
  font-size: 1.15em;
  padding: 12px 0;
  background-color: #000000c9;
  color: white;
  border-radius: 8px;
  animation: ${appear} 300ms;
`


export const TripCardHeading = styled.h1`
  margin: 0 10px;
  text-align: center;
  
  padding: 10px;
  font-variant-caps: all-petite-caps;
  font-weight: 300;
  font-size: 225%;
  border-bottom: 1px solid #494949;

  @media ${device.tablet} {
    margin: 15px auto;
  }
`


export const NoDataWarning = styled.p`
  font-style: italic;
  padding: 1em;
  max-width: 60vw;
  margin: 25% auto;
  width: fit-content;
  font-weight: 400;
  color: grey;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #ababab;
`