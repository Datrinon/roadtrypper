import { useContext, useEffect, useState } from "react";
import { TripDispatch, TripContext, TripId } from "./Studio";
// TODO
// alter the order based on the active day given, meaning, we need the active day.
// three things
// add the active day prop from the studio
// adjust the order based on that
// then, you can work with the active day on the sidebar.
export default function AddDay({activeDay, setActiveDay}) {
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);
  const [tripDaysLength, setTripDaysLength] = useState(trip.days.length);
  const tripId = useContext(TripId);

  useEffect(() => {
    if (tripDaysLength !== trip.days.length) {
      const day = trip.days.find(day => day.order === trip.days.length);

      setActiveDay(day);
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