import React from 'react'

function DayCard({ data }) {
  return (
    <div>
      <h2>Day {data.order + 1}: {data.title}</h2>
    </div>
  )
}



export default DayCard;
