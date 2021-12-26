import React, { useContext } from 'react';
import { TripContext, SidebarSetter } from './Studio';
import PoiDetails from './POIDetails';
import { NewPoiForm } from './AddPOI';

export function AddPoiSuccess({ lastAddedPoi }) {
  const sidebarSetter = useContext(SidebarSetter);
  const trip = useContext(TripContext);

  function displayForm() {
    sidebarSetter.setContent(<NewPoiForm />);
  }

  function displayPoi() {
    const poi = trip.pois.find(poi => poi.dayId === lastAddedPoi.dayId
      && poi.order === lastAddedPoi.order);

    sidebarSetter.setContent(<PoiDetails activePin={poi} />);
  }

  return (
    <div>
      <h1>Success</h1>
      <p>New Point of Interest added.</p>
      <button onClick={displayForm}>Add Another POI</button>
      <button onClick={displayPoi}>View Added POI</button>
    </div>
  );
}
