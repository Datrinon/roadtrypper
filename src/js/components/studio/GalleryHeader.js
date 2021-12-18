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

import PLACEHOLDER_IMG from '../../../data/spin-32.gif';
import { getBase64 } from '../../util/getbase64';


function GalleryHeader({ activePhoto, loading }) {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const [modalValues, modalSetter, modalRef] = useModal();


  async function addPhoto(e) {
    e.preventDefault();

    let file = e.target.querySelector("#photo-file").files[0];
    // get the filename of the image.
    let description = e.target.querySelector("#photo-description").value;

    let path = `trips/${trip.tripId}/${uuidv4()}/${file.name}`;
    // ! Now that we have a placeholder, we can use that instead.

    console.log("GalleryHeader Add()");
    console.log({
      type: "add",
      payload: {
        type: "photos",
        fkname: "poiId",
        fkid: activePhoto.poiId,
        path: PLACEHOLDER_IMG,
        realpath: path,
        file,
        description
      }
    });

    dispatch({
      type: "add",
      payload: {
        type: "photos",
        fkname: "poiId",
        fkid: activePhoto.poiId,
        path: await getBase64(file),
        realpath: path,
        file,
        description
      }
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
        value: e.target.querySelector("#photo-edit-description").value,
        ref: activePhoto.ref
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
    //! 
    // I'mma try to use base64 instead here.
    // we handle over the preview first
    // then after that we just replace with the firebase URL.
    let file = e.target.querySelector("#photo-file-update").files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    let path = `trips/${trip.tripId}/${uuidv4()}/${file.name}`;

    reader.addEventListener("load", () => {
      dispatch({
        type: "edit",
        payload: {
          type: "photos",
          id: activePhoto.id,
          key: "path",
          value: reader.result,
          realpath: path,
          file,
          ref: activePhoto.ref,
          storageUri: activePhoto.storageUri
        }
      })
    });
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
        id: activePhoto.id,
        ref: activePhoto.ref,
        storageUri: activePhoto.storageUri
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
