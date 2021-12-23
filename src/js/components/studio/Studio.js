import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { tripReducer } from './tripDetailsReducer';

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
import useReducerWithMiddleware from '../../hooks/useReducerWithMiddleware';
import updateDB from '../../database/afterware';
import LastUpdated from './LastUpdated';
import { onUpdatingEnd, onUpdatingStart } from '../../database/middleware';
import TripTitle from './TripTitle';
import LoadFailure from '../shared/LoadFailure';
import LoadingGfx from '../shared/LoadingGfx';
import LoadingStudio from './LoadingStudio';


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
  const [trip, tripDispatch] = useReducerWithMiddleware(tripReducer,
    null,
    [onUpdatingStart],
    [updateDB, onUpdatingEnd]);
  const [pageState, setPageState] = useState(STATE.LOADING);
  const [pageError, setPageError] = useState("");
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
      .catch((e) => {
        console.error(e);
        setPageState(STATE.FAILURE);
        setPageError(e.message);
      });

    return () => {
      // Aborts any fetch request.
      abortController.abort();
    }
  }, []);

  useEffect(() => {
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
  }, [activeDay])

  useEffect(() => {
    if (activePin) {
      sidebarSetter.setContent(<PoiDetails
        activePin={activePin.data}
        setActivePin={setActivePin}
      />);
      sidebarSetter.setVisible(true);
    } else {
      sidebarSetter.setContent(null);
    }
  }, [activePin])

  // useEffect(() => {
  //   console.log(activePin);
  //   if (!activePin && !activeDay) {
  //     sidebarSetter.setContent(null);
  //     return;
  //   } else if (activePin && !activeDay) {

  //     sidebarSetter.setContent(<PoiDetails
  //       activePin={activePin.data}
  //       setActivePin={setActivePin}
  //     />);
  //     sidebarSetter.setVisible(true);
  //   } else if (!activePin && activeDay) {

  //     sidebarSetter.setContent(<DayDetails
  //       setActivePin={setActivePin}
  //       setActiveDay={setActiveDay}
  //       day={activeDay.data}
  //     />);
  //     sidebarSetter.setVisible(true);
  //   } else if (activePin && activeDay) {
  //     console.log("Determining which to render on sidebar: ");
  //     // conflicting case
  //     // whichever has the latest time gets to be set.
  //     if (activePin.time > activeDay.time) {
  //       sidebarSetter.setContent(<PoiDetails
  //         activePin={activePin.data}
  //         setActivePin={setActivePin}
  //       />);
  //       sidebarSetter.setVisible(true);

  //     } else {

  //       sidebarSetter.setContent(<DayDetails
  //         setActivePin={setActivePin}
  //         setActiveDay={setActiveDay}
  //         day={activeDay.data}
  //       />);
  //       sidebarSetter.setVisible(true);

  //     }
  //   }

  // TODO
  // If this is actually valid
  // then you're gonna want to 
  // refactor setVisible true to the end of the block.

  // if (activePin) {
  //   sidebarSetter.setContent(<PoiDetails
  //     activePin={activePin.data}
  //     setActivePin={setActivePin}
  //   />);
  //   sidebarSetter.setVisible(true);
  // } else {
  //   sidebarSetter.setContent(null);
  // }
  // }, [activePin, activeDay]);

  //#region dead 
  // sets the active day. 
  /*
    ? Q: Does it conflict with activePin?
      A: No, because remember these useEffect hooks only run if one of these
      values change. Since we're guaranteed only ONE will change between renders
      (the user can't click two items as one render), the sidebar will update
      with this latest content instead.
  */
  // useEffect(() => {
  //   console.log("Active Day: ");
  //   console.log({activeDay});
  //   if (activeDay) {
  //     sidebarSetter.setContent(<DayDetails
  //       setActivePin={setActivePin}
  //       setActiveDay={setActiveDay}
  //       day={activeDay.data}
  //     />);
  //     sidebarSetter.setVisible(true);
  //   } else {
  //     sidebarSetter.setContent(null);
  //   }
  // }, [activeDay]);

  // useEffect(() => {
  //   if (!activePin && !activeDay) {
  //     return;
  //   }

  //   const latestPoi = trip.pois.find(poi => poi.id === activePin?.data.id);
  //   const latestDay = trip.days.find(day => day.id === activeDay?.data.id);
  //   const refreshPoi = setActivePin.bind(null, {data: latestPoi, time: Date.now()});
  //   const refreshDay = setActiveDay.bind(null, {data: latestDay, time: Date.now()});

  //   if (activePin && !activeDay) {
  //     refreshPoi();
  //   } else if (!activePin && activeDay) {
  //     refreshDay();
  //   } else if (activePin && activeDay) {
  //     let firstUpdate;
  //     let secondUpdate;

  //     // need to know which one to update last...
  //     // we can check which was last set, which is the one that was last
  //     // clicked.
  //     if (activePin.time > activeDay.time) {
  //       firstUpdate = refreshDay;
  //       secondUpdate = refreshPoi;
  //     } else {
  //       firstUpdate = refreshPoi;
  //       secondUpdate = refreshDay;
  //     }

  //     firstUpdate();
  //     secondUpdate();

  //   }    
  // }, [trip]);
  //#endregion


  // trip debug
  // useEffect(() => {
  //   console.log("Refreshing activePin and/or activeDay...");
  //   console.log(trip);

  //   // prevent stale active pois from occurring if the trip
  //   // was just reset.
  //   if (activePin) {
  //     let data = trip.pois.find(poi => poi.id === activePin.data.id);

  //     setActivePin({data, time: activePin.time});
  //   }
  //   // likewise for days
  //   if (activeDay) {
  //     let data = trip.days.find(day => day.id === activeDay.data.id);

  //     setActiveDay({data, time: activeDay.time});
  //   }
  // }, [trip]);

  //#region :Render Logic
  // if (pageState === STATE.LOADING) {
  if (pageState){
    
    return <LoadingStudio/>;
  } else if (pageState === STATE.FAILURE) {
    return <LoadFailure error={pageError} />
  }


  return (
    <TripId.Provider value={tripId}>
      <TripContext.Provider value={trip}>
        <MapInstance.Provider value={mapRef}>
          <TripDispatch.Provider value={tripDispatch}>
            <SidebarSetter.Provider value={sidebarSetter}>
              <StudioHeader />
              <div style={{ padding: "25px 5px" }}>
                <TripTitle />
                <LastUpdated time={trip.general.lastAccessed} />
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