import { MapContainer } from "react-leaflet";
import styled from "styled-components";

export const MapStyle = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
`

export const StyledMapContainer = styled(MapContainer)`
  height: 100%;
`

export const OverviewButton = styled.button`
    all: unset;
    position: absolute;
    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 1em;
    border-radius: 5px;
    font-size: 75%;
    font-weight: 600;
    box-shadow: 0px 0px 3px 0px black;
    z-index: 2;
    cursor: pointer;

    &:hover:not([disabled]) {
      background-color: #eeeeee;
    }

    &:disabled {
      background-color: #dedede;
      color: #939393;
      cursor: default;
    }
`