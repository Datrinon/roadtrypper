import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { TripContext, TripDispatch } from './Studio';

import DUMMY_NEW_PHOTO from "../../../data/images/url04.jpg"

import Modal from './Modal';
import useModal from '../../hooks/useModal';
import CountingTextArea from './CountingTextArea';

function GalleryHeader({ activePoiId, setPhotos }) {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const [modalValues, modalSetter, modalRef] = useModal();

  function addPhoto(e) {
    e.preventDefault();

    // TODO
    // Get firebase to upload the image somehow.
    
    let filepath = e.target.querySelector("#photo-file")
      .value;
    // get the filename of the image.
    filepath = filepath.match(/(\\|\/)(?!.+(\\|\/).+)(?<path>.+)/).groups.path;
    let description = e.target.querySelector("#photo-description").value;
    
    // get the id...

    dispatch({
      type: "add",
      payload: {
        type: "photos",
        fkname: "poiId",
        fkid: activePoiId,
        path: filepath,
        description
      }
    })

    // gotta set the photos after this to update it locally...?
    // the POI details is still alive, so it should refresh the photos on trip change.
    // (It didn't)
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
        <input id={"photo-file"} accept="image/*" type="file" required={true}/>
        <CountingTextArea
          textAreaId={"photo-description"}
          labelText={"Description (Optional)"}
          limit={500}
          classNames={["photo-description"]}
        />
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