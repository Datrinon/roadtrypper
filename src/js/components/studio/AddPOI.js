/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useContext, useEffect, useRef } from 'react'
import LocationInput from './LocationInput';
import { MapInstance, TripDispatch, TripContext, TripId, SidebarSetter } from './Studio';
import styled from 'styled-components';

import L from "leaflet";
import { getLIcon } from './LeafletIcon';
import CountingTextArea from './CountingTextArea';
import { cloneDeep, set } from 'lodash';
import PoiDetails from './POIDetails';

const Label = styled.label`
  display: block;

  & > * {
    display: block;
  }
`

function NewPoiForm({ day }) {
  // global contexts
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);
  const tripId = useContext(TripId);
  const sidebarSetter = useContext(SidebarSetter);

  // day state vars
  const [selDay, setSelDay] = useState(day);
  const [selDayPois, setSelDayPois] = useState([]);
  const [selPoiOrder, setSelPoiOrder] = useState(0);
  // poi state vars
  const [poiCoordinates, setPoiCoordinates] = useState(null);
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

  const fileInputRef = useRef();
  const photosArea = useRef();

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

  function onChangePOIOrder(e) {
    setSelPoiOrder(parseInt(e.target.value));
  }
  //#endregion

  //#region Poi Information.
  function confirmLocation(result) {
    console.log(result);

    setPoiLoc(result.label);
    setPoiCoordinates([result.y, result.x]);
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

  /**
   * Adds a POI using the given information from the user.
   * @param {*} e 
   */
  function addNewPoi() {
    let payloadPhotos = null;
    if (photos.length !== 0) {
      const descriptions = photosArea
        .current
        .querySelectorAll(".add-photo-description");

      // ! SAMPLE_FLAG
      payloadPhotos = photos.map((photo, index) => {
        return {
          path: photo.name,
          description: descriptions
            .item(index)
            .querySelector(`#new-photo-desc${index}`).value
        }
      });
    }

    // debug
    console.log({
      type: "add",
      payload: {
        dayId: selDay.id,
        description: poiDesc,
        photos: payloadPhotos,
        order: selPoiOrder,
        title: poiTitle,
        coordinates: poiCoordinates,
        tripId
      }
    });

    dispatch({
      type: "add_poi",
      payload: {
        dayId: selDay.id,
        description: poiDesc,
        photos: payloadPhotos,
        order: selPoiOrder,
        title: poiTitle,
        coordinates: poiCoordinates,
        tripId
      }
    });

    // remove marker...
    poiMarker.current.remove();
    // prompt option to add or view.
    sidebarSetter.setContent(<AddPoiSuccess
      lastAddedPoi={{ dayId: selDay.id, order: selPoiOrder }}
    />);
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
              trip.days
                .sort((dayA, dayB) => dayA.order - dayB.order)
                .map((day, index) => {
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
            value={selPoiOrder}
            onChange={onChangePOIOrder}>
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
          <div ref={photosArea}>
            {
              photos.map((photo, index) => {

                return (
                  <div className="uploaded-photo" key={index}>
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
          <button onClick={onAddPhoto}>Add Photo</button>
        </div>
      </section>
      <button disabled={!poiLoc} onClick={addNewPoi}>Add POI</button>
    </div>
  )
}

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
      <h1>Success! New Point of Interest added.</h1>
      <button onClick={displayForm}>Add Another POI</button>
      <button onClick={displayPoi}>View Added POI</button>
    </div>
  )
}

function AddPoi({activeDay}) {
  const sidebarSetter = useContext(SidebarSetter);

  function showAddPoi() {
    sidebarSetter.setContent(<NewPoiForm day={activeDay}/>);
    sidebarSetter.setVisible(true);
  }

  return (
    <button className="add-Poi" type="button" onClick={showAddPoi}>Add POI</button>
  )
}

export default AddPoi
