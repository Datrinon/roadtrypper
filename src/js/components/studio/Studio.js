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


  //#region :Render Logic
  // if (pageState){
  if (pageState === STATE.LOADING) {
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