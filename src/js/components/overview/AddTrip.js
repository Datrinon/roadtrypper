import React, {useState, useContext, useRef, useEffect} from 'react'

import { addTrip } from '../../database/data'
import { UserContext } from '../Router'

import { useHistory } from 'react-router-dom';

function AddTrip() {

  const [disabled, setDisabled] = useState(false);
  const abort = useRef(new AbortController());

  const user = useContext(UserContext);
  const history = useHistory();

  function onAddTrip(e) {
    setDisabled(true);

    addTrip(user, abort).then((docRef) => {
      console.log(docRef);
      history.push("/trips/" + docRef.id);
    })
  }

  useEffect(() => {

    return () => {
      abort.current.abort();
    }
  }, []);

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
