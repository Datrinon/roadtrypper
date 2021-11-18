import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { TripContext, TripDispatch } from './Studio';

import DUMMY_NEW_PHOTO from "../../../data/images/url-toAdd.jpg"

import Modal from './Modal';
import useModal from '../../hooks/useModal';

function GalleryHeader({ setPhotos }) {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const [modalValues, modalSetter, modalRef] = useModal();

  function addPhoto(e) {
    e.preventDefault();

    console.log("You're supposed to add a photo.");
  }

  function showAddPhotoModal() {
    // ! SAMPLE_FLAG
    // For now, we're limited on what we can do since we don't have Firebase
    // integration yet. However, we can work on getting the dispatch function
    // right.
    modalSetter.setVisible(true);
    modalSetter.setTitle("Add a Photo");
    modalSetter.setConfirm({ msg: "Add", callback: addPhoto })
    modalSetter.setDismiss("Cancel");
    modalSetter.setContent(
      <>
        <input type="file" />
        <label htmlFor="photo-description">
          Description
          <textarea id="photo-description" type="text" />
        </label>
        <button type="submit">Add</button>
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
      <Modal ref={modalRef}
        visible={modalValues.visible}
        title={modalValues.title}
        confirm={modalValues.confirm}
        dismissMsg={modalValues.dismiss}
        content={modalValues.content}
      />
    </>
  )
}

export default GalleryHeader
