import React, { useRef } from 'react'
import { FeatureGroup, Marker, Tooltip } from 'react-leaflet';
/**
 * It's a group of markers 
 * Each one has a ref
 * 
 * The ref is passed to a callback in Map which allows bounding.
 */

function DayPins({ pois, icon }) {

  const groupRef = useRef();

  return (
    <FeatureGroup ref={groupRef}>
      {
        pois.map(poi => {
          <Marker position={poi.coordinates} icon={icon}>
            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent={true}>
              <span className="poi-title">{poi.title}</span>
            </Tooltip>
          </Marker>
        })
      }
    </FeatureGroup>
  );
  )
}

export default DayPins
