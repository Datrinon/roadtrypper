import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import styled from 'styled-components';

import * as s from "./POIDetails.style";
import "../../../css/POIDetails.css";

import POIDetailsEditForm from './POIDetailsEditForm';
import { TripContext, TripDispatch } from './Studio';
import HoverToEditInput from './HoverToEditInput';
import { point } from 'leaflet';

// ! TODO Remove this later when finished debugging.
function importSampleImages(r = require.context("../../../data/images", false, /\.(png|jpe?g|svg)$/)) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item)["default"]; });
  return images;
}

function PoiDetails({ activePin }) {
  const [activePoi, setActivePoi] = useState(activePin);
  const [collapsed, setCollapsed] = useState(!activePin);
  const [sampleImages, setSampleImages] = useState(importSampleImages());
  const [sampleImages, setSampleImages] = useState(importSampleImages()); // debug, remove later.
  const [day, setDay] = useState(null);
  const [photos, setPhotos] = useState(null);

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  let dayEditRef = useRef();
  let poiDayEditRef = useRef();
  let dayTitleEditRef = useRef();
  let poiTitleEditRef = useRef();

  function getPOIData() {
  function updateData() {
    setActivePoi(trip.pois.find(poi => poi.id === activePin.id));
    setDay(trip.days.find(day => day.id === activePin.dayId));
    setPhotos(trip.photos.filter(photo => photo.PoiId === activePin.id));
  }

  useEffect(() => {
    setCollapsed(!activePin);
    if (!!activePin) {
      getPOIData();
      updateData();
    }
  }, [activePin, trip]);


  function showFullImage(e) {
    alert("TODO -- the full image is shown here.")
  }

  function renderView() {
    let dayDisplay = (
      <h1 className="details-day">{day.title}</h1>
    );
    console.log("re-render of view-mode");
  
    let dayEdit = (
      <input
        className="details-day"
        defaultValue={day.title}
        ref={dayEditRef}
        />
    )
  
    let dayTitleDisplay = (<h2 className="details day">{day.title}</h2>);

    //#region Day Title
    let dayTitleEdit = (<input
      className="details day-edit"
      defaultValue={day.title}
      ref={dayTitleEditRef} />);

    let onDayTitleSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "days",
          id : day.id,
          id: day.id,
          key: "title",
          value: dayEditRef.current.value,
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
      ref={poiTitleEditRef}/>)

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

    let descriptionDisplay = (<p className="details desc">{activePoi.description}</p>)


    return (
      <>
        
        
        {dayTitleElement}
        {poiTitleElement}
        
        
        {/* <h2>
        {activePin.title}
      </h2> */}
      <p>{activePin.description}</p>
      {
        photos.map((photo) => {
          console.log(photo.id);
          return (
            <figure
              key={"" + day.id + photo.id}
            >
              <s.Thumbnail
                src={sampleImages[photo.path]}
                onClick={showFullImage}
                alt={photo.description} />
              {/* <figcaption>
        <p>{activePoi.description}</p>
        {
                {photo.description}
              </figcaption>  (Move this to the full image view.)*/}
            </figure>
          );
        })
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
    </div>
  )
}

export default PoiDetails
