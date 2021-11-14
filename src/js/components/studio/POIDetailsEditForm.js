import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import s from "./POIDetails.style";

import "../../../css/POIDetails.css";

import { SAMPLE_DAYS } from "../../../data/sample-days";
import img1 from "../../../data/images/url01.jpg";
import img2 from "../../../data/images/url02.jpg";
import img3 from "../../../data/images/url03.jpg";

function POIDetailsEditForm({ activePin }) {

  const [deleteCount, setDeleteCount] = useState(0);


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
            SAMPLE_DAYS.map((elem, index) => {
              return (
                <option
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
        <s.EditModeTextbox
          className="edit desc"
          defaultValue={activePin.poi.description} />
      </div>
      <div className="photo-field">
        {
          activePin.poi.photos.map((photo, index) => {
            return (
              <s.Thumbnail
                key={index}
                src={img1}
                onClick={toggleDeletion}
                alt="some image." />
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
