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
import StudioHeader from './StudioHeader';
import { useParams } from 'react-router';


// ! code begin
export const TripDispatch = React.createContext(null);
export const TripContext = React.createContext(null);
export const TripId = React.createContext(null);
export const MapInstance = React.createContext(null);
export const SidebarSetter = React.createContext(null);

function Studio() {
  const tripId = useParams().tripId;
  console.log(tripId);

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
          key={day.id}
          setActiveDay={setActiveDay}
          day={day}
          pois={pois}
        />
      });

    return cards;
  }

  // This useEffect is for loading data.
  useEffect(() => {
    DB.loadTripData(tripId, abortController)
      .then((result) => {
        console.log("Supposedly, you would do a dispatch now.");
        console.log(result);
        tripDispatch({
          type: 'init',
          payload: result
        });

        setPageState(STATE.READY);
      })
      .catch((e) => console.error(e));


    // DB.loadSampleProjectData(tripId, abortController)
    //   .then((tripData) => {
    //     tripDispatch({
    //       type: 'init',
    //       payload: tripData
    //     });

    //     setPageState(STATE.READY);
    //   })
    //   .catch((e) => console.log(e));

    return () => {
      // Aborts any fetch request.
      abortController.abort();
    }
  }, []);

  function onChangeTitle(e) {
    tripDispatch({
      type: 'edit_general',
      payload: {
        type: 'general',
        id: trip.general.id,
        key: "title",
        value: e.target.value
      }
    });
  }

  useEffect(() => {
    console.log("Active Pin: ");
    console.log(activePin);
    if (activePin) {
      sidebarSetter.setContent(<PoiDetails
        activePin={activePin.data}
        setActivePin={setActivePin}
      />);
      sidebarSetter.setVisible(true);
    } else {
      sidebarSetter.setContent(null);
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
    console.log("Active Day: ");
    console.log({activeDay});
    if (activeDay) {
      sidebarSetter.setContent(<DayDetails
        setActivePin={setActivePin}
        setActiveDay={setActiveDay}
        day={activeDay.data}
      />);
      sidebarSetter.setVisible(true);
    } else {
      sidebarSetter.setContent(null);
    }
  }, [activeDay]);


  //trip debug
  useEffect(() => {
    console.log("trip debug");
    console.log(trip);

    // prevent stale active pois from occurring if the trip
    // was just reset.
    if (activePin) {
      setActivePin({data: trip.pois[activePin.data.id], time: Date.now()});
    }
  }, [trip]);

  //#region :Render Logic
  if (pageState === STATE.LOADING) {
    return <div>Loading</div>;
  }

  /**
   * Convert ms into an american (MM-DD-YYYY HH:MM AM/PM) timestamp.
   * @param {*} ms - value in ms
   * @returns 
   */
  function getTimestamp(ms) {
    let time = new Date(ms);

    let month = time.getMonth() + 1;
    let day = time.getDate();
    let year = time.getFullYear();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let period = "A.M.";
    if (hours > 12) {
      hours = hours - 12;
      period = "P.M.";
    }

    return `${month}/${day}/${year}, ${hours}:${minutes} ${period}`;
  }


  return (
    <TripId.Provider value={tripId}>
      <TripContext.Provider value={trip}>
        <MapInstance.Provider value={mapRef}>
          <TripDispatch.Provider value={tripDispatch}>
            <SidebarSetter.Provider value={sidebarSetter}>
              <StudioHeader />
              <div style={{ padding: "25px 5px" }}>
                <input
                  className="trip-title"
                  placeholder="Untitled Trip"
                  defaultValue={trip.general.title}
                  onBlur={onChangeTitle} />
                <p>Last Update: {getTimestamp(trip.general.lastAccessed)}</p>
                <div className="add-options">
                  <AddDay activeDay={activeDay} setActiveDay={setActiveDay} />
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