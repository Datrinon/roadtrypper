import { useContext } from "react";
import { TripDispatch, TripContext } from "./Studio";

// TODO

export default function AddDay({sidebarSetter}) {

  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);

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
        tripId: trip.days[0].tripId,
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