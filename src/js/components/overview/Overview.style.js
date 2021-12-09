import styled from "styled-components";

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