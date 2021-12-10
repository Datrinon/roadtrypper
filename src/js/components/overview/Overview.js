import React, { useEffect, useRef, useState, useContext } from 'react'

import * as s from '../styled/template.style'
import * as overviewStyle from './Overview.style';

// components
import AccountIcon from '../shared/AccountIcon'
import SearchField from '../shared/SearchField'
import { loadSampleTrip, loadTrips } from '../../database/data';
import TripCard from './TripCard';
import AddTrip from './AddTrip';
import { UserContext } from '../Router';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { stringify } from '@firebase/util';


/**
 * This shows us all the trips in the user's account.
 * @returns 
 */
function Overview() {
  const [trips, setTrips] = useState(null);
  const abort = useRef(new AbortController());

  const user = useContext(UserContext);

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
    let query = searchRef.current.value.toLowerCase();

    if (query.length < 3) {
      return;
    }

    let matchingTrips = trips.filter(trip => trip.title.toLowerCase().includes(query));

    console.log(matchingTrips);

    if (matchingTrips.length !== 0) {
      matchingTrips = matchingTrips.map(elem => {
        let split = elem.title.toLowerCase().split(query);
        // it's always goigng to be in the middle.
        let highlightedResult = (
          <span>{split[0]}
            <s.ListingSubstrMatch>{query}</s.ListingSubstrMatch>
            {split[1]}
          </span>
        )
        return {
          match: highlightedResult,
          tripId: elem.tripId
        }
      })
    }

    return matchingTrips;
  }

  function mapSearchResultsToElem(result, index) {

    return (
      <s.ListingBox
        key={index}
        onClick={(e) => alert("TODO")}
        tabIndex={-1}>
        <s.FAIcon icon={faMap} />
        <s.ListingLabel className="listing-name">
          {result.match}
        </s.ListingLabel>
      </s.ListingBox>
    );
  }

  useEffect(() => {

    loadTrips(user, abort.current)
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
          debounceTimer={400}
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
            key={trip.tripId}
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
