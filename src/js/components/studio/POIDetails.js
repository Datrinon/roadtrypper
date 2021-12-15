// npm plugins
import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { point } from 'leaflet';
// styled + css
import * as s from "./POIDetails.style";
import "../../../css/POIDetails.css";
// components
import HoverToEditInput from './HoverToEditInput';
import GalleryView from './GalleryView';
import LoadingImage from '../shared/LoadingImage';


// trip information and reducer
import { MapInstance, TripContext, TripDispatch } from './Studio';
import LocationInput from './LocationInput';
import EditLocation from './EditLocation';

import PLACEHOLDER_IMG from '../../../data/spin-32.gif';


let ItalicSpan = styled.span`
  font-style: italic;
`


function PoiDetails({ activePin, setActivePin }) {
  const [activePoi, setActivePoi] = useState(activePin);
  const [day, setDay] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [galleryStartingIndex, setGalleryStartingIndex] = useState(null);

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const poiDayEditRef = useRef();
  const poiOrderEditRef = useRef();
  const dayTitleEditRef = useRef();
  const poiTitleEditRef = useRef();
  const poiDescEditRef = useRef();

  function updateData() {
    const currentPOI = trip.pois.find(poi => poi.id === activePin.id);

    setActivePoi(currentPOI);
    setDay(trip.days.find(day => day.id === currentPOI.dayId));
    setPhotos(trip.photos.filter(photo => photo.poiId === currentPOI.id));
  }


  useEffect(() => {
    console.log(activePin);
    if (activePin) {
      updateData();
    }
  }, [activePin]);

  useEffect(() => {
    console.log("New photos hook");
    if (photos) {
      setPhotos(trip.photos.filter(photo => photo.poiId === activePoi.id));
    }
  }, [trip.photos]);

  useEffect(() => {
    // if the days changes, that means we should update the day.
    // this is important for reflecting the correct title...
    if (day) {
      setDay(trip.days.find(day => day.id === activePoi.dayId));
    }
  }, [trip.days]);

  function launchGalleryView(index) {
    setGalleryStartingIndex(index);
  }

  function renderView() {
    console.log(day);
    //#region Belongs to Day
    let belongsToDayDisplay = (<h1>Day {day.order + 1}</h1>);
    let belongsToDayEdit = (
      <select
        name="poi-day"
        id="poi-day-select"
        defaultValue={day.order}
        ref={poiDayEditRef}>
        {
          // I just need map to return with the index.
          trip.days.map((day, index) => {
            return <option
              key={day.id}
              value={index}>
              Day {index + 1}
            </option>
          })
        }
      </select>)

    let onBelongsToDayUpdate = () => {

      // if the selected day is the same, then don't update.
      if (poiDayEditRef.current.value === day.order) {
        return;
      }

      dispatch({
        type: "move_poi",
        payload: {
          id: activePoi.id,
          newDay: parseInt(poiDayEditRef.current.value)
        }
      })
    }

    let belongsToDayElement = (
      <HoverToEditInput
        displayVer={belongsToDayDisplay}
        editVer={belongsToDayEdit}
        onClickSave={onBelongsToDayUpdate} />
    );
    //#endregion

    //#region poi order
    let dayPOIs = trip
      .pois
      .filter(poi => poi.dayId === activePoi.dayId)
      .sort((poiA, poiB) => poiA.order - poiB.order);
    let poiOrderDisplay = (<h2>Location {activePoi.order + 1} / {dayPOIs.length} </h2>);
    let poiOrderEdit = (<select
      name="poi-order"
      id="poi-order-select"
      defaultValue={activePoi.order}
      ref={poiOrderEditRef}>
        {
          dayPOIs.map((poi) => {
              return <option
                key={poi.order}
                value={poi.order}>
                  {poi.order + 1}
                </option>

            })
        }
      </select>);
    let poiOrderUpdate = () => {
      // if the selected order is the same, then don't update
      if (poiOrderEditRef.current.value === activePoi.order) {
        return;
      }

      dispatch({
        type: "rearrange",
        payload: {
          type: "pois",
          id: activePoi.id,
          newOrder: parseInt(poiOrderEditRef.current.value),
          fk: "dayId",
          ref: activePoi.ref
        }
      })
    }

    const poiOrderElement = (<HoverToEditInput
      displayVer={poiOrderDisplay}
      editVer={poiOrderEdit}
      onClickSave={poiOrderUpdate} />);
    //#endregion

    //#region Day Title
    // ! Fix le bug with this stale reference...
    let dayTitleDisplay;
    console.log("passing by day title in renderView() of POIDetails.js...:");
    console.log(day);
    if (day.title.length === 0) {
      dayTitleDisplay = (<h2 className="details day untitled">Untitled Day</h2>);
    } else {
      dayTitleDisplay = (<h2 className="details day">{day.title}</h2>);
    }

    let dayTitleEdit = (<input
      className="details day-edit"
      defaultValue={day.title}
      ref={dayTitleEditRef} />);

    let onDayTitleSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "days",
          id: day.id,
          key: "title",
          value: dayTitleEditRef.current.value,
          ref: day.ref
        }
      });
    };

    let dayTitleElement = (<HoverToEditInput
      displayVer={dayTitleDisplay}
      editVer={dayTitleEdit}
      onClickSave={onDayTitleSave} />)
    //#endregion

    //#region POI Title
    let poiTitleDisplay = (<h3 className="details poi title">{activePoi.title}</h3>)

    let poiTitleEdit = (<input
      className="details"
      defaultValue={activePoi.title}
      ref={poiTitleEditRef} />)

    let onPoiTitleSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "pois",
          id: activePoi.id,
          key: "title",
          value: poiTitleEditRef.current.value,
          ref: activePoi.ref
        }
      });
    }

    let poiTitleElement = (
      <HoverToEditInput
        displayVer={poiTitleDisplay}
        editVer={poiTitleEdit}
        onClickSave={onPoiTitleSave} />);
    //#endregion

    //#region Description
    

    const descDisplay = (<p className="details desc">
      {activePoi.description.length === 0 ?
        <ItalicSpan>No description provided.</ItalicSpan> :
        activePoi.description 
      }
      </p>);

    const descEdit = (<textarea defaultValue={activePoi.description} ref={poiDescEditRef} />)

    const onDescSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "pois",
          id: activePoi.id,
          key: "description",
          value: poiDescEditRef.current.value,
          ref: activePoi.ref
        }
      });
    }

    let descElement = (
      <HoverToEditInput
        displayVer={descDisplay}
        editVer={descEdit}
        onClickSave={onDescSave}
      />
    )
    //#endregion

    function mapThumbnails(photo, index) {

      let onClickAction = launchGalleryView.bind(null, index);

      if (photo.path === PLACEHOLDER_IMG) {
        onClickAction = null;
      }

      return (
        <figure
          key={"" + day.id + photo.id}>
          <LoadingImage
            src={photo.path}
            onClick={onClickAction}
            classNames={["thumbnail"]}
            alt={photo.description} />
        </figure>
      );
    }

    function deletePOI() {
      setActivePin(null);

      dispatch({
        type: "delete",
        payload: {
          type: "pois",
          id : activePin.id
        }
      });
    }

    return (
      <>
        <button onClick={deletePOI}>Delete</button>
        {belongsToDayElement}
        {poiOrderElement}
        {dayTitleElement}
        {poiTitleElement}
        <EditLocation activePoi={activePoi} />
        {descElement}
        {
          photos.length > 0 ?
            photos.map(mapThumbnails) :
            (<button onClick={launchGalleryView.bind(null, -1)}>Add Photos</button>)
        }
      </>
    )
  }

  if (!activePin || !day) {
    console.log("If there's no activePin or day, we don't load anything!");
    return null;
  }

  return (
    <div className={`poi-details`}>
      Show Pin Details here.
      <section className="poi-contents">
        {renderView()}
      </section>
      {galleryStartingIndex !== null && (
        <section className="gallery">
          <GalleryView
            startingPhoto={photos[galleryStartingIndex]}
            startingIndex={galleryStartingIndex}
            poiPhotos={photos}
            poiId={activePoi.id}
            closeGalleryView={() => {
              setGalleryStartingIndex(null);
            }}
          />
        </section>
      )}
    </div>
  )
}


export default PoiDetails
