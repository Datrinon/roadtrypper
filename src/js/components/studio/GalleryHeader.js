import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { TripContext, TripDispatch } from './Studio';

import DUMMY_NEW_PHOTO from "../../../data/images/url-toAdd.jpg"

import Modal from './Modal';

function GalleryHeader({ setPhotos }) {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalConfirm, setModalConfirm] = useState(null);
  const [modalDismiss, setModalDismiss] = useState("");
  const [modalContents, setModalContents] = useState(null);

  function addPhoto(e) {
    e.preventDefault();
  }

  function showAddPhotoModal() {
    // ! SAMPLE_FLAG
    // For now, we're limited on what we can do since we don't have Firebase
    // integration yet. However, we can work on getting the dispatch function
    // right.
    setModalVisible(true);
    setModalTitle("Add a Photo");
    setModalConfirm({ msg: "Add", callback: addPhoto });
    setModalDismiss("Cancel");
    setModalContents(
      <>
        <form onSubmit={addPhoto}>
          <input type="file" />
          <label htmlFor="photo-description">
            Description
            <textarea id="photo-description" type="text" />
          </label>
          <button type="submit">Add</button>
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
      <Modal
        visible={modalVisible}
        title={modalTitle}
        confirm={modalConfirm}
        dismissMsg={modalDismiss}
        content={modalContents}
      />
    </>
  )
}

export default GalleryHeader
