import React, { useRef } from 'react'
import TripCover from '../../../data/images/city-map-vector.png'
import styled from 'styled-components';

const TripCardContainer = styled.div`
  width: 210px;
  height: 200px;
  border: 1px solid black;
`

const TripCardImg = styled.img`
  width: 100%;
  height: 60%;
`


function convertMsToDate(ms) {
  let time = new Date(ms);

  let day = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  return `${day}/${month}/${year}`;
}

function TripCard({trip}) {
  return (
    <TripCardContainer>
      <TripCardImg src={TripCover} alt="A colorful graphic representation of a map."/>
      <h2 className="trip-title">
        {trip.title}
      </h2>
      <p>
        Last Opened {convertMsToDate(trip.lastAccessed)}
      </p>
    </TripCardContainer>
  )
}

export default TripCard
