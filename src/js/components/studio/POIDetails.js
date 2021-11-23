// npm plugins
import React, { useState, useEffect, useContext, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { point } from 'leaflet';
// styled + css
import * as s from "./POIDetails.style";
import "../../../css/POIDetails.css";
// components
import HoverToEditInput from './HoverToEditInput';
import GalleryView from './GalleryView';

// trip information and reducer
import { MapInstance, TripContext, TripDispatch } from './Studio';
import POIDetailsEditForm from './POIDetailsEditForm';

// le geosearch
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons'

// ! TODO Remove this later when finished debugging.
function importSampleImages(r = require.context("../../../data/images", false, /\.(png|jpe?g|svg)$/)) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item)["default"]; });
  return images;
}

function PoiDetails({ activePin }) {
  const [activePoi, setActivePoi] = useState(activePin);
  const [collapsed, setCollapsed] = useState(!activePin);
  const [sampleImages, setSampleImages] = useState(importSampleImages()); // debug, remove later.
  const [day, setDay] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [galleryStartingIndex, setGalleryStartingIndex] = useState(null);

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  const poiDayEditRef = useRef();
  const poiLocationEditRef = useRef();
  const dayTitleEditRef = useRef();
  const poiTitleEditRef = useRef();
  const poiDescEditRef = useRef();

  function updateData() {
    setActivePoi(trip.pois.find(poi => poi.id === activePin.id));
    setDay(trip.days.find(day => day.id === activePin.dayId));
    setPhotos(trip.photos.filter(photo => photo.poiId === activePin.id));
  }


  useEffect(() => {
    setCollapsed(!activePin);
    if (!!activePin) {
      updateData();
    }
  }, [activePin, trip]);


  function launchGalleryView(index) {
    setGalleryStartingIndex(index);
  }

  function renderView() {

    //#region Belongs to Day
    let belongsToDayDisplay = (<h1>Day {day.order + 1}</h1>);
    let belongsToDayEdit = (
      <select
        name="poi-day"
        id="poi-day-select"
        defaultValue={day.order}
        ref={poiDayEditRef}>
        {
          // I just need the map to get the index function.
          trip.days.map((day, index) => {
            return <option
              key={index}
              value={index}>
              Day {index + 1}
            </option>
          })
        }
      </select>)

    let onBelongsToDayUpdate = () => {

      // if the selected day is the same, then don't update.
      if (poiDayEditRef.current.value === day.order) {
        return;
      }

      dispatch({
        type: "move_poi",
        payload: {
          id: activePoi.id,
          newDay: parseInt(poiDayEditRef.current.value)
        }
      })
    }

    let belongsToDayElement = (
      <HoverToEditInput
        displayVer={belongsToDayDisplay}
        editVer={belongsToDayEdit}
        onClickSave={onBelongsToDayUpdate} />
    );
    //#endregion

    //#region poi order
    //! TODO
    //#endregion

    const editLocationDisplay = (
      // Consider using the proper name of this location rather than just 
      // a generic button.
      <p>Some Location Here (To Add Later)</p>
    );

    const EditLocationInput = (() => {
      const mapRef = React.useContext(MapInstance);
      const [firstSearch, setFirstSearch] = useState(true);

      const provider = new OpenStreetMapProvider({
        params: {
          limit: 5,
          addressdetails: 1
        }
      });

      const [suggestions, setSuggestions] = useState(null);

      function renderSearchResults(results) {
        const ListingBox = styled.div`
          display: flex;
          flex-direction: row;
        `

        const ListingLabel = styled.p`
          max-width: 45ch;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin: 0.3em 0;
        `

        const ListingName = styled.span`
          font-weight: bold;
          font-size: 1.25em;
        `

        const MapIcon = styled(FontAwesomeIcon)`
          font-size: 1.25em;
          margin: 0 5px;
          align-self: center;
        `

        function registerPlaceOnMap(result) {
          console.log(mapRef);
        }

        const listedResults = results.map((result, index) => {

          const label = result.label.split(", ");

          return (
            <ListingBox key={index} onClick={registerPlaceOnMap.bind(null, result)}>
              <MapIcon icon={faMapMarked} />
              <ListingLabel>
                <ListingName className="listing-name">
                  {label.shift()}
                </ListingName>
                , {label.join(", ")}
              </ListingLabel>
            </ListingBox>

          )
        });

        setSuggestions(listedResults);
      }

      async function handleEditLocation() {
        if (firstSearch) {
          setFirstSearch(false);
        }
        if (poiLocationEditRef.current.value.length === 0) {
          setSuggestions();
          return;
        }
        try {
          const t0 = performance.now();
          const results = await provider.search({
            query: poiLocationEditRef.current.value,
          });
          const t1 = performance.now();
          console.log({ time: t1 - t0, results });
          renderSearchResults(results);
        } catch (error) {
          console.log(error);
        }

      }

      return (
        <>
          <input
            className="details poi-location-edit"
            ref={poiLocationEditRef}
            // Set to 1000 because of nominatim's usage policy requirements.
            onKeyDown={debounce(handleEditLocation, (firstSearch ? 250 : 1000))}
          />
          <div className="search-results">
            {suggestions}
          </div>
        </>
      )
    })

    const locationElement = (<HoverToEditInput
      displayVer={editLocationDisplay}
      editVer={<EditLocationInput />}
      onClickSave={(e) => console.log("Not implemented yet.")} />
    );

    //#endregion

    //#region Day Title
    let dayTitleDisplay = (<h2 className="details day">{day.title}</h2>);

    let dayTitleEdit = (<input
      className="details day-edit"
      defaultValue={day.title}
      ref={dayTitleEditRef} />);

    let onDayTitleSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "days",
          id: day.id,
          key: "title",
          value: dayTitleEditRef.current.value,
        }
      });
    };

    let dayTitleElement = (<HoverToEditInput
      displayVer={dayTitleDisplay}
      editVer={dayTitleEdit}
      onClickSave={onDayTitleSave} />)
    //#endregion

    //#region POI Title
    let poiTitleDisplay = (<h3 className="details poi title">{activePoi.title}</h3>)

    let poiTitleEdit = (<input
      className="details"
      defaultValue={activePoi.title}
      ref={poiTitleEditRef} />)

    let onPoiTitleSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "pois",
          id: activePoi.id,
          key: "title",
          value: poiTitleEditRef.current.value,
        }
      });
    }

    let poiTitleElement = (
      <HoverToEditInput
        displayVer={poiTitleDisplay}
        editVer={poiTitleEdit}
        onClickSave={onPoiTitleSave} />);
    //#endregion

    //#region Description
    const descDisplay = (<p className="details desc">{activePoi.description}</p>)

    const descEdit = (<textarea defaultValue={activePoi.description} ref={poiDescEditRef} />)

    const onDescSave = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "pois",
          id: activePoi.id,
          key: "description",
          value: poiDescEditRef.current.value,
        }
      });
    }

    let descElement = (
      <HoverToEditInput
        displayVer={descDisplay}
        editVer={descEdit}
        onClickSave={onDescSave}
      />
    )
    //#endregion

    function mapThumbnails(photo, index) {
      return (
        <figure
          key={"" + day.id + photo.id}>
          <s.Thumbnail
            src={sampleImages[photo.path]}
            onClick={launchGalleryView.bind(null, index)}
            alt={photo.description} />
        </figure>
      );
    }

    console.log(photos);

    return (
      <>
        {belongsToDayElement}
        {dayTitleElement}
        {poiTitleElement}
        {locationElement}
        {descElement}
        {
          photos.length > 0 ?
            photos.map(mapThumbnails) :
            (<button onClick={launchGalleryView.bind(null, -1)}>Add Photos</button>)
        }
      </>
    )
  }

  return (
    <div className={`poi-details ${collapsed && "collapsed"}`}>
      {collapsed ? "(currently collapsed)" : "(not collapsed)"}
      Show Pin Details here.
      {!collapsed && (
        <section className="poi-contents">
          {renderView()}
        </section>
      )}
      {!collapsed && galleryStartingIndex !== null && (
        <section className="gallery">
          <GalleryView
            SAMPLE_IMAGES={sampleImages}
            startingPhoto={photos[galleryStartingIndex]}
            startingIndex={galleryStartingIndex}
            poiPhotos={photos}
            poiId={activePoi.id}
            closeGalleryView={() => {
              setGalleryStartingIndex(null);
            }}
          />
        </section>
      )}
    </div>
  )
}


export default PoiDetails
