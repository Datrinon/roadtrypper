import { useContext, useEffect, useState } from "react";
import { TripDispatch, TripContext, TripId } from "./Studio";

import * as btnS from "./styled/StudioButtons.style";

export default function AddDay({activeDay, setActiveDay}) {
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);
  const [tripCached, setTripCached] = useState(trip);
  const [addedDayOrder, setAddedDayOrder] = useState(null);
  const tripId = useContext(TripId);

  useEffect(() => {
    if (tripCached.days.length < trip.days.length) {
      const day = trip.days.find(day => day.order === addedDayOrder);
      
      setActiveDay({ data : day, time: Date.now() });

      setTripCached(trip);
    }
  }, [trip.days.length]);

  function onAddDay() {
    let randomColor = "";
    for (let i = 0; i < 3; i++) {
      let result = Math.round(Math.random() * 256).toString(16).padStart(2, '0');
      randomColor += result;
    }

    let orderVal = activeDay ? activeDay.data.order + 1 : trip.days.length;

    dispatch({
      type: "add",
      payload: {
        type: "days",
        fkname: null,
        fkid: null,
        tripId: tripId,
        order: orderVal,
        title: "",
        color: randomColor,
      }
    });

    setAddedDayOrder(orderVal);
  }

  return (
    <btnS.AddButton className="add-day" type="button" onClick={onAddDay}>Add Day</btnS.AddButton>
  )
}