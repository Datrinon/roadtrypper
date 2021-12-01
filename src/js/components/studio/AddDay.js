import { useContext } from "react";
import { TripDispatch, TripContext, TripId } from "./Studio";

// TODO

export default function AddDay() {

  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);
  const tripId = useContext(TripId);

  function onAddDay() {
    let randomColor = "";
    for (let i = 0; i < 3; i++) {
      let result = Math.round(Math.random() * 256).toString(16).padStart(2, '0');
      randomColor += result;
    }
  
    dispatch({
      type: "add",
      payload: {
        type:"days",
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