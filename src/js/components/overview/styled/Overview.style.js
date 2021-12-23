import styled from "styled-components";
import { appear } from "../../styled/anim.style";
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
  justify-content: flex-start;
  gap: 30px;
  @supports not (gap: 1em) {
    margin-left: 25px;
    margin-right: 25px;
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
    bottom: 15px;
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
  transition: all 150ms;
  font-variant: all-petite-caps;
  border: 1px solid black;
  border-radius: 3px;
  margin: 0 5px;
  padding: 0 3px;
  background-color: #dddddd;

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

