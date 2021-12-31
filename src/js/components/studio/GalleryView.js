import React, { useState, useEffect, useContext, useRef } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faMehBlank } from '@fortawesome/free-regular-svg-icons';

import * as s from "./styled/POIDetails.style";
import * as g from "./styled/Gallery.styled";

import GalleryHeader from './GalleryHeader';
import CountingTextArea from './CountingTextArea';
import { TripContext, TripDispatch } from './Studio';
import LoadingImage from '../shared/LoadingImage';

import PLACEHOLDER_IMG from '../../../data/spin-32.gif';
import { v4 as uuidv4 } from 'uuid';
import { getBase64 } from '../../util/getbase64';


function GalleryLoading() {
  return (
    <p>Loading</p>
  )
}


function NoPhotosFound({ poiId, startingIndex }) {
  // if starting index = -1, then we send the user here immediately upon opening gallery view.
  const [formVisible, setFormVisible] = useState(startingIndex === -1 ? true : false);

  const fileRef = useRef();
  const descRef = useRef();
  const trip = useContext(TripContext);

  const dispatch = useContext(TripDispatch);

  async function addPhoto(e) {
    e.preventDefault();
    // get filename
    // let path = fileRef.current.value.match(/(\\|\/)(?!.+(\\|\/).+)(?<path>.+)/).groups.path;
    // let description = descRef.current.value;
    let file = fileRef.current.files[0];
    let path = `trips/${trip.tripId}/${uuidv4()}/${file.name}`;
    let description = descRef.current.value;

    dispatch({
      type: "add",
      payload: {
        type: "photos",
        fkname: "poiId",
        fkid: poiId,
        path: await getBase64(file),
        realpath: path,
        file,
        description
      }
    });
  }



  return (
    <div className="no-photos-found">
      <Warning visible={startingIndex !== -1}>
        <FontAwesomeIcon icon={faMehBlank} />
        No Photos Found
      </Warning>
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

let Warning = styled.h1`
  display: ${props => props.visible ? "initial" : "none"};
`




function GalleryView({ startingPhoto, startingIndex, poiPhotos, poiId, closeGalleryView }) {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState(poiPhotos);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeIndex, setActiveIndex] = useState(startingIndex);



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
      • Additionally, if the user is parked on the last photo of the gallery,
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

    setLoading(true);

    setActivePhoto(photos[activeIndex]);
  }, [JSON.stringify(photos[activeIndex]), activeIndex])

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
                key={"" + photo.id + index}
                src={photo.path}
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
      return <NoPhotosFound poiId={poiId} startingIndex={startingIndex} />
    }

    console.log(photos);

    return (
      <>
        {<GalleryHeader activePhoto={photos[activeIndex]} loading={loading}/>}
        <GalleryPhoto
          photo={photos[activeIndex]}
          callback={setLoading.bind(null, false)}
        />
        {photos.length > 1 && controls}
      </>
    )
  }

  return (
    <g.GalleryViewContainer>
      <g.GalleryButton
        data-tip="Exit"
        onClick={() => closeGalleryView()}>
        <span>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      </g.GalleryButton>
      {determineRender()}
    </g.GalleryViewContainer>
  )
}

function GalleryPhoto({ photo, callback }) {
  
  return (
    <g.GalleryFigure>
      <LoadingImage
        src={photo.path}
        alt={photo.description}
        callbackOnReady={callback}
        classNames={["photo"]}
      />
      <g.PhotoCaption
        className="caption"
        >{photo.description}</g.PhotoCaption>
    </g.GalleryFigure>
  )
}



export default GalleryView