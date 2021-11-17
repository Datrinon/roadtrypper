import React, { useState, useEffect, useContext } from 'react'
import { TripContext, TripDispatch } from './Studio';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faTrashAlt, faImage, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { render } from 'react-dom';
import SAMPLE_POIS from '../../../data/sample-pois';

import * as s from "./POIDetails.style";


function GalleryLoading() {
  return (
    <p>Loading</p>
  )
}


function GalleryView({ SAMPLE_IMAGES, startingPhotoId, poiPhotos, closeGalleryView }) {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState(poiPhotos);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeId, setActiveId] = useState(startingPhotoId);
  const [activeIndex, setActiveIndex] = useState(getPhotoIndexFromId(startingPhotoId));

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

  function getPhotoIndexFromId(id) {
    return photos.findIndex(photo => photo.id === id);
  }

  async function prepPhotoForDisplay(photo) {
    setLoading(true);

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
    setLoading(true);

    const photo = getPhotoFromId(activeId);

    prepPhotoForDisplay(photo).then(result => {
      setActivePhoto(result);
      setLoading(false);
    })
  }, [activeId]);

  // need to keep activeIndex to keep forward/backward cycling.
  // need to keep activeId to display the correct image from the thumbnail.
  // changing the activeIndex will change the activeId.
  useEffect(() => {
    setActiveId(photos[activeIndex].id);
  }, [activeIndex]);

  function prevPic() {
    setActiveIndex((lastIndex) => {
      if (lastIndex <= 0) {
        return photos.length - 1;
      } else {
        return lastIndex - 1;
      }
    })
  }

  function nextPic() {
    setActiveIndex((lastIndex) => {
      if (lastIndex >= photos.length - 1) {
        return 0;
      } else {
        return lastIndex + 1;
      }
    })
  }

  const controls = (
    <>
      <div className="controls">
        <button className="previous-arrow" onClick={prevPic}>
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </button>
        <button className="forward-arrow" onClick={nextPic}>
          <FontAwesomeIcon icon={faChevronRight} size="2x" />
        </button>
      </div>

      <div className="thumbnails">
        {
          photos.map((photo, index) => {
            return (
              <s.Thumbnail
                key={photo.id}
                src={SAMPLE_IMAGES[photo.path]}
                alt={"Thumbnail for image about: " + photo.description}
                onClick={setActiveIndex.bind(null, index)}
              />
            )
          })
        }
      </div>
    </>
  );

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
            (
              <>
                {activePhoto}
                {photos.length > 1 && controls}
              </>
            )
        }
      </div>
    </GalleryView>
  )
}

export default GalleryView