import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"

import * as s from "./POIDetails.style";
import "../../../css/POIDetails.css";

import POIDetailsEditForm from './POIDetailsEditForm';

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
    console.log(activePin);
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
        <h1>Day {activePin.day.order + 1}</h1>
        <h2>
          {activePin.poi.title}
          <span>
            (Location (some_id)/{activePin.day.pois.length})
          </span>
        </h2>
        <p>{activePin.poi.description}</p>
        {
          activePin.poi.photos.map((photo, index) => {
            return (
              <figure>
                <s.Thumbnail
                  key={index}
                  src={sampleImages[photo.path]}
                  onClick={showFullImage}
                  alt="some image." />
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
