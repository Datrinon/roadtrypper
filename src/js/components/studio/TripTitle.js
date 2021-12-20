import React, {useContext} from 'react'
import Studio, { TripContext, TripDispatch } from "./Studio"


function TripTitle() {

  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);

  function onChangeTitle(e) {
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
      <authStyle.Input
        className="trip-title"
        placeholder="Untitled Trip"
        defaultValue={trip.general.title}
        onBlur={onChangeTitle} />
    </>
  )
}

export default TripTitle
