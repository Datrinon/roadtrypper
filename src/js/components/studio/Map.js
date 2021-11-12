import React, { useRef } from 'react';
import styled from 'styled-components';
import "../../../css/Map.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, FeatureGroup } from 'react-leaflet';

import L from "leaflet";
import LeafletControlGeocoder from './LeafletControlGeocoder';
import DayPins from './DayPins';

const LeafIcon = L.Icon.extend({
  options: {}
});

const greenIcon = new LeafIcon({
  iconUrl:
    `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000&chf=a,s,ee00FFFF`
});


const MapStyled = styled.div`
  height: 300px;
  width: 300px;
  border: 5px solid red;
`

function Map({ daysData }) {

  const masterFeatureGroup = useRef();

  function placeDayPOIPins() {

    return daysData.map((day, index) => {

      const icon = new LeafIcon({
        iconUrl:
          `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${day.color}&chf=a,s,ee00FFFF`
      });

      return (
        <DayPins key={index} pois={day.pois} icon={icon} />
      )
    });
  }

  return (
    <>
      <input placeholder="Click here to search a place..." />
      <MapStyled id="map" data-testid="map">
        <MapContainer center={[37.34051, -121.97365]} zoom={8} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup ref={masterFeatureGroup}>
            {placeDayPOIPins()}
          </FeatureGroup>
          <LeafletControlGeocoder />
        </MapContainer>
      </MapStyled>
    </>
  )
}

export default Map
