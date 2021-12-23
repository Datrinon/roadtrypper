import React, {useContext} from 'react'
import Studio, { TripContext, TripDispatch } from "./Studio"

import * as ttS from "./styled/TripTitle.style";

function TripTitle() {

  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);

  function onChangeTitle(e) {
    // if no title update then return.
    if (e.target.value === trip.general.title) {
      return;
    }

    dispatch({
      type: 'edit_general',
      payload: {
        type: 'general',
        id: trip.general.id,
        key: "title",
        value: e.target.value
      }
    });
  }

  return (
    <>
      <ttS.TripTitle
        className="trip-title"
        placeholder="Untitled Trip"
        defaultValue={trip.general.title}
        onBlur={onChangeTitle} />
    </>
  )
}

export default TripTitle
