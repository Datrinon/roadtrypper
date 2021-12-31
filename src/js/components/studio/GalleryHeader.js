import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faPlus, faPlusCircle, faRetweet, faTimes } from '@fortawesome/free-solid-svg-icons';

import { TripContext, TripDispatch } from './Studio';

import { v4 as uuidv4 } from 'uuid';

import Modal from '../shared/Modal';
import useModal from '../../hooks/useModal';
import CountingTextArea from './CountingTextArea';
import { addTripPhoto } from '../../database/data';
import useAbortController from '../../hooks/useAbortController';

import PLACEHOLDER_IMG from '../../../data/spin-32.gif';
import { getBase64 } from '../../util/getbase64';

import * as g from "./styled/Gallery.styled";


function GalleryHeader({ activePhoto, loading }) {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const [modalValues, modalSetter, modalRef] = useModal();

  const photoToAdd = useRef("");


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
        <input
          id={"photo-file"}
          className="photo-upload"
          accept="image/*"
          type="file"
          onChange={(e) => {
            photoToAdd.current = e.currentTarget.files[0];
            console.log(photoToAdd.current);
          }}
          required={true} />
        {
          photoToAdd.current &&
          <img src={photoToAdd.current} alt="A preview of the pic you will add."/>
        }        
        <CountingTextArea
          textAreaId={"photo-description"}
          labelText={"Description (Optional)"}
          placeholder={"Type a short description about the photo here..."}
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
          classNames={["edit photo-description"]}
        />
      </>
    );
  }

  function updatePhotoPath(e) {
    e.preventDefault();
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
        <input id="photo-file-update" className="photo-upload" accept="image/*" type="file" required={true} />
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
        <p className="modal-text">Are you sure you want to delete this photo? This action cannot be
          undone.
        </p>
      </>
    )
  }

  return (
    <>
      <g.GalleryHeader className="options-panel">
        <g.GalleryButton
          data-tip="Add Photo"
          className="add-photo-button"
          onClick={showAddPhotoModal}
          disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faFileImage} />
            <FontAwesomeIcon icon={faPlus} className="plus" />
          </span>

        </g.GalleryButton>
        <g.GalleryButton
          data-tip="Edit Description"
          className="edit-desc-button"
          onClick={showEditDescModal}
          disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </g.GalleryButton>
        <g.GalleryButton
          data-tip="Change Photo"
          className="change-photo-button"
          onClick={showEditPhotoModal}
          disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faImage} />
            <FontAwesomeIcon icon={faRetweet} className="edit" />
          </span>
        </g.GalleryButton>
        <g.GalleryButton
          data-tip="Delete Photo"
          className="delete-photo-button"
          onClick={showDeleteModal}
          disabled={loading}>
          <span>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </g.GalleryButton>
      </g.GalleryHeader>
      <g.GalleryModal>
        <Modal ref={modalRef}
          visible={modalValues.visible}
          title={modalValues.title}
          confirm={modalValues.confirm}
          dismissMsg={modalValues.dismiss}
          content={modalValues.content}
        />
      </g.GalleryModal>
    </>
  )
}

export default GalleryHeader
