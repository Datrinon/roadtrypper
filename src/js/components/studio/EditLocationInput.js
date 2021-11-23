import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';

// le geosearch
import L from "leaflet";
import { getLIcon } from './LeafletIcon';
import { MapInstance, TripContext, TripDispatch } from './Studio';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { debounce } from 'lodash';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

function EditLocationInput() {
  const mapRef = React.useContext(MapInstance);
  const poiLocationEditRef = useRef();
  const [onFirstSearch, setOnFirstSearch] = useState(true);
  // must be a stale closure issue.
  // doesn't get the updated state of the searchMarker since the function
  // is bound at the creation.
  const searchMarker = useRef();

  const provider = new OpenStreetMapProvider({
    params: {
      limit: 5,
      addressdetails: 1
    }
  });

  const [suggestions, setSuggestions] = useState(null);

  function registerPlaceOnMap(result) {
    const newPlaceIcon = getLIcon("FFFFFF");

    if (searchMarker.current) {
      searchMarker.current.remove();
    }

    searchMarker.current = L.marker([result.y, result.x],
      {
        icon: newPlaceIcon,
        zIndexOffset: 1000,
        title: result.label[0]
      })

    searchMarker.current.addTo(mapRef.current).bindPopup("Do you accept this location?").openPopup();

    // now fit the bounds of the map.
    mapRef.current.flyToBounds(result.bounds, { padding: L.point(15, 15) });
  }

  function renderSearchResults(results) {
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
    if (onFirstSearch) {
      setOnFirstSearch(false);
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
        onKeyDown={debounce(handleEditLocation, (onFirstSearch ? 250 : 1000))}
      />
      <div className="search-results">
        {suggestions}
      </div>
    </>
  )
}
export default EditLocationInput
