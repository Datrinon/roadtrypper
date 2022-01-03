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
function LocationInput({ onClickPOIMarker, classNames = [], placeholder = "" }) {
  const mapRef = React.useContext(MapInstance);
  const searchRef = useRef();

  const savedSearchResultMarker = useRef();
  const searchResultMarker = useRef();

  const provider = useRef(new OpenStreetMapProvider({
    params: {
      limit: 5,
      addressdetails: 1
    }
  }));

  const sidebarObserver = useRef();


  useEffect(() => {
    // monitor the sidebar
    const detailsSidebar = document.querySelector(".details-sidebar");
    // specifically its attributes
    const config = { attributes: true };
    const removeSearchMarker = () => {
      // get the display of the element.
      // if set to none, we remove the searchMarker.
      // as that indicates the user has exited the sidebar.
      const displayStatus = window.getComputedStyle(detailsSidebar).getPropertyValue('display');
      console.log(displayStatus);
      if (displayStatus === "none") {
        searchResultMarker.current?.remove();

        savedSearchResultMarker.current?.remove();
      }
    }

    sidebarObserver.current = new MutationObserver(removeSearchMarker);

    sidebarObserver.current.observe(detailsSidebar, config);

    return () => {
      sidebarObserver.current.disconnect();
    }
  }, []);


  function registerPlaceOnMap(result) {
    // is the user below mobile breakpoint? if so, we want to target the two sidebars
    // only if they're open, though. only then do we want to collapse them.
    if (document.documentElement.clientWidth < 768) {
      document
        .querySelectorAll(".sidebar.not-collapsed .sidebar-toggle-button")
        .forEach(button => {
          button.click();
        })
    }

    // set the suggestion on the search box.
    searchRef.current.value = result.label;

    const newPlaceIcon = getLIcon("ea4335");
    const placeNameText = result.label.split(", ")[0];

    if (searchResultMarker.current) {
      searchResultMarker.current.remove();
    }

    searchResultMarker.current = L.marker([result.y, result.x],
      {
        icon: newPlaceIcon,
        zIndexOffset: 1000,
        title: placeNameText
      });

    searchResultMarker.current.addTo(mapRef.current);

    // tooltip displaying the name of the place.
    const placeName = L.tooltip({
      offset: [0, 7.5],
      permanent: true,
      className: "poi-search-result"
    });
    placeName.setContent(placeNameText);

    searchResultMarker.current.bindTooltip(placeName).openTooltip();

    let container = document.createElement("div");
    let prompt = document.createElement('p');
    prompt.textContent = "Is this location OK?";
    let saveButton = document.createElement('button');
    saveButton.textContent = "Confirm";

    saveButton.addEventListener("click", (e) => {
      savedSearchResultMarker.current = onClickPOIMarker(result);
      searchResultMarker.current.remove();
      document
        .querySelector(".details-sidebar.collapsed .sidebar-toggle-button")
        .click();
    });

    container.append(prompt, saveButton);

    searchResultMarker.current.bindPopup(container).openPopup();

    // now fit the bounds of the map.
    mapRef.current
      .flyToBounds(result.bounds,
        {
          padding: L.point(15, 15),
          maxZoom: 13
        });
  }

  function mapLocationResultsToElem(result, index) {
    const label = result.label.split(", ");

    return (
      <s.ListingBox
        key={index}
        onClick={registerPlaceOnMap.bind(null, result)}
        tabIndex={-1}>
        <s.FAIcon icon={faMapMarked} />
        <s.ListingLabel className="listing-result-text">
          <s.ListingName className="listing-result-text-match">
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
      placeholder={placeholder}
      classNames={[`edit-location-poi ${[...classNames]}`]} />
  )
}

export default LocationInput
