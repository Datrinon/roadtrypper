import React, { useState } from 'react'
import styled from 'styled-components';
import EditLocationInput from './EditLocationInput';


const EditButton = styled.button`
  display: ${props => props.visible ? 'none' : 'initial'};
`

// like the hover to edit component, but it's just the button directly.
// cuz the display is on the map already.
function EditLocation() {

  const [editModeOn, setEditModeOn] = useState(false);

  return (
    <div>
      <EditButton visible={editModeOn}
        onClick={() => setEditModeOn(true)}>
          Edit Location
      </EditButton>
      {
        editModeOn &&
        <>
        <EditLocationInput />
        <button onClick={() => setEditModeOn(false)}>Close</button>
        </>
      }
    </div>
  )
}

export default EditLocation
