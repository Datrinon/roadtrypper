import React, { useState, useEffect } from 'react'
import { SAMPLE_DAYS } from "../../../data/sample-days";


function PoiDetails({ activePin }) {
  // convert to boolean + invert.
  const [collapsed, setCollapsed] = useState(!activePin);
  /*
  ! ! !
  Further steps. (Viewing)
  2. Give the active pin state to this PoiDetails prop 
  and then use that data to fill out the information.
  3. We should be able to see the day that this POI belongs to,
  so you'd have to pass that information to DayPins too, but then
  you can send it back up with in the callback.
  (Editing)
  1. A pencil button will make the trip details editable.
  2. I should be able to set the day using a dropdown menu.
  3. I should be able to rearrange the order of POIs.
  (Deletion)
  1. A trash can should allow me to delete it, by the pencil icon.
  */

  useEffect(() => {
    setCollapsed(!activePin);
  }, [activePin]);

  return (
    <div className={`poi-details ${collapsed && "collapsed"}`}>
      {collapsed ? "(currently collapsed)" : "(not collapsed)"}
      Show Pin Details here.
      {!collapsed && (
        <section className="poi-contents">
          <h1>Day {activePin.day.order + 1}</h1>
          <h2>{activePin.poi.title}</h2>
          <p>{activePin.poi.description}</p>
        </section>
      )}
    </div>
  )
}

export default PoiDetails
