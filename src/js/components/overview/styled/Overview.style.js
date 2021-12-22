import styled from "styled-components";
import { Header } from "../../styled/template.style";

export const OverviewHeader = styled(Header)`
  justify-content: space-evenly;
  position: relative;
`

export const HeaderContent = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
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

export const HeaderGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  @supports not (gap: 1em) {

  }
`