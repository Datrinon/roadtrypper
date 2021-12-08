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
          className={["trips-search"]} />
      </s.Header>
      Overview.
    </div>
  )
}

export default Overview
