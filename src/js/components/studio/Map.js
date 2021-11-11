import React from 'react';
import styled from 'styled-components';
import "../../../css/Map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const MapStyled = styled.div`
  height: 300px;
  width: 300px;
  border: 5px solid red;
`

function Map() {
  return (
    <MapStyled id="map" data-testid="map">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </MapStyled>
  )
}

export default Map
