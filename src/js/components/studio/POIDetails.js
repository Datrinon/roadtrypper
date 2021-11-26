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

// trip information and reducer
import { MapInstance, TripContext, TripDispatch } from './Studio';
import POIDetailsEditForm from './POIDetailsEditForm';
import EditLocationInput from './EditLocationInput';
import EditLocation from './EditLocation';


// ! TODO Remove this later when finished debugging.
function importSampleImages(r = require.context("../../../data/images", false, /\.(png|jpe?g|svg)$/)) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item)["default"]; });
  return images;
}

function PoiDetails({ activePin }) {
  const [activePoi, setActivePoi] = useState(activePin);
  const [collapsed, setCollapsed] = useState(!activePin);
  const [sampleImages, setSampleImages] = useState(importSampleImages()); // debug, remove later.
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
    setActivePoi(trip.pois.find(poi => poi.id === activePin.id));
    setDay(trip.days.find(day => day.id === activePin.dayId));
    setPhotos(trip.photos.filter(photo => photo.poiId === activePin.id));
  }


  useEffect(() => {
    setCollapsed(!activePin);
    if (!!activePin) {
      updateData();
    }
  }, [activePin, trip]);


  function launchGalleryView(index) {
    setGalleryStartingIndex(index);
  }

  function renderView() {

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
              key={index}
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
    let poiOrderDisplay = (<h2>Location {activePoi.order + 1}</h2>);
    let poiOrderEdit = (<select
      name="poi-order"
      id="poi-order-select"
      defaultValue={activePoi.order}
      ref={poiOrderEditRef}>
        {
          trip.pois
            .filter(poi => poi.dayId === activePoi.dayId)
            .sort((poiA, poiB) => poiA.order - poiB.order)
            .map((poi) => {
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
        type: "rearrange_poi",
        payload: {
          id: activePoi.id,
          newOrder: parseInt(poiOrderEditRef.current.value)
        }
      })
    }

    const poiOrderElement = (<HoverToEditInput
      displayVer={poiOrderDisplay}
      editVer={poiOrderEdit}
      onClickSave={poiOrderUpdate} />);
    //#endregion

    //#region Day Title
    let dayTitleDisplay = (<h2 className="details day">{day.title}</h2>);

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
    const descDisplay = (<p className="details desc">{activePoi.description}</p>)

    const descEdit = (<textarea defaultValue={activePoi.description} ref={poiDescEditRef} />)

    const onDescSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "pois",
          id: activePoi.id,
          key: "description",
          value: poiDescEditRef.current.value,
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
      return (
        <figure
          key={"" + day.id + photo.id}>
          <s.Thumbnail
            src={sampleImages[photo.path]}
            onClick={launchGalleryView.bind(null, index)}
            alt={photo.description} />
        </figure>
      );
    }

    console.log(photos);

    return (
      <>
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

  return (
    <div className={`poi-details ${collapsed && "collapsed"}`}>
      {collapsed ? "(currently collapsed)" : "(not collapsed)"}
      Show Pin Details here.
      {!collapsed && (
        <section className="poi-contents">
          {renderView()}
        </section>
      )}
      {!collapsed && galleryStartingIndex !== null && (
        <section className="gallery">
          <GalleryView
            SAMPLE_IMAGES={sampleImages}
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
