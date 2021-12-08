import React, { useContext } from 'react'
import { TripContext } from './Studio'
import styled from 'styled-components';

import DefaultPOICardImg from '../../../data/images/city-map-vector.png'


const POICardBox = styled.div`
  background-image: url("${DefaultPOICardImg}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 64px;
  height: 128px;
  border: 1px solid aqua;
`

function POICard({poi, setActivePin}) {
  
  const trip = useContext(TripContext);

  function onClickPOICard() {
    let timestamp = new Date();
    let data = {
      time: timestamp,
      data: poi
    }
    setActivePin(data);
  }

  return (
    <POICardBox
      onClick={onClickPOICard}
      className="poi-card">
      <h3>{poi.title}</h3>
    </POICardBox>
  )
}

export default POICard
