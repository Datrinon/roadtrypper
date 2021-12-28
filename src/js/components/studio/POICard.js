import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react'
import { FAIcon } from '../styled/template.style';
import { TripContext } from './Studio'

import * as pcB from './styled/POICard.style';


function POICard({poi, day, setActivePin}) {
  
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
      color={day.color}
      onClick={onClickPOICard}
      className="poi-card">
      <pcB.POIIcon icon={faMapPin} />
      <pcB.POICardTitle>{poi.order + 1}. {poi.title}</pcB.POICardTitle>
    </pcB.POICardBox>
  )
}

export default POICard
