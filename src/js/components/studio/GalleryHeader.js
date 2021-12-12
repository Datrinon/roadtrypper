import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { TripContext, TripDispatch } from './Studio';

import { v4 as uuidv4 } from 'uuid';

import Modal from './Modal';
import useModal from '../../hooks/useModal';
import CountingTextArea from './CountingTextArea';
import { addTripPhoto } from '../../database/data';
import useAbortController from '../../hooks/useAbortController';

function GalleryHeader({ activePhoto, loading }) {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);
  const signal = useAbortController();

  const [modalValues, modalSetter, modalRef] = useModal();


  function addPhoto(e) {
    e.preventDefault();

    // TODO
    // Get firebase to upload the image somehow.

    let file = e.target.querySelector("#photo-file").files[0];
    // get the filename of the image.
    let description = e.target.querySelector("#photo-description").value;

    let path = `trips/${trip.tripId}/${uuidv4()}/${file.name}`;
    // 1. upload the file and get the filepath from firebase
    // just need the file path and the file.
    addTripPhoto(trip.tripId, file, path, signal).then((path) => {
      console.log(path);

      dispatch({
        type: "add",
        payload: {
          type: "photos",
          fkname: "poiId",
          fkid: activePhoto.poiId,
          path: path,
          description
        }
      });
    });
  }

  function showAddPhotoModal() {
    modalSetter.setVisible(true);
    modalSetter.setTitle("Add a Photo");
    modalSetter.setConfirm({ msg: "Add", callback: addPhoto })
    modalSetter.setDismiss("Cancel");
    modalSetter.setContent(
      <>
        <input id={"photo-file"} accept="image/*" type="file" required={true} />
        <CountingTextArea
          textAreaId={"photo-description"}
          labelText={"Description (Optional)"}
          limit={500}
          classNames={["photo-description"]}
        />
      </>
    );
  }

  function updatePhotoDesc(e) {
    dispatch({
      type: "edit",
      payload: {
        type: "photos",
        id: activePhoto.id,
        key: "description",
        value: e.target.querySelector("#photo-edit-description").value
      }
    })
  }

  function showEditDescModal() {
    modalSetter.setVisible(true);
    modalSetter.setTitle("Edit Description");
    modalSetter.setConfirm({ msg: "Update", callback: updatePhotoDesc });
    modalSetter.setDismiss("Cancel");
    modalSetter.setContent(
      <>
        <CountingTextArea
          textAreaId={"photo-edit-description"}
          labelText={"Description (Optional)"}
          limit={500}
          startText={activePhoto.description}
          classNames={["photo-description"]}
        />
      </>
    );
  }

  function updatePhotoPath(e) {
    e.preventDefault();
    //! SAMPLE FLAG
    // Need to implement Firebase to complete
    let filepath = e.target.querySelector("#photo-file-update").value;
    // get the filename of the image.
    filepath = filepath.match(/(\\|\/)(?!.+(\\|\/).+)(?<path>.+)/).groups.path;

    dispatch({
      type: "edit",
      payload: {
        type: "photos",
        id: activePhoto.id,
        key: "path",
        value: filepath
      }
    })
  }

  function showEditPhotoModal() {
    modalSetter.setVisible(true);
    modalSetter.setTitle("Change Photo");
    modalSetter.setConfirm({ msg: "Change", callback: updatePhotoPath });
    modalSetter.setDismiss("Cancel");
    modalSetter.setContent(
      <>
        <input id="photo-file-update" accept="image/*" type="file" required={true} />
      </>
    )
  }

  function deletePhoto(e) {
    e.preventDefault();

    console.log({ activePhoto });

    dispatch({
      type: "delete",
      payload: {
        type: "photos",
        id: activePhoto.id
      }
    })
  }

  function showDeleteModal() {
    modalSetter.setVisible(true);
    modalSetter.setTitle("Delete Photo");
    modalSetter.setConfirm({ msg: "Delete", callback: deletePhoto });
    modalSetter.setDismiss("Cancel");
    modalSetter.setContent(
      <>
        <p>Are you sure you want to delete this photo? This action cannot be
          undone.
        </p>
      </>
    )
  }

  return (
    <>
      <header className="options-panel">
        <button onClick={showAddPhotoModal} disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faFileImage} />
          </span>
          Add Photo
        </button>
        <button onClick={showEditDescModal} disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faEdit} />
          </span>
          Edit Description
        </button>
        <button onClick={showEditPhotoModal} disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faImage} />
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          Change Photo
        </button>
        <button onClick={showDeleteModal} disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
          Delete
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
