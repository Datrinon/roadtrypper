import React, { useRef, useEffect } from 'react'
import L from "leaflet";
import { FeatureGroup, Marker, Tooltip } from 'react-leaflet';
import * as dp from './styled/DayPin.style';
/**
 * It's a group of markers 
 * Each one has a ref
 * 
 * The ref is passed to a callback in Map which allows bounding.
 */

/**
 * A component used within the map; identifies the pins for a given
 * day. Requires the points of interests for that given day and the
 * user assigned color.
 */
function DayPins({ pois, day, icon, mapRef, setActivePin, setActiveDay }) {

  const groupRef = useRef();

  /**
   * Connects the groups of pins laid for that day to the daycard component.
   */
  function addHandlerToDayCard() {
    document.querySelector(`.day-card[data-id='${day.id}']`).onclick = () => {
      const group = groupRef.current;
      if (Object.keys(group.getBounds()).length === 0) {
        return;
      }

      const map = mapRef.current;
      map.flyToBounds(group.getBounds(), {padding: L.point(25, 40), maxZoom: 12});
    }
  }

  useEffect(() => {
    addHandlerToDayCard();
  }, []);

  function onMarkerClick(poi) {
    const lastClicked = Date.now();
    
    setActiveDay({
      data: day,
      lastClicked
    });

    setActivePin({
      data: poi,
      lastClicked
    });
  }

  return (
    <FeatureGroup ref={groupRef}>
      {
        pois.map((poi) => {
          // console.log(poi.coordinates);
          // console.log(icon);
          return (
          <Marker
            key={poi.id}
            position={poi.coordinates}
            icon={icon}
            eventHandlers={{
              click: onMarkerClick.bind(null, poi)
            }}
            alt={`Waypoint for ${poi.coordinates}`}
            >
            <Tooltip direction="bottom" offset={[0, 20]} opacity={0.95} permanent={true} className="chosen-location">
              <dp.TipText color={day.color} className="poi-title">
                {day.order + 1}
                <span className="abbrev-divider">-</span>
                {poi.order + 1}: {poi.title}
              </dp.TipText>
            </Tooltip>
          </Marker>);
        })
      }
    </FeatureGroup>
  );
}



export default DayPins
