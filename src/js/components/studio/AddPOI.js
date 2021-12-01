/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useContext, useEffect, useRef } from 'react'
import LocationInput from './LocationInput';
import { MapInstance, TripDispatch, TripContext } from './Studio';
import styled from 'styled-components';

import L from "leaflet";
import { getLIcon } from './LeafletIcon';
import CountingTextArea from './CountingTextArea';
import { array } from 'prop-types';
import { cloneDeep } from 'lodash';

const Label = styled.label`
  display: block;

  & > * {
    display: block;
  }
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

  function onAddPhoto() {
    fileInputRef.current.click();
  }

  function fileChange() {
    console.log(photos);
    console.log(fileInputRef.current.files);
    let newPhotos = [];
    for (let i = 0; i < fileInputRef.current.files.length; i++) {
      newPhotos.push(fileInputRef.current.files[i]);
    }
    setPhotos(photos.concat(newPhotos));
  }

  function removePhotoFromBuffer(removeIndex) {
    // setPhotos(photos.filter((photo, index) => index !== removeIndex));
    setPhotos(prevPhotos => {
      const photos = cloneDeep(prevPhotos);
      photos.splice(removeIndex, 1);
      // prevPhotos.splice(removeIndex, 1);
      // console.log(prevPhotos);
      return photos;
    })
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
          <input ref={fileInputRef} type="file" id="fileElem" multiple accept="image/*" style={{ display: "none" }} onChange={fileChange} />
          <div>
            {
              photos.map((photo, index) => {
                return (
                  <div key={index}>
                    <p>{photo.name}</p>
                    <img src={URL.createObjectURL(photo)} alt={photo.name} />
                    <CountingTextArea
                      textAreaId={`new-photo-desc${index}`}
                      labelText={"Description (Optional)"}
                      limit={500}
                      startText={""}
                      classNames={["add-photo-description"]}
                    />
                    <button onClick={removePhotoFromBuffer.bind(null, index)}>Remove This Photo</button>
                  </div>)
              })
            }
          </div>
          <button onClick={onAddPhoto}>Add Le Photo</button>
        </div>
      </section>
    </div>
  )
}

function AddPoi({ sidebarSetter }) {
function AddPoiSuccess({ lastAddedPoi }) {
  const sidebarSetter = useContext(SidebarSetter);
  const trip = useContext(TripContext);

  function displayForm() {
    sidebarSetter.setContent(<NewPoiForm />);
  }

  function displayPoi() {
    const poi = trip.pois.find(poi => poi.dayId === lastAddedPoi.dayId
      && poi.order === lastAddedPoi.order);

    sidebarSetter.setContent(<PoiDetails activePin={poi} />);
  }

  return (
    <div>
      <h1>Success! New POI added.</h1>
      <button onClick={displayForm}>Add Another POI</button>
      <button onClick={displayPoi}>View Added POI</button>
    </div>
  )
}

function AddPoi() {
  const sidebarSetter = useContext(SidebarSetter);

  function showAddPoi() {
    sidebarSetter.setContent(<NewPoiForm />);
    sidebarSetter.setVisible(true);
  }

  return (
    <button className="add-Poi" type="button" onClick={showAddPoi}>Add POI</button>
  )
}

export default AddPoi
