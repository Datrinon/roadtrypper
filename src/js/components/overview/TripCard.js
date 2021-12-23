import React, { useRef } from 'react'
import TripCover from '../../../data/images/city-map-vector.png'
import styled from 'styled-components';

import { Link, useRouteMatch } from "react-router-dom";

// hooks
import useDropdown from '../../hooks/useDropdown';

// components
import Dropdown from '../studio/Dropdown';
import { deleteTrip } from '../../database/data';
import { cloneDeep } from 'lodash';


import * as tS from "./styled/TripCard.style";
import { FAIcon } from '../styled/template.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function convertMsToDate(ms) {
  let time = new Date(ms);

  let day = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  return `${month}/${day}/${year}`;
}

function TripCard({ trip, setTrips }) {

  const [dropdownVisible, setDropdownVisible, dropdownRef] = useDropdown();

  const match = useRouteMatch();


  function onRemove() {
    let deleteId = trip.tripId;

    console.log(deleteId);
    deleteTrip(deleteId);
    setTrips(prevTrips => {
      let trips = cloneDeep(prevTrips)

      let index = trips.findIndex(trip => trip.tripId === deleteId);
      trips.splice(index, 1);

      console.log("deleted on memory");

      return trips;
    })
  }


  return (
    <tS.TripCardContainer>
      <Link to={"/trips/" + trip.tripId} style={{textDecoration: "unset", cursor: "pointer"}}>
        <tS.TripCardImg
          src={TripCover}
          alt="A colorful graphic representation of a map."
          loading="lazy"/>
        <tS.TripTitle className="trip-title">
          {trip.title}
        </tS.TripTitle>
        <tS.TripDate>
          Last Opened {convertMsToDate(trip.lastAccessed)}
        </tS.TripDate>
      </Link>
      <tS.Options>
        <tS.OptionsButton onClick={setDropdownVisible.bind(null, true)} ref={dropdownRef}>
          <FontAwesomeIcon icon={faEllipsisV}/>
        </tS.OptionsButton>
        <Dropdown visible={dropdownVisible} ref={dropdownRef}>
          <ul>
            <li>
              <Link to={"/trips/" + trip.tripId} target="_blank">
                Open in New Tab
              </Link>
            </li>
            <li>
              <button onClick={onRemove}>
              Remove
              </button>
            </li>
          </ul>
        </Dropdown>
      </tS.Options>
    </tS.TripCardContainer>
  )
}

export default TripCard
