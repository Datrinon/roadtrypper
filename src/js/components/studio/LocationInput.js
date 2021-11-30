import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';

// le geosearch
import L from "leaflet";
import { getLIcon } from './LeafletIcon';
import { MapInstance, TripContext } from './Studio';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarked, faSpinner } from '@fortawesome/free-solid-svg-icons'

import SearchField from './SearchField';

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

/**
 * A search field component that will search locations using the nominatim API
 * and then return them onto the map. Has a callback prop which will invoke
 * with the coordinates of the shown location. Useful for adding or editing
 * a location.
 */
function LocationInput({ onClickPOIMarker }) {
  const mapRef = React.useContext(MapInstance);
  const searchRef = useRef();

  const searchMarker = useRef();

  const provider = useRef(new OpenStreetMapProvider({
    params: {
      limit: 5,
      addressdetails: 1
    }
  }));

  function registerPlaceOnMap(result) {
    // set the suggestion on the search box.
    searchRef.current.value = result.label;
    // stuck because the forminput doesn't know what the label will be.
    // and the HOC shouldnt know what the formInput ref is.
    // solution: get the ref in the input here, and then pass the ref to the created searchbar.

    const newPlaceIcon = getLIcon("ea4335");
    const placeNameText = result.label.split(", ")[0];

    if (searchMarker.current) {
      searchMarker.current.remove();
    }

    searchMarker.current = L.marker([result.y, result.x],
      {
        icon: newPlaceIcon,
        zIndexOffset: 1000,
        title: placeNameText
      })

    searchMarker.current.addTo(mapRef.current);

    // tooltip displaying the name of the place.
    const placeName = L.tooltip({
      offset: [0, 7.5],
      permanent: true,
      className: "poi-search-result"
    });
    placeName.setContent(placeNameText);

    searchMarker.current.bindTooltip(placeName).openTooltip();

    let container = document.createElement("div");
    let prompt = document.createElement('p');
    prompt.textContent = "Is this location OK?";
    let saveButton = document.createElement('button');
    saveButton.textContent = "Confirm";

    saveButton.addEventListener("click", (e) => {
      onClickPOIMarker([result.y, result.x]);
      searchMarker.current.remove();
    });

    container.append(prompt, saveButton);

    searchMarker.current.bindPopup(container).openPopup();

    // now fit the bounds of the map.
    mapRef.current.flyToBounds(result.bounds, { padding: L.point(15, 15) });
  }

  function mapLocationResultsToElem(result, index) {
    const label = result.label.split(", ");

    return (
      <ListingBox
        key={index}
        onClick={registerPlaceOnMap.bind(null, result)}
        tabIndex={-1}>
        <MapIcon icon={faMapMarked} />
        <ListingLabel>
          <ListingName className="listing-name">
            {label.shift()}
          </ListingName>
          {label.length >= 1 && ", "}
          {label.join(", ")}
        </ListingLabel>
      </ListingBox>

    );
  }

  function fetchLocations() {
    return provider.current.search({
      query: searchRef.current.value,
    });
  }

  return (
    <SearchField
      ref={searchRef}
      fetchForSuggestions={fetchLocations}
      suggestionMap={mapLocationResultsToElem}
      onSearchCallback={registerPlaceOnMap}
      debounceTimer={1000}
      fasterFirstSearch={250}
      classNames={["edit-location-poi"]} />
  )
}

export default LocationInput
