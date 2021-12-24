import styled from "styled-components";


export const StudioBody = styled.main`
  display: grid;
  grid-template-areas:
  " header map "
  " general map "
  " add map "
  " days map ";
  grid-template-rows:    5% auto 5% 1fr;
  grid-template-columns: minmax(15%, 300px) auto;
  width: 100%;
  height: 100%;
`

export const HeaderWrapper = styled.div`

`

export const TripGeneral = styled.div`
  grid-area: general;
  max-width: 300px;
`
/* Map contains the sidebar too. */

export const AddOptions = styled.div`
  grid-area: add;
`

export const Days = styled.div`
  grid-area: days;
  border: 1px solid black;
  overflow-y: auto;
`

export const MapArea = styled.div`
  grid-area: map;
  position: relative;
`