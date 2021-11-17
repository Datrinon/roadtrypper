import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { TripContext, TripDispatch } from './Studio';


function GalleryHeader() {

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  return (
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
  )
}

export default GalleryHeader
