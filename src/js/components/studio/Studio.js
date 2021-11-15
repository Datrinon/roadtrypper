import React, { useEffect, useState, useReducer } from 'react'
import PropTypes from 'prop-types';
import { TRIP_ACTIONS, tripReducer } from './tripDetailsReducer';

import { MOCK_TRIP_ID } from '../../../data/sample-days';
import * as DB from "../../database/data.js";

// Components
import DayCard from './DayCard';
import Map from "./Map";
import PoiDetails from './POIDetails';

// Page Loading Management
import STATE from "../ComponentState";


// Only the details need a dispatch and global context, the general
// trip info can be passed around as normal state.
export const TripDispatch = React.createContext(null);
export const TripContext = React.createContext(null);


function Studio({ tripId }) {
  const abortController = new AbortController(); // ! Use this later when you fetch data from fbase.
  const [trip, tripDispatch] = useReducer(tripReducer, null);
  const [pageState, setPageState] = useState(STATE.LOADING);
  const [activePin, setActivePin] = useState(null);

  function mapDayDataToCards() {
    const cards = trip.map((day) => (
      <DayCard
        key={day.tripid + day.order}
        data={day}
      />
    ));

    return cards;
  }

  useEffect(() => {
    DB.loadProjectData(tripId, abortController)
      .then((tripData) => {
        tripDispatch({
          type: 'load',
          payload: tripData
        });

        setPageState(STATE.READY)
      })
      .catch((e) => console.log(e));
    
    return () => {
      // Aborts any fetch request.
      abortController.abort();
    }
  }, []);

  function onChangeTitle(e) {
    // setTrip({
    //   ...trip,
    //   title: e.target.value,
    //   lastUpdated: Date.now()
    // });
  }

  if (pageState === STATE.LOADING) {
    return <div>Loading</div>;
  }

  console.log(trip);
  return (
    <TripContext.Provider value={trip}>
      <TripDispatch.Provider value={tripDispatch}>
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
          <Map daysData={trip} setActivePin={setActivePin} />
          <PoiDetails activePin={activePin} />
        </div>
      </TripDispatch.Provider>
    </TripContext.Provider>
  )
}

Studio.defaultProps = {
  tripId: MOCK_TRIP_ID
}

Studio.propTypes = {
  tripId: PropTypes.string
}

export default Studio;