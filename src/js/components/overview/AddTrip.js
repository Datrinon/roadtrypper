import React, {useContext} from 'react'

import { addTrip } from '../../database/data'
import { UserContext } from '../Router'


function AddTrip() {

  const user = useContext(UserContext);

  return (
    <div>
      <button onClick={addTrip.bind(null, user.uid)}>
        (Floating Button) Start a New Trip
      </button>
    </div>
  )
}

export default AddTrip
