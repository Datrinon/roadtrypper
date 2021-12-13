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

import SearchField from '../shared/SearchField';

import * as s from '../styled/template.style';


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
      });

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
      onClickPOIMarker(result);
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
      <s.ListingBox
        key={Date.now()}
        onClick={registerPlaceOnMap.bind(null, result)}
        tabIndex={-1}>
        <s.FAIcon icon={faMapMarked} />
        <s.ListingLabel>
          <s.ListingName className="listing-name">
            {label.shift()}
          </s.ListingName>
          {label.length >= 1 && ", "}
          {label.join(", ")}
        </s.ListingLabel>
      </s.ListingBox>

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
