import React, { useEffect, useRef, useState, useContext } from 'react'

import * as s from '../styled/template.style'
import * as oS from './styled/Overview.style';

// components
import AccountIcon from '../shared/AccountIcon'
import SearchField from '../shared/SearchField'
import { loadSampleTrip, loadTrips } from '../../database/data';
import TripCard from './TripCard';
import AddTrip from './AddTrip';
import { UserContext } from '../Router';
import { faArrowDown, faArrowUp, faMap } from '@fortawesome/free-solid-svg-icons';
import { stringify } from '@firebase/util';
import HomeLogo from '../shared/HomeLogo';
import { useHistory } from 'react-router-dom';


// css
import "../../../css/OverviewSearchbar.css";
import { Helmet } from 'react-helmet';

/**
 * This shows us all the trips in the user's account.
 * @returns 
 */
function Overview() {
  const [trips, setTrips] = useState(null);
  const abort = useRef(new AbortController());

  const user = useContext(UserContext);

  const searchRef = useRef();
  const history = useHistory();

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

  function loadTripFromSearch(result) {
    history.push("/trips/" + result.tripId);
  }

  function mapSearchResultsToElem(result, index) {
    return (
      <s.ListingBox
        key={index}
        onClick={loadTripFromSearch.bind(null, result)}
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
    return null;
    // return (
    //   <p>Loading...</p>
    // )
  }

  console.log(trips);

  return (
    <div>
      <Helmet>
        <title>My Trips - RoadTrypper</title>
      </Helmet>
      <oS.OverviewHeader>
        <oS.HeaderContent>
          <HomeLogo />
          <SearchField
            ref={searchRef}
            fetchForSuggestions={fetchTrips}
            suggestionMap={mapSearchResultsToElem}
            // Intentionally pass in a stub to ensure nothing is done.
            onSearchCallback={loadTripFromSearch} 
            debounceTimer={400}
            fasterFirstSearch={null}
            placeholder={"Search for a trip..."}
            classNames={["trips-search"]} />
          <AccountIcon />
        </oS.HeaderContent>
      </oS.OverviewHeader>
      <AddTrip />
      <oS.TripCardContainer>
        <oS.TripCardHeading>My Trips</oS.TripCardHeading>
        <oS.SortContainer>
          <oS.SortButton onClick={sortTrips.bind(null, "title")}>
            <span>Title</span>
            {titleDescOrder
              ? <s.FAIcon icon={faArrowDown} />
              : <s.FAIcon icon={faArrowUp} />}
          </oS.SortButton>
          <oS.SortButton onClick={sortTrips.bind(null, "date")}>
            <span>Date</span>
            {dateDescOrder
              ? <s.FAIcon icon={faArrowDown} />
              : <s.FAIcon icon={faArrowUp} />}
          </oS.SortButton>
        </oS.SortContainer>
        <oS.TripCardLayout>
          {
            trips.length > 0 ?
            trips.map(trip => {
              return <TripCard
                key={trip.tripId}
                trip={trip}
                setTrips={setTrips}
              />
            }) :
            <>
              <oS.NoDataWarning>No trips available. Click the + below to add a new trip.</oS.NoDataWarning>
            </>
        }
        </oS.TripCardLayout>
      </oS.TripCardContainer>
    </div>
  )
}



export default Overview
