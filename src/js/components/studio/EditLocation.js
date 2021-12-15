import React, { useState } from 'react'
import styled from 'styled-components';
import LocationInput from './LocationInput';
import { TripDispatch } from './Studio';


const EditButton = styled.button`
  display: ${props => props.visible ? 'none' : 'initial'};
`

// like the hover to edit component, but it's just the button directly.
// cuz the display is on the map already.
function EditLocation({activePoi}) {

  const [editModeOn, setEditModeOn] = useState(false);
  const dispatch = React.useContext(TripDispatch);


  function updatePOILocation(result) {
    const coordinates = [result.y, result.x];

    dispatch({
      type: "edit",
      payload: {
        type: "pois",
        id: activePoi.id,
        key: "coordinates",
        value: coordinates,
        ref: activePoi.ref
      }
    });
    setEditModeOn(false); // closes the edit location prompt.
  }

  return (
    <div>
      <EditButton visible={editModeOn}
        onClick={() => setEditModeOn(true)}>
        Edit Location
      </EditButton>
      {
        editModeOn &&
        <>
          <LocationInput onClickPOIMarker={updatePOILocation} />
          <button onClick={() => setEditModeOn(false)}>Close</button>
        </>
      }
    </div>
  )
}

export default EditLocation
