import React, { useState, useEffect, useContext, useRef } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
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

function NoPhotosFound({poiId}) {
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
    // guard condition here means that all photos have been eliminated...
    // which means we need to display something else.
    if (activeIndex === -1) {
      setActivePhoto(<NoPhotosFound poiId={activePoiId}/>);
      return;
    }
    // !
    // TODO TESTING DELETE METHOD!!!!


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
      <button>
        <span>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        Exit Gallery View
      </button>
      <div className="exhibition">
        {
          loading ?
            (<GalleryLoading />) :
            (
              <>
                {activeIndex !== -1 && <GalleryHeader activePhoto={photos[activeIndex]} />}
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