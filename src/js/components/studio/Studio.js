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
    const cards = trip.days
      .sort((dayA, dayB) => dayA.order - dayB.order)
      .map((day) => {
        const pois = trip.pois.filter(poi => poi.dayId === day.id);

        return <DayCard
          key={trip.general.uid + day.id}
          setActiveDay={setActiveDay}
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

  // sets the active day. 
  /*
    ? Q: Does it conflict with activePin?
      A: No, because remember these useEffect hooks only run if one of these
      values change. Since we're guaranteed only ONE will change between renders
      (the user can't click two items as one render), the sidebar will update
      with this latest content instead.
  */
  useEffect(() => {
    if (activeDay !== null) {
      sidebarSetter.setContent(<DayDetails day={activeDay} />);
      sidebarSetter.setVisible(true);
    }
  }, [activeDay]);

  useEffect(() => {
    if (activeDay) {
      // ? Caution: Will referential check be an issue for us here?
      // ? No, because use of the reducer guarantees an update.
      // ? Because it makes a clone of the state, which will 
      // ? have a different address.
      const activeDayUpdated = trip?.days.find(day => day.id === activeDay.id);
      setActiveDay(activeDayUpdated);
      // TODO
      // consider implementing this to refresh active pin
    }
  }, [trip?.days]);

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
                  <AddPOI activeDay={activeDay} />
                </div>
                <div className="days">
                  {mapDayDataToCards()}
                </div>
                <Map
                  data={trip}
                  setActivePin={setActivePin} />
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