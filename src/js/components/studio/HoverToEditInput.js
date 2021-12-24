import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"

import * as hS from "./styled/HoverToEditInput.style";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function HoverToEditInput({ displayVer, editVer, onClickSave }) {

  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const thisElement = useRef();
  
  const exitEditMode = (e) => {
    // debugger;
    // console.log(thisElement.current);
    if (!e.composedPath().includes(thisElement.current)) {
      setEditMode(false);
    }

    // if (!e.composedPath().includes(document.querySelector(".editing"))) {
    //   setEditMode(false);
    // }
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
    <hS.Container
      ref={thisElement}
      className={`editable ${editMode ? "editing" : ""}`}
      onMouseEnter={() => !editMode && setVisible(true)}
      onMouseLeave={() => !editMode && setVisible(false)}>
      {editMode ? editVer : displayVer}
      <hS.HoverEditButton
        visible={visible}
        onClick={() => {
          setEditMode(true);
          setVisible(false);
        }}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </hS.HoverEditButton>
      <hS.EditModeOptions visible={editMode}>
        <button onClick={() => {onClickSave(); setEditMode(false)}}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </hS.EditModeOptions>
    </hS.Container>
  );
}

export default HoverToEditInput;