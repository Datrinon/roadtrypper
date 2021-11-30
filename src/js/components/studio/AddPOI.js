/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useContext, useEffect, useRef } from 'react'
import LocationInput from './LocationInput';
import { MapInstance, TripDispatch, TripContext } from './Studio';
import styled from 'styled-components';

import L from "leaflet";
import { getLIcon } from './LeafletIcon';
import CountingTextArea from './CountingTextArea';

const Label = styled.label`
  display: block;

  & > * {
    display: block;
  }
`

const HiddenFileInput = styled.input`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);

  &:focus + label {
    outline: thin dotted;
  }
  &:focus-within + label {
    outline: thin dotted;
  }
`

const Dropbox = styled.div`
  border: 1px solid blue;
  height: 50px;
  width: 50px;
`

function NewPoiForm({ day }) {
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);

  // day state vars
  const [selDay, setSelDay] = useState(day);
  const [selDayPois, setSelDayPois] = useState([]);
  const [selPoiOrder, setSelPoiOrder] = useState(0);
  // poi state vars
  const [poiLoc, setPoiLoc] = useState("");
  // - keeps track of the poi Marker for convenience of user after saving.
  const mapRef = React.useContext(MapInstance);
  const poiMarker = useRef();
  const [poiTitle, setPoiTitle] = useState("");
  const sameTitleCheckbox = useRef();
  // - desc
  const [poiDesc, setPoiDesc] = useState("");
  // - photos
  const [photos, setPhotos] = useState([]);
  const dropbox = useRef();
  const fileInputRef = useRef();

  console.log(photos); // ! HALO 
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

  function updatePoiData(day) {
    let pois;
    let greatestPoiOrder;

    pois = trip.pois.filter(poi => poi.dayId === day.id);

    greatestPoiOrder = pois.reduce(getGreatestOrder, 0);
    greatestPoiOrder = greatestPoiOrder === 0 ? 0 : greatestPoiOrder + 1;

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

    updatePoiData(lastDay);
  }, []);

  useEffect(() => {
    if (selDay) {
      updatePoiData(selDay);
    }
  }, [selDay]);

  function onChangeDayOrder(e) {
    const day = trip.days.find(day => day.order === parseInt(e.target.value));
    console.log(day);
    setSelDay(day);
  }
  //#endregion

  //#region Poi Information.
  function confirmLocation(result) {
    console.log(result);

    setPoiLoc(result.label);
    // need to add the Poi marker.
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

  function changePoiTitle(e) {
    setPoiTitle(e.target.value);
  }

  function autosetPoiTitle(e) {
    if (e.target.checked) {
      // set to location's name.
      setPoiTitle(poiLoc);
    } else {
      // reset Poi Title
      setPoiTitle("");
    }
  }

  // use this UE hook to sync the title and the location value, if checked.
  useEffect(() => {
    if (sameTitleCheckbox.current.checked) {
      setPoiTitle(poiLoc);
    }
  }, [poiLoc])

  function onChangePoiDesc(e) {
    setPoiDesc(e.target.value);
  }

  // use this UE hook to enable a dropzone.
  useEffect(() => {
    // upon entering the drop zone and dragging over the drop zone
    // we just need to disable the default action and prevent it from 
    // cascading.
    function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function drop(e) {
      e.stopPropagation();
      e.preventDefault();

      const dt = e.dataTransfer;
      const files = dt.files;

      console.log(files);

      handleFiles(files);
    }

    dropbox.current.addEventListener("dragenter", dragenter, false);
    dropbox.current.addEventListener("dragover", dragover, false);
    dropbox.current.addEventListener("drop", drop, false);
  }, []);

  function handleFiles(files) {
    setPhotos(prevPhotoSet => {
      for (let i = 0; i < files.length; i++) {
        prevPhotoSet.push(files[i]);
      }

      console.log(prevPhotoSet);

      return prevPhotoSet;
    })
  }

  useEffect(() => {
    console.log(photos);
    //
  }, [photos.length]);

  //#endregion

  function addNewPoi(e) {
    e.preventDefault();
    // photos only show up after a re-render of the state.
  }

  /**
   * Lists the possible options for the order setting of a POI given the selected day.
   */
  function enumeratePoiOrderOptions() {
    const orders = selDayPois
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
      <option value={selDayPois.length}>{selDayPois.length + 1}</option>
    </>)
  }

  function fileInputChange() {

  }

  return (
    <div>
      <h1>Adding Poi</h1>
      <section>
        <h2>Day Information</h2>
        <Label>
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
        </Label>
        <Label>
          Order in Day
          <select
            key={selPoiOrder}
            name="poi-order-in-day"
            id="poi-order-select"
            defaultValue={selPoiOrder}>
            {
              selDayPois.length !== 0 ?
                (enumeratePoiOrderOptions()) :
                (<option value={0}>1</option>)
            }
          </select>
        </Label>
      </section>
      <section>
        <h2>Poi Information</h2>
        <Label>
          Location
          <input
            disabled
            placeholder="No Location Selected."
            value={poiLoc}
          />
          <LocationInput onClickPOIMarker={confirmLocation} />
        </Label>
        <Label>
          Title
          <input value={poiTitle} onChange={changePoiTitle} />
        </Label>
        <Label>
          <input
            ref={sameTitleCheckbox}
            type="checkbox"
            onChange={autosetPoiTitle}
            disabled={poiLoc.length === 0}
            defaultChecked={false}
          />
          Title is same as location name
        </Label>
        <Label>
          Description
          <textarea value={poiDesc} onChange={onChangePoiDesc} />
        </Label>
        <div>
        </div>
      </section>
    </div>
  )
}

function AddPoi({ sidebarSetter }) {
  function showAddPoi() {
    sidebarSetter.setContent(<NewPoiForm />);
    sidebarSetter.setVisible(true);
  }

  return (
    <button className="add-Poi" type="button" onClick={showAddPoi}>Add POI</button>
  )
}

export default AddPoi
