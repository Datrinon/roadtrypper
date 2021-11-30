/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useContext, useEffect } from 'react'
import { TripDispatch, TripContext } from './Studio';

function NewPOIForm({ day }) {
  const dispatch = useContext(TripDispatch);
  const trip = useContext(TripContext);

  const [selDay, setSelDay] = useState(day);
  const [selDayPOIs, setSelDayPOIs] = useState([]);
  const [selPOIOrder, setSelPOIOrder] = useState(0);

  function getLastOrderedDay() {
    return trip.days.reduce((latestDay, day) => {
      return day.order > latestDay.order ? day : latestDay;
    }, trip.days[0]);
  }

  function getGreatestOrder(max, poi) {
    if (poi.order > max) {
      return poi.order;
    } else {
      return max;
    }
  }

  function updatePOIData(day) {
    let pois;
    let greatestPOIOrder;

    pois = trip.pois.filter(poi => poi.dayId === day.id);
    
    greatestPOIOrder = pois.reduce(getGreatestOrder, 0);
    greatestPOIOrder = greatestPOIOrder === 0 ? 0 : greatestPOIOrder + 1;

    console.log({pois, greatestPOIOrder});

    setSelDayPOIs(pois);
    setSelPOIOrder(greatestPOIOrder);
  }

  useEffect(() => {
    let lastDay;

    if (!selDay) {
      lastDay = getLastOrderedDay();

      setSelDay(lastDay);
    } else {
      lastDay = selDay;
    }

    updatePOIData(lastDay);
  }, []);

  useEffect(() => {
    if (selDay) {
      updatePOIData(selDay);
    }
  }, [selDay]);

  function onChangeDayOrder(e) {
    const day = trip.days.find(day => day.order === parseInt(e.target.value));
    console.log(day);
    setSelDay(day);
  }

  function addNewPOI(e) {
    e.preventDefault();
  }

  function enumeratePOIOrderOptions() {
    const orders = selDayPOIs
      .sort((poiA, poiB) => poiA.order - poiB.order)
      .map(poi => {
        return <option
          key={poi.order}
          value={poi.order}>
          {poi.order + 1}
        </option>
      });

    return (<>
      {orders}
      <option value={selDayPOIs.length}>{selDayPOIs.length + 1}</option>
    </>)
  }

  return (
    <form onSubmit={addNewPOI}>
      <h1>Adding POI</h1>
      <section>
        <h2>Day Information</h2>
        <label>
          For Day
          <select
            name="poi-day"
            id="poi-day-select"
            value={selDay?.order}
            onChange={onChangeDayOrder}>
            {
              trip.days.map((day, index) => {
                return <option
                  key={index}
                  value={index}>
                  {index + 1}
                </option>
              })
            }
          </select>
        </label>
        <label>
          Order in Day
          <select
            key={selPOIOrder}
            name="poi-order-in-day"
            id="poi-order-select"
            defaultValue={selPOIOrder}>
            {
              selDayPOIs.length !== 0 ?
              (enumeratePOIOrderOptions()) :
                (<option value={0}>1</option>)
            }
          </select>
        </label>
      </section>
    </form>
  )
}

function AddPOI({ sidebarSetter }) {
  function showAddPOI() {
    sidebarSetter.setContent(<NewPOIForm />);
    sidebarSetter.setVisible(true);
  }

  return (
    <button className="add-POI" type="button" onClick={showAddPOI}>Add POI</button>
  )
}

export default AddPOI
