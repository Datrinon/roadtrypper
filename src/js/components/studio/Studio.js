import React, { useEffect, useState, useReducer } from 'react'
import PropTypes from 'prop-types';
import { TRIP_DETAIL_ACTIONS, tripDetailsReducer } from './tripDetailsReducer';

import { SAMPLE_DAYS, MOCK_TRIP_ID } from '../../../data/sample-days';
import SAMPLE_TRIP from "../../../data/sample-trip.json";

import DayCard from './DayCard';
import Map from "./Map";

import COMPONENT_STATE from "../ComponentState";
import PoiDetails from './POIDetails';


// Only the details need a dispatch and global context, the general
// trip info can be passed around as normal state.
export const TripDetailsDispatch = React.createContext(null);
export const TripDetailsContext = React.createContext(null);

function Studio({ tripData, tripDetailsData }) {
  const abortController = new AbortController();
  const [pageState, setPageState] = useState(COMPONENT_STATE.READY);
  const [trip, setTrip] = useState(tripData);
  const [tripDetails, tripDetailsDispatch] = useReducer(tripDetailsReducer, tripDetailsData);
  const [activePin, setActivePin] = useState(null);

  function mapDayDataToCards() {
    const cards = tripDetails.map((day) => (
      <DayCard
        key={day.tripid + day.order}
        data={day}
      />
    ));

    return cards;
  }

  function onChangeTitle(e) {
    setTrip({
      ...trip,
      title: e.target.value,
      lastUpdated: Date.now()
    });

    console.log(trip);
  }

  return (
    <TripDetailsContext.Provider value={tripDetails}>
      <TripDetailsDispatch.Provider value={tripDetailsDispatch}>
        <div>
          <p>DEV MODE: STUDIO PAGE.</p>
          <input
            className="trip-title"
            placeholder="Untitled Trip"
            value={trip.title}
            onChange={onChangeTitle} />
          <div className="add-options">
            <button className="add-day" type="button">Add Day</button>
            <button className="add-POI" type="button">Add POI</button>
          </div>
          <div className="days">
            {mapDayDataToCards()}
          </div>
          <Map daysData={tripDetails} setActivePin={setActivePin} />
          <PoiDetails activePin={activePin} />
        </div>
      </TripDetailsDispatch.Provider>
    </TripDetailsContext.Provider>
  )
}

Studio.defaultProps = {
  tripData: SAMPLE_TRIP,
  tripDetailsData: SAMPLE_DAYS
}

Studio.propTypes = {

}

export default Studio;