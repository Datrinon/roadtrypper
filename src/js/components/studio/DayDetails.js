import React, { useEffect, useContext, useRef } from 'react'
import styled from 'styled-components';
import AddPoi from './AddPOI';
import HoverToEditInput from './HoverToEditInput'
import POICard from './POICard';
import { TripContext, TripDispatch } from './Studio';

const POICardContainer = styled.div`
  display: flex;
  flex-direction: row;
`

function DayDetails({ day, setActivePin, setActiveDay }) {

  console.log(day);

  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  // edit refs
  const dayOrderEditRef = useRef();
  const dayTitleEditRef = useRef();
  const colorEditRef = useRef();

  function renderDayOrder() {
    // day order display
    let days = trip.days.sort((dayA, dayB) => dayA.order - dayB.order);
    let displayDayOrder = <h1>Day {day.order + 1}</h1>;
    let editDayOrder = (<select
      name="poi-order"
      id="poi-order-select"
      defaultValue={day.order}
      ref={dayOrderEditRef}>
      {
        days.map((day) => {
          return (<option
            key={day.order}
            value={day.order}>
            {day.order + 1}
          </option>
          );
        })
      }
    </select>);
    let updateDayOrder = () => {
      // if the selected order is the same, then don't update
      if (dayOrderEditRef.current.value === day.order) {
        return;
      }

      dispatch({
        type: "rearrange",
        payload: {
          type: "days",
          id: day.id,
          newOrder: parseInt(dayOrderEditRef.current.value),
          fk: null,
        }
      })
    }

    return (
      <HoverToEditInput
        displayVer={displayDayOrder}
        editVer={editDayOrder}
        onClickSave={updateDayOrder} />);
  }

  function renderDayTitle() {
    let displayDayTitle;
    if (day.title.length === 0) {
      displayDayTitle = (<h2 className="details day untitled">Untitled Day</h2>);
    } else {
      displayDayTitle = (<h2 className="details day">{day.title}</h2>);
    }
    
    let editDayTitle = <input
      defaultValue={day.title}
      ref={dayTitleEditRef}
    />

    let updateDayTitle = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "days",
          id: day.id,
          key: "title",
          value: dayTitleEditRef.current.value,
          ref: day.ref
        }
      });
    };

    return (<HoverToEditInput
      displayVer={displayDayTitle}
      editVer={editDayTitle}
      onClickSave={updateDayTitle} />);
  }

  useEffect(() => {
    colorEditRef.current.defaultValue = `#${day.color}`;
  }, [day]);

  function renderColorPicker() {
    function changeDayColor(e) {
      let color = e.target.value;
      color = color.slice(1, color.length);

      console.log(color);

      dispatch({
        type: "edit",
        payload: {
          type: "days",
          id: day.id,
          key: "color",
          value: color,
          ref: day.ref
        }
      });

    }

    console.log(day.color);

    return (
      <label key={day.color} htmlFor="day-color">
        Pin Color
        <input id="day-color"
          type="color"
          name="day-color"
          defaultValue={`#${day.color}`}
          onBlur={changeDayColor}
          ref={colorEditRef}
        />
        {/* TODO work on this later. */}
        {/* <span 
          className="day-color-pin"
          style={{
            "background-color" : `#${day.color}`,
            width: "32px",
            height: "32px"
          }}
          >
          &nbsp;
        </span> */}
      </label>
    );
  }

  function renderPOICards() {
    const pois = trip.pois
      .filter(poi => poi.dayId === day.id)
      .sort((poiA, poiB) => poiA.order - poiB.order);

    let section;

    if (pois.length > 0) {
      section = pois.map((poi, index) => (<POICard
        key={poi.id}
        poi={poi}
        setActivePin={setActivePin}/>));
    } else {
      section = <AddPoi activeDay={day} />
    }

    return (
      <POICardContainer>
        {section}
      </POICardContainer>
    )
  }

  function deleteDay() {
    dispatch({
      type: "delete",
      payload: {
        type: "days",
        id: day.id
      }
    })

    setActiveDay(null);
  }

  return (
    <div>
      <h1>Day Details</h1>
      <button onClick={deleteDay}>Delete Day</button>
      {renderDayOrder()}
      {renderDayTitle()}
      {renderColorPicker()}
      {renderPOICards()}
      {/* 
      
       */}
    </div>
  )
}

export default DayDetails
