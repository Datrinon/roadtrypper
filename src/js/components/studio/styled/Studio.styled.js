import styled from "styled-components";


export const StudioBody = styled.main`
  display: grid;
  grid-template-areas:
  " general blank "
  " add blank "
  " days map ";
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
`

export const MapArea = styled.div`
  grid-area: mapArea;
`