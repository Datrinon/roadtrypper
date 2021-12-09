import React, {useState, useContext} from 'react'

import { addTrip } from '../../database/data'
import { UserContext } from '../Router'

import { useHistory } from 'react-router-dom';

function AddTrip() {

  const [disabled, setDisabled] = useState(false);

  const user = useContext(UserContext);
  const history = useHistory();

  function onAddTrip(e) {
    setDisabled(true);

    addTrip(user).then((docRef) => {
      history.push(docRef.id);
    })
  }

  return (
    <div>
      <button onClick={onAddTrip} disabled={disabled}>
        (Floating Button) Start a New Trip
      </button>
      {disabled &&
        <p>Creating a new trip... please wait.</p>
      }
    </div>
  )
}

export default AddTrip
