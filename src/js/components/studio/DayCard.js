import React from 'react'
import styled from 'styled-components'

let Card = styled.div`
  border: 1px solid black;
  width: 30vw;
  border-radius: 5px;
  padding: 5px;
  max-width: 240px;
  margin: 5px;

  &:hover {
    border: 1px solid red;
  }
`;

function DayCard({ day, pois }) {
  return (
    <Card data-id={day.id} className="day-card">
      <h2>Day {day.order + 1}: {day.title}</h2>
      <ul>
        {pois.map((poi) => {
          return (
            <li
              key={poi.id}
              className="day-point"
            >
              {poi.title}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}



export default DayCard;
