import React, { useEffect, useState, useReducer, useRef } from 'react'
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
import Sidebar from './Sidebar';


// Only the details need a dispatch and global context, the general
// trip info can be passed around as normal state.
export const TripDispatch = React.createContext(null);
export const TripContext = React.createContext(null);
export const MapInstance = React.createContext(null);

function Studio({ tripId }) {
  const abortController = new AbortController(); // ! Use this later when you fetch data from fbase.
  const [trip, tripDispatch] = useReducer(tripReducer, null);
  const [pageState, setPageState] = useState(STATE.LOADING);
  const [activePin, setActivePin] = useState(null);
  const mapRef = useRef();

  function mapDayDataToCards() {
    const cards = trip.days.map((day) => {

      const pois = trip.pois.filter(poi => poi.dayId === day.id);

      return <DayCard
        key={trip.general.uid + day.id}
        day={day}
        pois={pois}
      />
    });

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

  function addDay() {
    let randomColor = "";
    for (let i = 0; i < 3; i++) {
      let result = Math.round(Math.random() * 256).toString(16).padStart(2, '0');
      randomColor += result;
    }

    tripDispatch({
      type: "add",
      payload: {
        type:"days",
        fkname: null,
        fkid: null,
        tripId: trip.days[0].tripId,
        order: trip.days.length,
        title: "",
        color: randomColor, 
      }
    })
  }

  if (pageState === STATE.LOADING) {
    return <div>Loading</div>;
  }

  console.log(trip);
  return (
    <TripContext.Provider value={trip}>
      <MapInstance.Provider value={mapRef}>
        <TripDispatch.Provider value={tripDispatch}>
          <div>
            <p>DEV MODE: STUDIO PAGE.</p>
            <input
              className="trip-title"
              placeholder="Untitled Trip"
              value={trip.title}
              onChange={onChangeTitle} />
            <div className="add-options">
              <button className="add-day" type="button" onClick={addDay}>Add Day</button>
              <button className="add-POI" type="button">Add POI</button>
            </div>
            <div className="days">
              {mapDayDataToCards()}
            </div>
            <Map data={trip} setActivePin={setActivePin} />
            <Sidebar collapseState={!activePin}>
              <PoiDetails activePin={activePin} />
            </Sidebar>
          </div>
        </TripDispatch.Provider>
      </MapInstance.Provider>
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