import React, { useEffect, useState, useReducer, useRef } from 'react'
import PropTypes from 'prop-types';
import { TRIP_ACTIONS, tripReducer } from './tripDetailsReducer';

import { MOCK_TRIP_ID } from '../../../data/sample-days';
import * as DB from "../../database/data.js";

// Components
import DayCard from './DayCard';
import Map from "./Map";
import PoiDetails from './POIDetails';
import AddDay from './AddDay';
import AddPOI from './AddPOI';
import DayDetails from './DayDetails';

// Page Loading Management
import STATE from "../ComponentState";
import Sidebar from './Sidebar';
import useSidebar from '../../hooks/useSidebar';


// ! code begin
export const TripDispatch = React.createContext(null);
export const TripContext = React.createContext(null);
export const TripId = React.createContext(null);
export const MapInstance = React.createContext(null);
export const SidebarSetter = React.createContext(null);

function Studio({ tripId }) {
  const abortController = new AbortController(); // ! Use this later when you fetch data from fbase.
  const [trip, tripDispatch] = useReducer(tripReducer, null);
  const [pageState, setPageState] = useState(STATE.LOADING);
  const [activePin, setActivePin] = useState(null);
  const [activeDay, setActiveDay] = useState(null);

  const [sidebarValues, sidebarSetter, sidebarRef] = useSidebar();

  const mapRef = useRef();

  /**
   * Takes each day in the day array and maps it into a card.
   */
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

  // This useEffect is for loading data.
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

  //TODO Stub for title manipulation. Finish later.
  function onChangeTitle(e) {
    // setTrip({
    //   ...trip,
    //   title: e.target.value,
    //   lastUpdated: Date.now()
    // });
  }

  useEffect(() => {
    console.log(activePin);
    if (activePin !== null) {
      sidebarSetter.setContent(<PoiDetails activePin={activePin.poi} />);
      sidebarSetter.setVisible(true);
    }
  }, [activePin]);

  // sets the active day. for now
  // !TODO
  // As we develop activeDay is the priority, but in production activePin should
  useEffect(() => {
    if (activeDay !== null) {
      sidebarSetter.setContent(<DayDetails activeDay={activeDay} />);
      sidebarSetter.setVisible(true);
    }
  }, [activeDay]);


  //#region :Render Logic
  if (pageState === STATE.LOADING) {
    return <div>Loading</div>;
  }

  console.log(trip);
  return (
    <TripId.Provider value={tripId}>
      <TripContext.Provider value={trip}>
        <MapInstance.Provider value={mapRef}>
          <TripDispatch.Provider value={tripDispatch}>
            <SidebarSetter.Provider value={sidebarSetter}>
              <div style={{ padding: "25px 5px" }}>
                <p>DEV MODE: STUDIO PAGE.</p>
                <input
                  className="trip-title"
                  placeholder="Untitled Trip"
                  value={trip.title}
                  onChange={onChangeTitle} />
                <div className="add-options">
                  <AddDay setActiveDay={setActiveDay} />
                  <AddPOI activeDay={activeDay}/>
                </div>
                <div className="days">
                  {mapDayDataToCards()}
                </div>
                <Map
                  data={trip}
                  setActivePin={setActivePin}
                  setActiveDay={setActiveDay} />
                <Sidebar
                  ref={sidebarRef}
                  visible={sidebarValues.visible}
                  content={sidebarValues.content}
                />
              </div>
            </SidebarSetter.Provider>
          </TripDispatch.Provider>
        </MapInstance.Provider>
      </TripContext.Provider>
    </TripId.Provider>
  )
  //#endregion
}

Studio.defaultProps = {
  tripId: MOCK_TRIP_ID
}

Studio.propTypes = {
  tripId: PropTypes.string
}

export default Studio;