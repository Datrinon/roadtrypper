import React, { useEffect, useRef, useState } from 'react'

import * as s from '../styled/template.style'

// components
import AccountIcon from '../shared/AccountIcon'
import SearchField from '../shared/SearchField'
import { loadSampleTrip } from '../../database/data';
import TripCard from './TripCard';


/**
 * This shows us all the trips in the user's account.
 * @returns 
 */
function Overview() {
  const [trips, setTrips] = useState(null);
  const abort = useRef(new AbortController());

  const searchRef = useRef();

  function fetchTrips() {

  }

  function mapSearchResultsToElem() {

  }

  useEffect(() => {

    loadSampleTrip(abort.current)
    .then((trips) => {
      setTrips(trips);
    })
    .catch((e) => console.log(e));

    return () => {
      abort.current.abort();
    }
  }, []);

  if (trips === null) {
    return (
      <p>Loading...</p>
    )
  }

  console.log(trips);

  return (
    <div>
      <s.Header>
        Overview Header.
        <AccountIcon />
        <SearchField
          ref={searchRef}
          fetchForSuggestions={fetchTrips}
          suggestionMap={mapSearchResultsToElem}
          debounceTimer={250}
          fasterFirstSearch={null}
          placeholder={"Search for a trip..."}
          classNames={["trips-search"]} />
      </s.Header>
      <div>
        <button>(Floating Button) Start a New Trip</button>
      </div>
      <div>
        Contains Trip Cards
        {trips.map(trip => {
          return <TripCard
            key={trip.id}
            trip={trip} />
        })}
      </div>
      Overview.
      {/* 
      To Add:
      1. Trip Card Component
      2. Click interactivity to make card redirect to the studio
      3. Use a dummy ID please placed in the URL.
       */}
    </div>
  )
}

export default Overview
