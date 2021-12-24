import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import "../../../css/Map.css";
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';

import L from "leaflet";
import DayPins from './DayPins';

// Try using this plugin instead because LCG cannot be separated from the map.
// import LeafletControlGeocoder from './LeafletControlGeocoder';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-geosearch/dist/geosearch.umd";
import * as GeoSearch from 'leaflet-geosearch';
import { MapInstance } from './Studio';

import * as mS from "./styled/Map.styled";

const LeafIcon = L.Icon.extend({
  options: {}
});

const greenIcon = new LeafIcon({
  iconUrl:
    `https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000&chf=a,s,ee00FFFF`
});


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
          key={day.id}
          pois={pois}
          icon={icon}
          day={day}
          mapRef={mapRef}
          setActivePin={setActivePin}
          />
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
    // if data.days / data.pois is non-existent or length is 0, default to NY coordinates.
    if ((!data.days || !data.pois) 
    || (data.days.length === 0 || data.pois.length === 0)) {
      return [40.730610, -73.935242];
    }
    
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

    mapRef.current.addControl(search);
  }

  return (
    <>
      <mS.OverviewButton
        onClick={showOverview}
        disabled={data.pois.length === 0}>
          See Overview
      </mS.OverviewButton>
      <mS.MapStyle id="map" data-testid="map">
        <mS.StyledMapContainer
          whenCreated={whenMapCreated}
          // defaults to NYC if there aren't any coordinates placed.
          center={data.pois.length !== 0 ? calcCoordinateAverage() : [40.730610, -73.935242]}
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
        </mS.StyledMapContainer>
      </mS.MapStyle>
    </>
  )
}

export default Map
