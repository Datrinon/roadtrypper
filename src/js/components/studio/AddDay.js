import React, { useContext, useState, useEffect } from "react";
import { TripDispatch, TripContext, TripId, SidebarSetter } from "./Studio";

// TODO

function NewDayForm({ activeDay }) {
  
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);
  const tripId = useContext(TripId);

  useEffect(() => {
    if (!activeDay) {
      // TODO 
      // we set the day to the last day.
    }

  }, []);

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
    <form>
      <h1>Add Day</h1>
      <p>You can add a day here.</p>
    </form>
  )
}

export default function AddDay() {
  const sidebarSetter = useContext(SidebarSetter);

  function displayForm() {
    sidebarSetter.setContent(<NewDayForm />);
    sidebarSetter.setVisible(true);
  }

  return (
    <button className="add-day" type="button" onClick={displayForm}>Add Day</button>

  )
}