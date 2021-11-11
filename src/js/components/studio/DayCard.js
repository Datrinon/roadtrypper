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

function DayCard({ data }) {
  return (
    <Card>
      <h2>Day {data.order + 1}: {data.title}</h2>
      <ul>
        {data.pois.map((point, index) => {
          return (
            <li
              key={data.id + index}
              className="day-point"
            >
              {point.title}
            </li>
          )
        })}
      </ul>
    </Card>
  )
}



export default DayCard;
