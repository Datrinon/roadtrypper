import React, { useState, useContext } from 'react'
import { TripContext, TripDispatch } from './Studio';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

function GalleryView({ poiPhotos, setGalleryView }) {
  const [photos, setPhotos] = useState(poiPhotos);

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const GalleryView = styled.div`
    border: 1px solid fuchsia;
  `

  return (
    <GalleryView>
      <header className="options-panel">
        <button>
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
    </GalleryView>
  )
}

export default GalleryView