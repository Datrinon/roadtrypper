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

// CSS
import * as stS from "./styled/Studio.styled";
import "../../../css/studio.css";
import { Helmet } from 'react-helmet';
import { FAIcon } from '../styled/template.style';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
  const activeDayCard = useRef(null);

  const [mainSidebarCollapsed, setMainSidebarCollapsed] = useState(false);

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

    //! debug, remove later.
    // for (let i = 0; i < 9; i++) {
    //   cards.push(cards[0]);
    // }

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
  }, [activeDay]);


  useEffect(() => {
    if (activeDayCard.current) {
      activeDayCard.current.classList.remove("active");
    }
    // this use effect hook manages the view update for activeDay.
    if (activeDay) {
      console.log(activeDay);
      const dayCard = document
        .querySelector(`.day-card[data-id="${activeDay.data.id}"]`);

      dayCard.classList.add("active");

      activeDayCard.current = dayCard;
    }
  }, [activeDay]);


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
  }, [activePin]);


  useEffect(() => {
    if (!activePin) {
      return;
    }

    const day = trip.days.find(day => day.id === activePin.data.dayId);

    // if the active day is still the same though, don't bother updating it.
    if (activeDay && activeDay.data.id === day.id) {
      console.log("Same day, returning from this hook early...");
      return;
    }

    console.log("Changing the active day with this pin...");
    console.log(activePin);

    setActiveDay({
      data: day,
      time: Date.now()
    });
  }, [activePin?.data.dayId]);


  //#region :Render Logic
  // if (pageState){
  if (pageState === STATE.LOADING) {
    return <LoadingStudio />;
  } else if (pageState === STATE.FAILURE) {
    return <LoadFailure error={pageError} />
  }


  return (
    <>
      <Helmet>
        <title>{trip.general.title.length ?
          trip.general.title : "Untitled Trip"} - RoadTrypper </title>
      </Helmet>
      <TripId.Provider value={tripId}>
        <TripContext.Provider value={trip}>
          <MapInstance.Provider value={mapRef}>
            <TripDispatch.Provider value={tripDispatch}>
              <SidebarSetter.Provider value={sidebarSetter}>
                <stS.StudioBody className="studio-body">

                  <stS.MapArea className="map-area">
                    <stS.PrimarySidebar collapsed={mainSidebarCollapsed}>
                      <stS.HeaderWrapper>
                        <StudioHeader />
                      </stS.HeaderWrapper>

                      <stS.TripGeneral className="trip-general-info">
                        <TripTitle />
                        <LastUpdated time={trip.general.lastAccessed} />
                      </stS.TripGeneral>

                      <stS.AddOptions className="add-options">
                        <AddDay activeDay={activeDay} setActiveDay={setActiveDay} />
                        <AddPOI activeDay={activeDay} />
                      </stS.AddOptions>

                      <stS.Days className="days">
                        <stS.DayCardSectionHeading>Days</stS.DayCardSectionHeading>
                        <stS.DayCardContainer>
                          {mapDayDataToCards()}
                        </stS.DayCardContainer>
                      </stS.Days>
                      <button className="collapse-button" onClick={() => setMainSidebarCollapsed(prev => !prev)}>
                        <span className="icon">
                          {
                            mainSidebarCollapsed ?
                              <FAIcon icon={faAngleRight} />
                              : <FAIcon icon={faAngleLeft} />
                          }
                        </span>
                      </button>
                    </stS.PrimarySidebar>
                    <Map
                      data={trip}
                      setActivePin={setActivePin} />
                    <Sidebar
                      ref={sidebarRef}
                      visible={sidebarValues.visible}
                      content={sidebarValues.content}
                    />
                  </stS.MapArea>
                  
                </stS.StudioBody>
              </SidebarSetter.Provider>
            </TripDispatch.Provider>
          </MapInstance.Provider>
        </TripContext.Provider>
      </TripId.Provider>
    </>
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