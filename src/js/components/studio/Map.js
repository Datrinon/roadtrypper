import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import "../../../css/Map.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, FeatureGroup } from 'react-leaflet';

import L from "leaflet";
import DayPins from './DayPins';

// Try using this plugin instead because LCG cannot be separated from the map.
// import LeafletControlGeocoder from './LeafletControlGeocoder';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-geosearch/dist/geosearch.umd";
import * as GeoSearch from 'leaflet-geosearch';
import { MapInstance } from './Studio';

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
function Map({ data, setActivePin }) {

  const mapRef = React.useContext(MapInstance);
  const masterFeatureGroup = useRef();
  const [search, setSearch] = useState(new GeoSearch.GeoSearchControl({
    provider: new GeoSearch.OpenStreetMapProvider(),
  }));


  function placeDayPOIPins() {

    return data.days.map((day, index) => {

      const pois = data.pois.filter(poi => poi.dayId === day.id);

      const icon = new LeafIcon({
        iconUrl:
          `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${day.color}&chf=a,s,ee00FFFF`
      });

      return (
        <DayPins
          key={index}
          pois={pois}
          icon={icon}
          dayId={day.id}
          mapRef={mapRef}
          setActivePin={setActivePin} />
      )
    });
  }

  function showOverview() {
    // debugger;
    const map = mapRef.current;
    const group = masterFeatureGroup.current;
    map.flyToBounds(group.getBounds(), { padding: L.point(15, 15) });

  }

  function calcCoordinateAverage() {
    let numCoordinates = 0;
    let total = data.days.reduce((sum, day) => {

      const pois = data.pois.filter(poi => poi.dayId === day.id);

      let poi = pois.reduce((sum, poi) => {
        sum.lat += poi.coordinates[0];
        sum.long += poi.coordinates[1];

        numCoordinates += 1;

        return sum;
      }, { lat: 0, long: 0 });

      sum.lat += poi.lat;
      sum.long += poi.long;

      return sum;
    }, { lat: 0, long: 0 })

    total.lat = total.lat / numCoordinates;
    total.long = total.long / numCoordinates;
    console.log(total);

    return [total.lat, total.long];
  }

  function whenMapCreated(instance) {
    mapRef.current = instance;

    console.log(instance);

    mapRef.current.addControl(search);
  }

  return (
    <>
      <button onClick={showOverview}>See Overview</button>
      <MapStyled id="map" data-testid="map">
        <MapContainer
          whenCreated={whenMapCreated}
          // defaults to NYC if there aren't any coordinates placed.
          center={!!data.pois ? calcCoordinateAverage() : [40.730610, -73.935242]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup
            ref={masterFeatureGroup}>
            {placeDayPOIPins()}
          </FeatureGroup>
        </MapContainer>
      </MapStyled>
    </>
  )
}

export default Map
