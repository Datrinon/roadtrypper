import React, { useRef, useEffect } from 'react'
import L from "leaflet";
import { FeatureGroup, Marker, Tooltip } from 'react-leaflet';
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

  function addHandlerToDayCard() {
    document.querySelector(`.day-card[data-id='${day.id}']`).onclick = () => {

      setActiveDay(day);

      const group = groupRef.current;
      if (Object.keys(group.getBounds()).length === 0) {
        return;
      }

      const map = mapRef.current;
      map.flyToBounds(group.getBounds(), {padding: L.point(25, 40), maxZoom: 14});
    }
  }

  useEffect(() => {
    addHandlerToDayCard();
  }, []);

  function onMarkerClick(poi) {
    const lastClicked = new Date();
    
    setActivePin({
      poi,
      lastClicked
    });
  }

  return (
    <FeatureGroup ref={groupRef}>
      {
        pois.map((poi, index) => {
          // console.log(poi.coordinates);
          // console.log(icon);
          return (
          <Marker
            key={index}
            position={poi.coordinates}
            icon={icon}
            eventHandlers={{
              click: onMarkerClick.bind(null, poi)
            }}
            alt={`Waypoint for ${poi.coordinates}`}
            >
            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent={true}>
              <span className="poi-title">{poi.title}</span>
            </Tooltip>
          </Marker>);
        })
      }
    </FeatureGroup>
  );
}

export default DayPins
