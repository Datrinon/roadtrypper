import React, { useState, useEffect, useContext, useRef } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMehBlank } from '@fortawesome/free-regular-svg-icons';

import SAMPLE_POIS from '../../../data/sample-pois';

import * as s from "./POIDetails.style";

import GalleryHeader from './GalleryHeader';
import CountingTextArea from './CountingTextArea';
import { TripDispatch } from './Studio';

function GalleryLoading() {
  return (
    <p>Loading</p>
  )
}

function NoPhotosFound({ poiId }) {
  const [formVisible, setFormVisible] = useState(false);

  const fileRef = useRef();
  const descRef = useRef();

  const dispatch = useContext(TripDispatch);

  function addPhoto(e) {
    e.preventDefault();
    // get filename
    let path = fileRef.current.value.match(/(\\|\/)(?!.+(\\|\/).+)(?<path>.+)/).groups.path;
    let description = descRef.current.value;

    dispatch({
      type: "add",
      payload: {
        type: "photos",
        fkname: "poiId",
        fkid: poiId,
        path,
        description
      }
    });
  }

  return (
    <div className="no-photos-found">
      <FontAwesomeIcon icon={faMehBlank} />
      <h1>No Photos Found</h1>
      <button onClick={() => setFormVisible(true)}>Click here to add photos.</button>
      <s.ToggleVisibilityDiv visible={formVisible}>
        <form onSubmit={addPhoto}>
          <input ref={fileRef} id={"photo-file"} accept="image/*" type="file" required={true} />
          <CountingTextArea
            ref={descRef}
            textAreaId={"photo-description"}
            labelText={"Description (Optional)"}
            limit={500}
            classNames={["photo-description"]}
          />
          <button type="submit">Add Photo</button>
        </form>
      </s.ToggleVisibilityDiv>
    </div>
  )
}

function GalleryView({ SAMPLE_IMAGES, startingPhoto, startingIndex, poiPhotos, poiId, closeGalleryView }) {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState(poiPhotos);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeIndex, setActiveIndex] = useState(startingIndex);

  const GalleryView = styled.div`
    border: 1px solid fuchsia;
  `

  const Photo = styled.img`
    border: 1px solid orange;
  `

  //⛳ This updates the photos for the gallery if poiPhotos changes
  useEffect(() => {
    setPhotos(prevPhotos => {
      // Move to uploaded image if user chooses to add an image.
      if (prevPhotos.length < poiPhotos.length) {
        setActiveIndex(poiPhotos.length - 1);
      }
      // In deletion cases --
      // when the current activeindex is equal to the end of the array
      else if (prevPhotos.length > poiPhotos.length) {
        // (When the user just deleted the last photo)
        // we need to move the activeindex back one
        if (activeIndex === prevPhotos.length - 1) {
          setActiveIndex(prevActiveIndex => prevActiveIndex - 1);
        }
      }
      /* ⛳ Full Explanation of Delete Bug
      • In GalleryHeader, the user presses DELETE which dispatches delete
        to the reducer.
      • POIDetails updates `poiPhotos`
      • Since GalleryView is listening to changes for `poiPhotos`, it refreshes
        its own photos to sync it with that of the POI. 
      • Additionally, if the user is parked on the last photo of the last photo,
        it means we have to also alter the `activeIndex`.
      • We alter the `activeIndex` to be that poiPhotos' last element.
      • If we don't do this, then the useEffect will call on an activeIndex
        for an undefined element, resulting in `undefined`, and hence React
        complaining about that TypeError.
      */

      return poiPhotos;
    });
  }, [poiPhotos])

  // This updates the activePhoto if the user edits it in the header.
  useEffect(() => {
    if (!photos[activeIndex]) {
      return;
    }

    console.log({ activeIndex, photos });

    prepPhotoForDisplay(photos[activeIndex]).then(result => {
      setActivePhoto(result);
    })

  }, [JSON.stringify(photos[activeIndex]), activeIndex])


  async function prepPhotoForDisplay(photo) {
    setLoading(true);

    let loadImg = () => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = SAMPLE_IMAGES[photo.path]; //! SAMPLE_FLAG

        console.log(img);

        img.onload = () => {
          setLoading(false);
          resolve(img);
        }

        img.onerror = () => {
          setLoading(false);
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

  function determineRender() {
    if (photos.length <= 0) {
      return <NoPhotosFound poiId={poiId} />
    }


    return loading ?
      (<GalleryLoading />) :
      (
        <>
          {<GalleryHeader activePhoto={photos[activeIndex]} />}
          {activePhoto}
          {photos.length > 1 && controls}
        </>
      )
  }

  return (
    <GalleryView>
      <button onClick={() => closeGalleryView()}>
        <span>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        Exit Gallery View
      </button>
      <div className="exhibition">
        {determineRender()}
      </div>
    </GalleryView>
  )
}

export default GalleryView