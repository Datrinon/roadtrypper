import React, { useState } from 'react'
import * as eL from './styled/EditLocation.style';
import LocationInput from './LocationInput';
import { TripDispatch } from './Studio';


// like the hover to edit component, but it's just the button directly.
// cuz the display is on the map already.
function EditLocation({ activePoi }) {

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
    <eL.EditLocationContainer>
      <eL.EditButton visible={editModeOn}
        onClick={() => setEditModeOn(true)}>
        Edit Location
      </eL.EditButton>
      {
        editModeOn &&
        <>
          <eL.EditLocationTool>
            <LocationInput onClickPOIMarker={updatePOILocation} />
          </eL.EditLocationTool>
          <eL.CloseButton onClick={() => setEditModeOn(false)}>Cancel</eL.CloseButton>
        </>
      }
    </eL.EditLocationContainer>
  )
}

export default EditLocation
