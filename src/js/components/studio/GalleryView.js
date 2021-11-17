import React, { useState, useEffect, useContext } from 'react'
import { TripContext, TripDispatch } from './Studio';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { render } from 'react-dom';

function GalleryLoading() {
  return (
    <p>Loading</p>
  )
}


function GalleryView({ SAMPLE_IMAGES, startingPhotoId, poiPhotos, closeGalleryView }) {
  //// might not be necessary
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState(poiPhotos);
  const [activePhoto, setActivePhoto] = useState(null);

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const GalleryView = styled.div`
    border: 1px solid fuchsia;
  `

  const Photo = styled.img`
    border: 1px solid orange;
  `

  function getPhotoFromId(id) {
    return photos.find(photo => photo.id === id);
  }

  async function loadPhotoForDisplay(photo) {

    let loadImg = () => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = SAMPLE_IMAGES[photo.path]; //! SAMPLE_FLAG

        img.onload = () => {
          resolve(img);
        }

        img.onerror = () => {
          reject(new Error("Could not load the image from the server."));
        }
      });
    }

    try {
      let result = await loadImg();

      console.log(result);

      return (
        <figure>
          <Photo
            src={result.src}
            alt={photo.description}
          />
          <figcaption>{photo.description}</figcaption>
        </figure>
      )
    } catch (error) {
      return (
        <div>
          <p>Error!</p>
          <p>{error}</p>
        </div>
      );
    }
  }

  // after first mount and only the first mount,do we set the activePhoto as starting.
  useEffect(() => {
    debugger;
    const startingPhoto = getPhotoFromId(startingPhotoId);
    loadPhotoForDisplay(startingPhoto).then(photo => {
      setActivePhoto(photo);
      setLoading(false);
    })
  }, []);



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
      <div className="exhibition">
        {
          loading ?
            (<GalleryLoading />) :
            activePhoto
        }
      </div>
    </GalleryView>
  )
}

export default GalleryView