import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

import * as lU from "./styled/LastUpdated.style";

import "../../../"

/**
 * Convert ms into an american (MM-DD-YYYY HH:MM AM/PM) timestamp.
 * @param {*} ms - value in ms
 * @returns 
 */
function getTimestamp(ms) {
  let time = new Date(ms);

  let month = time.getMonth() + 1;
  let day = time.getDate();
  let year = time.getFullYear();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let period = "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours === 12) {
    period = "PM";
  } else if (hours > 12) {
    // any hour beyond 12.
    hours = hours - 12;
    period = "PM";
  }

  minutes = minutes.toString().padStart(2, '0')

  return `${month}/${day}/${year}, ${hours}:${minutes} ${period}`;
}

  /* Test
   const HOUR = 3600000;

    for (let i = 0; i < 24; i++) {
        let time = Date.now() + HOUR * i;
        
        let ts = getTimestamp(time);
        
        console.log(ts);
    }
   */

function LastUpdated({ time }) {
  return (
    <>
      <lU.Timestamp className={"timestamp"}>
        <span>Last Update: </span>{getTimestamp(time)}
      </lU.Timestamp>
      <FontAwesomeIcon
        icon={faSave}
        className={"loading no-display"} />
    </>
  )
}

export default LastUpdated
