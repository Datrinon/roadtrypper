import React, { useEffect, useRef, useState } from 'react'

import * as s from '../styled/template.style'
import * as overviewStyle from './Overview.style';

// components
import AccountIcon from '../shared/AccountIcon'
import SearchField from '../shared/SearchField'
import { loadSampleTrip } from '../../database/data';
import TripCard from './TripCard';
import AddTrip from './AddTrip';


/**
 * This shows us all the trips in the user's account.
 * @returns 
 */
function Overview() {
  const [trips, setTrips] = useState(null);
  const abort = useRef(new AbortController());

  const searchRef = useRef();

  // sorts
  const [titleDescOrder, setTitleDescOrder] = useState(false);
  const [dateDescOrder, setDateDescOrder] = useState(true);

  function sortTrips(type) {
    const tripsCopy = [...trips];

    switch (type) {
      case "title":
        tripsCopy.sort((tripA, tripB) => {
          if (tripA.title < tripB.title) {
            return titleDescOrder ? -1 : 1;
          }
          if (tripA.title > tripB.title) {
            return titleDescOrder ? 1 : -1;
          }

          return 0;
        })

        setTitleDescOrder(prevState => !prevState);

        break;
      case "date":

        tripsCopy.sort((tripA, tripB) => {
          if (tripA.lastAccessed < tripB.lastAccessed) {
            return dateDescOrder ? 1 : -1;
          }

          if (tripA.lastAccessed > tripB.lastAccessed) {
            return dateDescOrder ? -1 : 1;
          }

          return 0;
        })

        setDateDescOrder(prevState => !prevState);

        break;
      default:
        break;
    }

    setTrips(tripsCopy);
    /**
     * TODO here.
     * 1. Ascending Sorts
     * 2. Descending Sorts
     * 3. Sort aggregate.
     */
  }

  function fetchTrips() {

  }

  function mapSearchResultsToElem() {

  }

  useEffect(() => {

    loadSampleTrip(abort.current, true)
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
      <AddTrip />
      <div>
        Sorter.
        <button onClick={sortTrips.bind(null, "title")}>
          Sort by title {titleDescOrder ? "desc" : "asc"}
        </button>
        <button onClick={sortTrips.bind(null, "date")}>
          Sort by date {dateDescOrder ? "desc" : "asc"}
        </button>
      </div>
      <overviewStyle.TripCardLayout>
        {trips.map(trip => {
          return <TripCard
            key={trip.id}
            trip={trip} />
        })}
      </overviewStyle.TripCardLayout>
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
