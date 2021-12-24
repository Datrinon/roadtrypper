import { MapContainer } from "react-leaflet";
import styled from "styled-components";

export const MapStyle = styled.div`
  height: 100%;
  width: 100%;
`

export const StyledMapContainer = styled(MapContainer)`
  height: 100%;
`

export const OverviewButton = styled.button`
  position: absolute;
  top: 0;
  z-index: 2;
`