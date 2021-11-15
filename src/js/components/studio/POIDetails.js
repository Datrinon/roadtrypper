import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"

import * as s from "./POIDetails.style";
import "../../../css/POIDetails.css";

import POIDetailsEditForm from './POIDetailsEditForm';
import { TripContext } from './Studio';

// ! TODO Remove this later when finished debugging.
function importSampleImages(r = require.context("../../../data/images", false, /\.(png|jpe?g|svg)$/)) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item)["default"]; });
  return images;
}

function PoiDetails({ activePin }) {
  // convert to boolean + invert.
  const [collapsed, setCollapsed] = useState(!activePin);
  const [editMode, setEditMode] = useState(false);
  const [sampleImages, setSampleImages] = useState(importSampleImages());
  const [day, setDay] = useState(null);
  const [photos, setPhotos] = useState(null);

  const trip = useContext(TripContext);
  /*
  ! ! !
  (Editing)
  0. Each time I update the updateTime of the trip needs to be updated.
  1. A pencil button will make the trip details editable.
  2. I should be able to set the day using a dropdown menu.
  3. I should be able to rearrange the order of POIs.
  (Deletion)
  1. A trash can should allow me to delete it, by the pencil icon.
  */
  console.log(JSON.stringify(sampleImages));

  useEffect(() => {
    setCollapsed(!activePin);
    if (!!activePin) {
      setDay(trip.days.find(day => day.id === activePin.dayId));
      setPhotos(trip.photos.filter(photo => photo.PoiId === activePin.id))
    }
  }, [activePin]);


  function renderEditMode() {
    return (
      <POIDetailsEditForm activePin={activePin} sampleImages={sampleImages} />
    )
  }

  function showFullImage(e) {
    alert("TODO -- the full image is shown here.")
  }

  function renderViewMode() {
    return (
      <>
        <h1>Day {day.order + 1}</h1>
        <h2>
          {activePin.title}
        </h2>
        <p>{activePin.description}</p>
        {
          photos.map((photo, index) => {
            return (
              <figure>
                <s.Thumbnail
                  key={photo.id}
                  src={sampleImages[photo.path]}
                  onClick={showFullImage}
                  alt={photo.description} />
                {/* <figcaption>
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
          <button onClick={() => setEditMode((prevState) => !prevState)}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </button>
          {editMode ?
            renderEditMode() :
            renderViewMode()
          }
        </section>
      )}
    </div>
  )
}

export default PoiDetails
