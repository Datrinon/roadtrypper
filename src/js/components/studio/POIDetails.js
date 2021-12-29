// npm plugins
import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { point } from 'leaflet';
// styled + css
import * as d from "./styled/Details.style";
import * as pD from "./styled/POIDetails.style";
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
import { FAIcon } from '../styled/template.style';


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

    return () => {
      console.log("POIDetails.js: Dismounting...");
    }
  }, [activePin, trip]);


  function launchGalleryView(index) {
    setGalleryStartingIndex(index);
  }

  function renderView() {
    console.log(day);
    //#region Belongs to Day
    let belongsToDayDisplay = (
    <pD.POIDayOrder>Day {day.order + 1}</pD.POIDayOrder>);
    let belongsToDayEdit = (
      <d.DayOrderSelect
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
      </d.DayOrderSelect>)

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
    let dayTitleDisplay;

    if (day.title.length === 0) {
      dayTitleDisplay = (
      <h2 className="details day untitled">Untitled Day</h2>);
    } else {
      dayTitleDisplay = (
      <h2 className="details day">{day.title}</h2>);
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
    let poiTitleDisplay = (
    <pD.POITitleDisplay
      className="details poi title">{activePoi.title}</pD.POITitleDisplay>
    );

    let poiTitleEdit = (<d.DayTitleEdit
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
          id: activePin.id
        }
      });
    }
    return (
      <>
        <d.Heading>Point of Interest Overview</d.Heading>
        <d.DeleteItemButton onClick={deletePOI}>
          <FAIcon icon={faTrash} />
        </d.DeleteItemButton>
        <pD.POIHeadingInfo className="poi-general-info">
          <div className="poi-title">
            {poiTitleElement}
          </div>
          <div className="day-num">
            {belongsToDayElement}
          </div>
          <div className="poi-order">
            {poiOrderElement}
          </div>
          <div className="day-title">
            {dayTitleElement}
          </div>
        </pD.POIHeadingInfo>
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
