import React, {useState, useContext, useRef, useEffect} from 'react'

import * as oS from "./styled/Overview.style";

import { addTrip } from '../../database/data'
import { UserContext } from '../Router'

import { useHistory } from 'react-router-dom';
import { FAIcon } from '../styled/template.style';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
      <oS.AddTripButton onClick={onAddTrip} disabled={disabled}>
        <FAIcon icon={faPlus}/>
      </oS.AddTripButton>
      {disabled &&
        <p>Creating a new trip... please wait.</p>
      }
    </div>
  )
}

export default AddTrip
