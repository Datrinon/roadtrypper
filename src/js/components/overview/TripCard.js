import React, { useRef } from 'react'
import TripCover from '../../../data/images/city-map-vector.png'
import styled from 'styled-components';

import { Link } from "react-router-dom";

// hooks
import useDropdown from '../../hooks/useDropdown';
// components
import Dropdown from '../studio/Dropdown';

const TripCardContainer = styled.div`
  width: 210px;
  height: 200px;
  border: 1px solid black;
`

const TripCardImg = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
`

const Options = styled.div`
  position: relative;
  z-index: 1;
`


function convertMsToDate(ms) {
  let time = new Date(ms);

  let day = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  return `${month}/${day}/${year}`;
}

function TripCard({ trip }) {

  const [dropdownVisible, setDropdownVisible, dropdownRef] = useDropdown();

  const container = useRef(null);

  function openProject(e, newTab = false) {
    console.log("You opened the project...");
    console.log(newTab);
  }

  return (
    <TripCardContainer>
      <Link to={trip.tripid}>
        <TripCardImg src={TripCover} alt="A colorful graphic representation of a map." />
        <h2 className="trip-title">
          {trip.title}
        </h2>
        <p>
          Last Opened {convertMsToDate(trip.lastAccessed)}
        </p>
      </Link>
      <Options>
        <button onClick={setDropdownVisible.bind(null, true)} ref={dropdownRef}>
          Options
        </button>
        <Dropdown visible={dropdownVisible} ref={dropdownRef}>
          <ul>
            <li>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProject(e, true);
                }}>
                Open in New Tab
              </button>
            </li>
            <li>Remove</li>
          </ul>
        </Dropdown>
      </Options>
    </TripCardContainer>
  )
}

export default TripCard
