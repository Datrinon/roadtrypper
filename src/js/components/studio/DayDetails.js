import React, {useEffect, useContext, useRef} from 'react'
import HoverToEditInput from './HoverToEditInput'
import { TripContext, TripDispatch } from './Studio';

function DayDetails({day}) {
  
  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);
  
  // edit refs
  const dayOrderEditRef = useRef();
  const dayTitleEditRef = useRef();

  function renderDayOrder() {
    // day order display
    let days = trip.days.sort((dayA, dayB) => dayA.order - dayB.order);
    let displayDayOrder = <h1>Day {day.order + 1}</h1>;
    let editDayOrder    = (<select
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
    let displayDayTitle = <h2>{day.title}</h2>
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
        }
      });
    };

    return (<HoverToEditInput
      displayVer={displayDayTitle}
      editVer={editDayTitle}
      onClickSave={updateDayTitle}/>);
  }

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
          value: color
        }
      });
    }

    return (
      <label for="day-color">
        Pin Color
        <input id="day-color"
          type="color"
          name="day-color"
          defaultValue={`#${day.color}`}
          onBlur={changeDayColor}
        />
      </label>
    );
  }

  function renderPOICards() {

  }
  
  return (
    <div>
      <h1>Day Details</h1>
      {renderDayOrder()}
      {renderDayTitle()}
      {renderColorPicker()}
      {/* 
      To add:
        Title HoverToEdit
        Color HoverToEdit
        POI Listing
        Get the first image of each POI and set that as the background,
        create a card.
        Default background of the card is an abstract, generic map image.
       */}
    </div>
  )
}

export default DayDetails
