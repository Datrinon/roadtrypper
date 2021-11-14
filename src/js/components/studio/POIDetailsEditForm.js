import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

import * as s from "./POIDetails.style";
import "../../../css/POIDetails.css";
import { TripDetailsContext, TripDetailsDispatch } from './Studio';

function POIDetailsEditForm({ activePin, sampleImages }) {

  const [deleteCount, setDeleteCount] = useState(0);

  const tripDetails = useContext(TripDetailsContext);
  const dispatch = useContext(TripDetailsDispatch);

  function toggleDeletion(e) {
    e.currentTarget.classList.toggle("to-delete");
    let numPhotosToDelete = document.querySelectorAll(".to-delete").length;
    setDeleteCount(numPhotosToDelete);
  }

  return (
    <>
      <div className="text-fields">
        <select
          name="day"
          id="day-select"
          defaultValue={activePin.day.order}>
          {
            tripDetails.map((elem, index) => {
              return (
                <option
                  key={index}
                  value={index}
                >
                  Day {index + 1}
                </option>
              )
            })
          }
        </select>
        <s.EditModeInput
          className="edit title"
          defaultValue={activePin.poi.title} />
        <s.EditModeTextBox
          className="edit desc"
          defaultValue={activePin.poi.description} />
      </div>
      <div className="photo-field">
        {
          activePin.poi.photos.map((photo, index) => {
            return (
              <div>
                <s.Thumbnail
                  key={index}
                  src={sampleImages[photo.path]}
                  onClick={toggleDeletion}
                  alt="some image." />
                <s.EditModeTextBox
                  className="edit photo-desc"
                  defaultValue={photo.description} />
              </div>
            );
          })
        }
        <div>
          <p>
            {deleteCount > 0 ?
              `${deleteCount} Images Selected` :
              `Select Images to Remove`
            }
          </p>
          <button disabled={deleteCount === 0}>
            <FontAwesomeIcon
              icon={faTrashAlt}
            />
          </button>
        </div>
      </div>
      <div>
        <button
          disabled={true}>
          Save {/* The user can always save. They don't need a title or description. */}
        </button>
        <button>Cancel</button>
      </div>
    </>
  )
}

export default POIDetailsEditForm
