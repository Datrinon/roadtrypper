import React, { useEffect, useState, useReducer } from 'react'
import PropTypes from 'prop-types';
import { TRIP_DETAIL_ACTIONS, tripDetailsReducer } from './tripDetailsReducer';

import { SAMPLE_DAYS, MOCK_TRIP_ID } from '../../../data/sample-days';
import SampleTrip from "../../../data/sample-trip.json";

import DayCard from './DayCard';

import PAGE_STATE from "../PageState";

function Studio({ projectId }) {
  const abortController = new AbortController();
  const [pageState, setPageState] = useState(PAGE_STATE.READY);
  const [trip, setTrip] = useState(SampleTrip);
  const [tripDetails, tripDetailsDispatch] = useReducer(tripDetailsReducer, SAMPLE_DAYS);


  function mapDayDataToCards() {
    const cards = tripDetails.map((day) => (
      <DayCard
        key={day.tripid + day.order}
        data={day}
      />
    ));

    return cards;
  }

  useEffect(() => {
  }, [])

  return (
    <div>
      <p>DEV MODE: STUDIO PAGE.</p>
      <input className="title" placeholder="Untitled Trip" />
      <div className="add-options">
        <button className="add-day" type="button">Add Day</button>
        <button className="add-POI" type="button">Add POI</button>
      </div>
      <div className="days">
        {pageState === PAGE_STATE.READY && mapDayDataToCards()}
      </div>
    </div>
  )
}

Studio.defaultProps = {
  projectId: MOCK_TRIP_ID
}

Studio.propTypes = {
  projectId: PropTypes.string
}

export default Studio;