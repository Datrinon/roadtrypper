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
  grid-area: header;
`

export const TripGeneral = styled.div`
  grid-area: general;
  max-width: 300px;
`
/* Map contains the sidebar too. */

export const AddOptions = styled.div`
  grid-area: add;
  display: flex;
  justify-content: space-evenly;
  /* margin: 8px 0; */
  padding: 5px 0;
  border-bottom: 1px solid #dedede;
`

export const Days = styled.div`
  grid-area: days;
  overflow-y: auto;
`

export const MapArea = styled.div`
  grid-area: map;
  position: relative;
  box-shadow: 1px 1px 4px 0px black;
`