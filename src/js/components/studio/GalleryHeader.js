import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { TripContext, TripDispatch } from './Studio';

import DUMMY_NEW_PHOTO from "../../../data/images/url-toAdd.jpg"

import * as s from "./POIDetails.style";

function GalleryHeader({ setPhotos }) {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);
  const [modalVisible, setModalVisible] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  function addPhoto() {

  }

  function showAddPhotoModal() {
    // ! SAMPLE_FLAG
    // For now, we're limited on what we can do since we don't have Firebase
    // integration yet. However, we can work on getting the dispatch function
    // right.
    setModalVisible(true);

    setModalContent(
      <>
        <div>Add a Photo.</div>
        <form onSubmit={addPhoto}>
          <input type="file" />
          <input type="text" />
        </form>
      </>
    );
  }



  return (
    <>
      <header className="options-panel">
        <button onClick={showAddPhotoModal}>
          <span>
            <FontAwesomeIcon icon={faFileImage} />
          </span>
          Add Photo
        </button>
        <button>
          <span>
            <FontAwesomeIcon icon={faEdit} />
          </span>
          Edit Description
        </button>
        <button>
          <span>
            <FontAwesomeIcon icon={faImage} />
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          Change Photo
        </button>
        <button>
          <span>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
          Delete
        </button>
        <button>
          <span>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          Exit Gallery View
        </button>
      </header>
      <s.Modal>
        {modalContent}
      </s.Modal>
    </>
  )
}

export default GalleryHeader
