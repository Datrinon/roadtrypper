import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"


function HoverToEditInput({ displayVer, editVer, onClickSave }) {

  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const HoverEditButton = styled.button`
    display: ${props => props.visible ? 'initial' : 'none'};
  `

  const EditModeOptions = styled.div`
    border: 1px solid cyan;
    display: ${props => props.visible ? 'inline' : 'none'};

    & button {
      border: 1px solid red;
    }
  `

  const exitEditMode = (e) => {
    if (!e.composedPath().includes(document.querySelector(".editing"))) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (editMode) {
      window.addEventListener("click", exitEditMode); 
    } else {
      window.removeEventListener("click", exitEditMode);
    }
    return () => {
      window.removeEventListener("click", exitEditMode);
    }
  }, [editMode]);

  return (
    <div className={`editable ${editMode ? "editing" : ""}`}
      onMouseEnter={() => !editMode && setVisible(true)}
      onMouseLeave={() => !editMode && setVisible(false)}>
      {editMode ? editVer : displayVer}
      <HoverEditButton
        visible={visible}
        onClick={() => {
          setEditMode(true);
          setVisible(false);
        }}>
        <FontAwesomeIcon icon={faEdit} />
      </HoverEditButton>
      <EditModeOptions visible={editMode}>
        <button onClick={() => {onClickSave(); setEditMode(false)}}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </EditModeOptions>
    </div>
  );
}

export default HoverToEditInput;