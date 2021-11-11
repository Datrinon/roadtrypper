import React from 'react';
import styled from 'styled-components';
import "../../../css/Map.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import L from "leaflet";
import LeafletControlGeocoder from './LeafletControlGeocoder';

const MapStyled = styled.div`
  height: 300px;
  width: 300px;
  border: 5px solid red;
`

function Map() {

  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
  });
  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
  });

  return (
    <>
      <input placeholder="Click here to search a place..." />
      <MapStyled id="map" data-testid="map">
        <MapContainer center={[37.34051, -121.97365]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[37.347, -121.97365]} icon={greenIcon}>
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent={true}>
              Permanent Tooltip.
            </Tooltip>
          </Marker>
        <LeafletControlGeocoder />
        </MapContainer>
      </MapStyled>
    </>
  )
}

export default Map
