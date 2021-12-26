import React, { useContext } from 'react'
import { TripContext } from './Studio'

import * as pcB from './styled/POICard.style';


function POICard({poi, setActivePin}) {
  
  const trip = useContext(TripContext);

  function onClickPOICard() {
    let timestamp = Date.now();
    let data = {
      time: timestamp,
      data: poi
    }
    setActivePin(data);
  }

  return (
    <pcB.POICardBox
      onClick={onClickPOICard}
      className="poi-card">
      <pcB.POICardTitle>{poi.order + 1}. {poi.title}</pcB.POICardTitle>
    </pcB.POICardBox>
  )
}

export default POICard
