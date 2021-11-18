import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import SAMPLE_POIS from '../../../data/sample-pois';

import * as s from "./POIDetails.style";

import GalleryHeader from './GalleryHeader';

function GalleryLoading() {
  return (
    <p>Loading</p>
  )
}


function GalleryView({ SAMPLE_IMAGES, startingPhotoId, poiPhotos, closeGalleryView }) {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState(poiPhotos);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activePoiId, setactivePoiId] = useState(getPhotoFromId(startingPhotoId).poiId);
  const [activeIndex, setActiveIndex] = useState(getPhotoIndexFromId(startingPhotoId));

  const GalleryView = styled.div`
    border: 1px solid fuchsia;
  `

  const Photo = styled.img`
    border: 1px solid orange;
  `

  // This updates the photos for the gallery if poiPhotos changes
  useEffect(() => {
    setPhotos(prevPhotos => {
      // Move to uploaded image if user chooses to add an image.
      if (prevPhotos.length < poiPhotos.length) {
        setActiveIndex(poiPhotos.length - 1);
      }

      return poiPhotos;
    });
  }, [poiPhotos])

  // This updates the activePhoto if the user edits it in the header.
  useEffect(() => {

    prepPhotoForDisplay(poiPhotos[activeIndex]).then(result => {
      setActivePhoto(result);
    })
    
  }, [poiPhotos[activeIndex]])

  useEffect(() => {
    setLoading(true);

    const photo = photos[activeIndex];

    prepPhotoForDisplay(photo).then(result => {
      setActivePhoto(result);
      setactivePoiId(photo.poiId);
    })
  }, [activeIndex]);

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
      setLoading(false);

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



  // need to keep activeIndex to keep forward/backward cycling.
  // changing the activeIndex will change the activeId.

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
      <div className="exhibition">
        {
          loading ?
            (<GalleryLoading />) :
            (
              <>
                {<GalleryHeader activePhoto={photos[activeIndex]} />}
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