import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

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
  let period = "A.M.";
  if (hours > 12) {
    hours = hours - 12;
    period = "P.M.";
  }

  return `${month}/${day}/${year}, ${hours}:${minutes} ${period}`;
}

function LastUpdated({ time }) {
  return (
    <>
      <p className={"timestamp"}>Last Update: {getTimestamp(time)}</p>
      <FontAwesomeIcon
        icon={faSave}
        className={"loading no-display"}/>
    </>
  )
}

export default LastUpdated
