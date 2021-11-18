import React, { useState, useEffect, useContext, useRef } from 'react'
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
  const modalRef = useRef();
  const modalObserver = useRef();
  // why useRef?
  /**
   * Assignments to the 'modalMutator' variable from inside React Hook useEffect
   * will be lost after each render. To preserve the value over time, store it
   * in a useRef Hook and keep the mutable value in the '.current' property.
   */

  // The purpose of this effect is to keep track of if the modal closes.
  // this allows us to sync the state variable in charge of modal visibility.
  useEffect(() => {
    const config = { attributes: true, childList: false, subtree: true };
    const callback = () => {
      const modalStyle = getComputedStyle(modalRef.current);
      if (modalStyle.display === 'none') {
        setModalVisible(false);
      }
    }

    modalObserver.current = new MutationObserver(callback);
    modalObserver.current.observe(modalRef.current, config);

    return () => {

      modalObserver.current.disconnect();
    }
  }, []);

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
