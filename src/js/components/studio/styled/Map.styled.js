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
    all: unset;
    position: absolute;
    top: 11px;
    left: 60px;
    z-index: 99999;
    background: white;
    padding: 7px;
    border-radius: 5px;
    font-size: 75%;
    font-weight: 600;
    box-shadow: 0px 0px 3px 0px black;
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