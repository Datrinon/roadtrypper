import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';

// le geosearch
import L from "leaflet";
import { getLIcon } from './LeafletIcon';
import { MapInstance, TripContext, TripDispatch } from './Studio';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarked, faSpinner } from '@fortawesome/free-solid-svg-icons'



const ListingBox = styled.button`
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

function EditLocationInput() {
  const mapRef = React.useContext(MapInstance);
  const poiLocationEditRef = useRef();
  const [onFirstSearch, setOnFirstSearch] = useState(true);
  // if submit is pressed before suggestions come up, we don't show suggestions.
  const [submitPressed, setSubmitPressed] = useState(false);
  const [invalidSearchTerm, setInvalidSearchTerm] = useState(null);
  const currentFocused = useRef(0);
  const searchMarker = useRef();

  const showSuggestions = debounce(handleEditLocation, (onFirstSearch ? 250 : 1000));

  const provider = new OpenStreetMapProvider({
    params: {
      limit: 5,
      addressdetails: 1
    }
  });

  const [suggestions, setSuggestions] = useState(null);

  function registerPlaceOnMap(result) {
    // clear out suggestions box
    setSuggestions();
    // set the suggestion on the search box.
    poiLocationEditRef.current.value = result.label;

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

    // now fit the bounds of the map.
    mapRef.current.flyToBounds(result.bounds, { padding: L.point(15, 15) });
  }

  function renderSearchResults(results) {
    const listedResults = results.map((result, index) => {
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
            , {label.join(", ")}
          </ListingLabel>
        </ListingBox>

      )
    });

    setSuggestions(listedResults);
  }

  async function handleEditLocation() {
    if (onFirstSearch) {
      setOnFirstSearch(false);
    }
    if (poiLocationEditRef.current.value.length === 0) {
      setSuggestions();
      return;
    }
    try {
      const results = await provider.search({
        query: poiLocationEditRef.current.value,
      });

      renderSearchResults(results);
    } catch (error) {
      console.log(error);
    }

  }

  /**
   * When the user presses the search button, show the first result from the
   * query. 
   * @param {*} e - Submit Event.
   */
  async function handleSearch(e) {
    e.preventDefault();

    // clear out invocations queue.
    showSuggestions.cancel();
    // clear suggestions field.
    setSuggestions();

    // disable search button to prevent api from being overloaded.
    setSubmitPressed(true);

    const results = await provider.search({
      query: poiLocationEditRef.current.value,
    });

    setSubmitPressed(false);

    if (results[0]) {
      registerPlaceOnMap(results[0]);
    } else {
      // else invalid search, and just show the user no place found.  
      setInvalidSearchTerm(poiLocationEditRef.current.value);
    }
  }

  // this handles behavior for arrow key navigation.
  const handleArrowKeyPress = (e) => {
    // first, filter out any non-arrow key presses.
    if (e.code !== "ArrowDown" && e.code !== "ArrowUp") {
      return;
    }
    // at this point, disable arrow key behavior.
    e.preventDefault();

    // now we can query select all the elements. (input field + all search results)
    const focusables = Array.from(document.body.querySelectorAll(
      ".search-field, .search-results > *:not(search-result-failure)"
    ));

    // focus on the element with index equal to currentFocused 

    // then, focus on the next or previous element.
    switch (e.code) {
      case "ArrowDown":
        console.log("Down");
        nextFocused(focusables);
        break;
      case "ArrowUp":
        console.log("Up");
        previousFocused(focusables);
        break;
      default:
        return;
    }
  }

  function nextFocused(focusables) {

    if (currentFocused.current >= (focusables.length - 1)) {
      currentFocused.current = 0;
    } else {
      currentFocused.current = currentFocused.current + 1;
    }

    focusables[currentFocused.current].focus();
  }

  function previousFocused(focusables) {
    if (currentFocused.current - 1 < 0) {
      currentFocused.current = (focusables.length - 1);
    } else {
      currentFocused.current = currentFocused.current - 1;
    }

    focusables[currentFocused.current].focus();
  }

  function toggleArrowKeyUsage(e) {
    // this allows interactivity with arrow keys in the first place.
    switch (e.type) {
      case 'focus': // focus in
        console.log("focus in");
        window.onkeydown = handleArrowKeyPress;
        break;
      default:
        console.log("focus out");
        window.onkeydown = null;
        break;
    }
  }

  return (
    <form
      onFocus={toggleArrowKeyUsage}
      onBlur={toggleArrowKeyUsage}
      onSubmit={handleSearch}>
      <div>
        <input
          className="details poi-location-edit search-field"
          ref={poiLocationEditRef}
          // Set to 1000 because of nominatim's usage policy requirements.
          onKeyDown={showSuggestions}
          onChange={() => setInvalidSearchTerm(null)}
          type="search"
          disabled={submitPressed}
        />
        <button type="submit" disabled={submitPressed}>Search</button>
        {
          submitPressed &&
          <span className="loading">
            <FontAwesomeIcon icon={faSpinner} />
          </span>
        }
      </div>
      <div className="search-results">
        {suggestions}
        {
          invalidSearchTerm &&
          <div className="search-result-failure">
            No locations found for '{invalidSearchTerm}'.
          </div>
        }
      </div>
    </form>
  )
}
export default EditLocationInput
