import React, { useRef } from 'react'
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
function DayPins({ pois, icon }) {

  const groupRef = useRef();

  return (
    <FeatureGroup ref={groupRef}>
      {
        pois.map((poi, index) => {
          // console.log(poi.coordinates);
          // console.log(icon);
          return (<Marker key={index}
            position={poi.coordinates}
            icon={icon}>
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
