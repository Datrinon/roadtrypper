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
  grid-template-columns: 25% auto 50px;
  margin: 0 auto;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  gap: 1em 4px;
`

export const TripCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 710px;
  justify-content: flex-start;
  gap: 30px;
  margin: 0 auto;
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
  bottom: 15px;
  right: 15px;
  padding: 25px 24px;
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