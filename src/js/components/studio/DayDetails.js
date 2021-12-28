import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useContext, useRef } from 'react'
import styled from 'styled-components';
import { FAIcon } from '../styled/template.style';
import AddPoi from './AddPOI';
import HoverToEditInput from './HoverToEditInput'
import POICard from './POICard';
import { TripContext, TripDispatch } from './Studio';

import * as d from "./styled/Details.style";
import * as dD from "./styled/DayDetails.style";
import { UntitledDay } from './styled/DayCard.style';


function DayDetails({ day, setActivePin, setActiveDay }) {


  const trip = useContext(TripContext);
  const dispatch = useContext(TripDispatch);

  // let the component manage its own state.
  const [dayState, setDayState] = useState(day);

  // edit refs
  const dayOrderEditRef = useRef();
  const dayTitleEditRef = useRef();
  const colorEditRef = useRef();

  function renderDayOrder() {
    // day order display
    let days = trip.days.sort((dayA, dayB) => dayA.order - dayB.order);
    let displayDayOrder = <d.DayOrder>
      Day <d.DayOrderNum>{dayState.order + 1}</d.DayOrderNum>
    </d.DayOrder>;
    let editDayOrder = (
      <d.DayOrderEdit>
        <d.EditHeading>Change Day to</d.EditHeading>
        <d.DayOrderSelect
          name="poi-order"
          id="poi-order-select"
          defaultValue={dayState.order}
          ref={dayOrderEditRef}>
          {
            days.map((day) => {
              return (<option
                key={day.id}
                value={day.order}>
                Day {day.order + 1}
              </option>
              );
            })
          }
        </d.DayOrderSelect>
      </d.DayOrderEdit>);
    let updateDayOrder = () => {
      // if the selected order is the same, then don't update
      if (dayOrderEditRef.current.value === dayState.order) {
        return;
      }

      dispatch({
        type: "rearrange",
        payload: {
          type: "days",
          id: dayState.id,
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
    let displayDayTitle = (<d.DayTitle className="details day">{
      dayState.title.length ?
        dayState.title :
        <d.UntitledDayDisp>Untitled Day</d.UntitledDayDisp>
    }</d.DayTitle>);

    let editDayTitle = <d.DayTitleEdit
      defaultValue={dayState.title}
      ref={dayTitleEditRef}
    />

    let updateDayTitle = () => {
      dispatch({
        type: "edit",
        payload: {
          type: "days",
          id: dayState.id,
          key: "title",
          value: dayTitleEditRef.current.value,
          ref: dayState.ref
        }
      });
    };

    return (<HoverToEditInput
      displayVer={displayDayTitle}
      editVer={editDayTitle}
      onClickSave={updateDayTitle} />);
  }

  // useEffect(() => {
  //   colorEditRef.current.defaultValue = `#${day.color}`;

  // }, [day]);

  // as long as this component is alive and trip is being changed,
  // we should refresh the day state.
  // because the only possible changes that could occur while this component
  // is active are edits to the current day.
  useEffect(() => {
    const updatedDay = trip.days.find(tripDay => tripDay.id === day.id);

    setDayState(updatedDay);

    return () => {
      console.log("DayDetails.js: Dismounting DayDetails component...");
    }
  }, [trip, day]);

  function renderColorPicker() {

    function changeDayColor(e) {
      let color = e.target.value;

      color = color.slice(1, color.length);

      if (color === dayState.color) {
        return;
      }

      dispatch({
        type: "edit",
        payload: {
          type: "days",
          id: dayState.id,
          key: "color",
          value: color,
          ref: dayState.ref
        }
      });

    }

    return (
      <dD.dayColorContainer>
        <dD.dayColorLabel key={dayState.color} htmlFor="day-color">
          <dD.dayColorInput
            key={dayState.color}
            id="day-color"
            type="color"
            name="day-color"
            defaultValue={`#${dayState.color}`}
            onBlur={changeDayColor}
            ref={colorEditRef}
          />
          <dD.dayColorPin color={dayState.color} />
          <span>Day Color</span>
        </dD.dayColorLabel>
      </dD.dayColorContainer>
    );
  }

  function renderPOICards() {
    const pois = trip.pois
      .filter(poi => poi.dayId === dayState.id)
      .sort((poiA, poiB) => poiA.order - poiB.order);

    let section;

    if (pois.length > 0) {
      section = pois.map((poi, index) => (<POICard
        key={poi.id}
        day={day}
        poi={poi}
        setActivePin={setActivePin} />));
    } else {
      const dayData = {
        data: dayState
      }
      section = (
        <div>
          <p>No POIs listed for this day.</p>
          <AddPoi activeDay={dayData} />
        </div>
      )
    }



    return (
      <dD.POICardContainer>
        {section}
      </dD.POICardContainer>
    )
  }

  function deleteDay() {
    dispatch({
      type: "delete",
      payload: {
        type: "days",
        id: dayState.id,
        ref: dayState.ref
      }
    })

    setActiveDay(null);
  }


  return (
    <>
      <d.DeleteItemButton onClick={deleteDay} data-tip="Delete Day">
        <FAIcon icon={faTrash} />
      </d.DeleteItemButton>
      <d.Heading>Day Overview</d.Heading>
      <dD.DayContents>
        <dD.DayBodyHeading>
          <div className="order">
            {renderDayOrder()}
          </div>
          <div className="title">
            {renderDayTitle()}
          </div>
          <div className="color">
            {renderColorPicker()}
          </div>
        </dD.DayBodyHeading>
        <dD.POICardsSection>
          <dD.Divider />
          <d.HeadingLv2>Points</d.HeadingLv2>
          <dD.POICardsContainer>
            {renderPOICards()}

          </dD.POICardsContainer>
        </dD.POICardsSection>
      </dD.DayContents>
    </>
  )
}

export default DayDetails
