import React from 'react'
import * as dC from "./styled/DayCard.style";


function DayCard({ setActiveDay, day, pois }) {

  function onCardClick(day) {
    let time = Date.now();

    let data = {
      time,
      data: day
    }

    setActiveDay(data);
  }

  return (
    <dC.Card
      onClick={onCardClick.bind(null, day)}
      data-id={day.id}
      className={`day-card`}>
      <dC.DayNumLabel>Day <span>{day.order + 1}</span></dC.DayNumLabel>
      <dC.dayTitle>{day.title.length ?
        <dC.titledDay>{day.title}</dC.titledDay> :
        <dC.UntitledDay>Untitled Day</dC.UntitledDay>
      }
      </dC.dayTitle>
      <dC.DayColorLine color={day.color}></dC.DayColorLine>
      <dC.DayPOIList>
        { pois.length ? 
          pois
          .sort((a, b) => a.order - b.order)
          .map((poi) => {
            return (
              <dC.DayPOIBullet
                key={poi.id}
                className="day-point">
                {poi.title}
              </dC.DayPOIBullet>
            )
          }) :
          // <li style={{fontStyle: "italic"}}>No Points Added.</li>
          <></>
        }
      </dC.DayPOIList>
    </dC.Card>
  )
}



export default DayCard;
