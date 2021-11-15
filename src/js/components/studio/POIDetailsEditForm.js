import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

import * as s from "./POIDetails.style";
import "../../../css/POIDetails.css";
import { TripDetailsContext, TripDetailsDispatch } from './Studio';

function POIDetailsEditForm({ activePin, sampleImages }) {

  // !
  // Fix the form handlers to account for activePin.day and activePin.poi.

  // make copy of the activePin's information.
  // that way, we can make edits to the details without having to use
  // defaultValue and without affecting the original information
  // (not until the user presses save.)
  const [pinInfo, setPinInfo] = useState(activePin);

  const [deleteCount, setDeleteCount] = useState(0);

  const tripDetails = useContext(TripDetailsContext);
  const dispatch = useContext(TripDetailsDispatch);

  function toggleDeletion(e) {
    e.currentTarget.classList.toggle("to-delete");
    let numPhotosToDelete = document.querySelectorAll(".to-delete").length;
    setDeleteCount(numPhotosToDelete);
  }

  /**
   * Called when the user presses the save button; takes the copy made of the data and then
   * sends that to dispatch.
   */
  function updatePOI() {

  }

  function handleFormChange(field, e) {
    setPinInfo((prevInfo) => {
      prevInfo.poi[field] = e.target.value;
      return prevInfo;
    })
  }

  function handlePhotoDescriptionChange(index, e) {
    setPinInfo((prevInfo) => {
      prevInfo.poi.photos[index].description = e.target.value;
      return prevInfo;
    });
  }

  function movePOIToDiffDay(e) {
    alert("TODO - Implement this");
    // setPinInfo((prevInfo) => {
    //   prevInfo
    // })

    // activePin.poi.id;
    // pop from current array using poi.id.
    // reset order of all elements in the array
    // move this element to the chosen array at the end.
    // regenerate order of all elements in the array.
    // Yeah this needs to be denormalized, since you cannot mutate state.
  }

  return (
    <>
      <div className="text-fields">
        <select
          name="day"
          id="day-select"
          value={pinInfo.day.order}
          onChange={movePOIToDiffDay}>
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
        <select
          name="order"
          id="order-select"

        >
          
        </select>
        <s.EditModeInput
          className="edit title"
          value={pinInfo.poi.title}
          onChange={handleFormChange.bind(null, "title")}
        />
        <s.EditModeTextBox
          className="edit desc"
          value={pinInfo.poi.description}
          onChange={handleFormChange.bind(null, "description")}
        />
      </div>
      <div className="photo-field">
        {
          pinInfo.poi.photos.map((photo, index) => {
            return (
              <div>
                <s.Thumbnail
                  key={index}
                  src={sampleImages[photo.path]}
                  onClick={toggleDeletion}
                  alt="some image." />
                <s.EditModeTextBox
                  className="edit photo-desc"
                  value={photo.description}
                  onChange={handlePhotoDescriptionChange.bind(null, index)}
                />
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
          disabled={true}
          onClick={updatePOI}
        >
          Save
        </button>
        <button>Cancel</button>
      </div>
    </>
  )
}

export default POIDetailsEditForm
