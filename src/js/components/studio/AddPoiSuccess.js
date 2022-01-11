import React, { useContext } from 'react';
import { TripContext, SidebarSetter } from './Studio';
import PoiDetails from './POIDetails';
import { NewPoiForm } from './AddPOI';

import * as apS from "./styled/AddPoiSuccess.styled";
import * as d from './styled/Details.style';


export function AddPoiSuccess({ lastAddedPoi, setActivePin }) {
  const sidebarSetter = useContext(SidebarSetter);
  const trip = useContext(TripContext);

  function displayForm() {
    const day = trip.days.find(day => day.id === lastAddedPoi.dayId);

    sidebarSetter.setContent(<NewPoiForm
      day={day}
      setActivePin={setActivePin}/>);
  }

  function displayPoi() {
    const poi = trip.pois.find(poi => poi.dayId === lastAddedPoi.dayId
      && poi.order === lastAddedPoi.order);

    sidebarSetter.setContent(<PoiDetails
      activePin={poi}
      setActivePin={setActivePin}/>
    );
  }

  return (
    <apS.SuccessContainer>
      <d.Heading>Success</d.Heading>
      <apS.SuccessMessage>Point of Interest added!</apS.SuccessMessage>
      <apS.Button onClick={displayForm}>Add Another POI</apS.Button>
      <apS.Button onClick={displayPoi}>View Added POI</apS.Button>
    </apS.SuccessContainer>
  );
}
