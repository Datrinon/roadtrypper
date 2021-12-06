import { useContext, useEffect, useState } from "react";
import { TripDispatch, TripContext, TripId } from "./Studio";

// TODO
// [] Use the activeDay prop to splice days.
export default function AddDay({activeDay, setActiveDay}) {
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);
  const [tripCached, setTripCached] = useState(trip);
  const tripId = useContext(TripId);

  useEffect(() => {
    console.log(tripCached.days.length);
    console.log(trip.days.length);
    if (tripCached.days.length !== trip.days.length) {
      const day = trip.days.find(day => day.order === trip.days.length - 1);
      
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

    dispatch({
      type: "add",
      payload: {
        type: "days",
        fkname: null,
        fkid: null,
        tripId: tripId,
        order: trip.days.length,
        title: "",
        color: randomColor,
      }
    });

  }

  return (
    <button className="add-day" type="button" onClick={onAddDay}>Add Day</button>
  )
}