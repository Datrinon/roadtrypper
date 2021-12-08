import React, { useRef } from 'react'

import * as s from '../styled/template.style'

// components
import AccountIcon from '../shared/AccountIcon'
import SearchField from '../shared/SearchField'


/**
 * This shows us all the trips in the user's account.
 * @returns 
 */
function Overview() {

  const searchRef = useRef();

  function fetchTrips() {

  }

  function mapSearchResultsToElem() {

  }

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
        Contains Trip Cards
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
