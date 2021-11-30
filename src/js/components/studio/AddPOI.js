/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useContext, useEffect, useRef } from 'react'
import LocationInput from './LocationInput';
import { MapInstance, TripDispatch, TripContext } from './Studio';

import L from "leaflet";
import { getLIcon } from './LeafletIcon';


function NewPOIForm({ day }) {
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);

  // day state vars
  const [selDay, setSelDay] = useState(day);
  const [selDayPOIs, setSelDayPOIs] = useState([]);
  const [selPOIOrder, setSelPOIOrder] = useState(0);
  const [selDayPois, setSelDayPois] = useState([]);
  const [selPoiOrder, setSelPoiOrder] = useState(0);
  // poi state vars
  const [poiLoc, setPoiLoc] = useState("");
  // - keeps track of the poi Marker for convenience of user after saving.
  const mapRef = React.useContext(MapInstance);
  const poiMarker = useRef();
  const [poiTitle, setPoiTitle ] = useState("");

  //#region Day Information.
  function getLastOrderedDay() {
    return trip.days.reduce((latestDay, day) => {
      return day.order > latestDay.order ? day : latestDay;
    }, trip.days[0]);
  }

  function getGreatestOrder(max, poi) {
    if (poi.order > max) {
      return poi.order;
    } else {
      return max;
    }
  }

  function updatePOIData(day) {
  function updatePoiData(day) {
    let pois;
    let greatestPOIOrder;
    let greatestPoiOrder;

    pois = trip.pois.filter(poi => poi.dayId === day.id);

    greatestPOIOrder = pois.reduce(getGreatestOrder, 0);
    greatestPOIOrder = greatestPOIOrder === 0 ? 0 : greatestPOIOrder + 1;
    greatestPoiOrder = pois.reduce(getGreatestOrder, 0);
    greatestPoiOrder = greatestPoiOrder === 0 ? 0 : greatestPoiOrder + 1;

    setSelDayPOIs(pois);
    setSelPOIOrder(greatestPOIOrder);
    setSelDayPois(pois);
    setSelPoiOrder(greatestPoiOrder);
  }

  useEffect(() => {
    let lastDay;

    if (!selDay) {
      lastDay = getLastOrderedDay();

      setSelDay(lastDay);
    } else {
      lastDay = selDay;
    }

    updatePOIData(lastDay);
  }, []);

  useEffect(() => {
    if (selDay) {
      updatePOIData(selDay);
    }
  }, [selDay]);

  function onChangeDayOrder(e) {
    const day = trip.days.find(day => day.order === parseInt(e.target.value));
    console.log(day);
    setSelDay(day);
  }
  //#endregion

  //#region POI Information.
  function confirmLocation(result) {
    console.log(result);

    setPoiLoc(result.label);
    // need to add the POI marker.
    // needs to be same color as the day.
    const newPlaceIcon = getLIcon("ffffff");
    const placeNameText = result.label.split(", ")[0];

    // if the user confirmed this location but changed their minds, remove
    // the last placed marker.
    poiMarker.current?.remove();

    poiMarker.current = L.marker([result.y, result.x],
      {
        icon: newPlaceIcon,
        zIndexOffset: 1000,
        title: placeNameText
      });

    // tooltip displaying the name of the place.
    const placeName = L.tooltip({
      permanent: true,
      className: "poi-search-result"
    });
    placeName.setContent(placeNameText);

    poiMarker.current.bindTooltip(placeName).openTooltip();

    poiMarker.current.addTo(mapRef.current);
  }



  //#endregion

  function addNewPOI(e) {
    e.preventDefault();
  }

  function enumeratePOIOrderOptions() {
    const orders = selDayPOIs
      .sort((poiA, poiB) => poiA.order - poiB.order)
      .map(poi => {
        return <option
          key={poi.order}
          value={poi.order}>
          {poi.order + 1}
        </option>
      });

    return (<>
      {orders}
      <option value={selDayPOIs.length}>{selDayPOIs.length + 1}</option>
    </>)
  }

  return (
    <div>
      <h1>Adding POI</h1>
      <section>
        <h2>Day Information</h2>
        <label>
          For Day
          <select
            name="poi-day"
            id="poi-day-select"
            value={selDay?.order}
            onChange={onChangeDayOrder}>
            {
              trip.days.map((day, index) => {
                return <option
                  key={index}
                  value={index}>
                  {index + 1}
                </option>
              })
            }
          </select>
        </label>
        <label>
          Order in Day
          <select
            key={selPOIOrder}
            name="poi-order-in-day"
            id="poi-order-select"
            defaultValue={selPOIOrder}>
            {
              selDayPOIs.length !== 0 ?
                (enumeratePOIOrderOptions()) :
                (<option value={0}>1</option>)
            }
          </select>
        </label>
      </section>
      <section>
        <h2>POI Information</h2>
        <label>
          Location
          <input disabled placeholder="No Location Selected." value={poiLoc}></input>
        </label>
        <LocationInput onClickPOIMarker={confirmLocation} />
      </section>
    </div>
  )
}

function AddPOI({ sidebarSetter }) {
  function showAddPOI() {
    sidebarSetter.setContent(<NewPOIForm />);
    sidebarSetter.setVisible(true);
  }

  return (
    <button className="add-POI" type="button" onClick={showAddPOI}>Add POI</button>
  )
}

export default AddPOI
