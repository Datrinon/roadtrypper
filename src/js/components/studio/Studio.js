import React, { useEffect, useState, useReducer } from 'react'
import tripDetailsReducer from './tripDetailsReducer';

function Studio({projectId}) {

  const [trip, tripDispatch] = useState(null);
  const [tripDetails, tripDetailsDispatch] = useReducer(tripDetailsReducer, null);
  
  async function loadSampleData() {
    await import("../../../data/sample-trip.json");
    await import("../../../data/sample-days");
    // todo use dispatch to load the sample days.
  }

  useEffect(() => {
    if (projectId === -1) {
      loadSampleData();
    }
  }, [projectId])

  return (
    <div>
      <p>DEV MODE: STUDIO PAGE.</p>
      <input className="title" placeholder="Untitled Trip" />
      <div className="add-options">
        <button className="add-day" type="button">Add Day</button>
        <button className="add-POI" type="button">Add POI</button>
      </div>
      <div className="days">
        
      </div>
    </div>
  )
}

export default Studio;