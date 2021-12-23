import React, { useState, useEffect, useRef } from 'react'
import * as dS from "./styled/Dropdown.style";

/**
 * It's a dropdown menu component. Shows when visible is TRUE; use
 * the parent to pass in TRUE to show the dropdown (preferably on an click event).
 * Then, when clicked outside of the element, it closes automatically. This behavior
 * is managed internally by the component. 
 * 
 * Make sure that when you're using it, you place it within a positioned
 * element.
 * 
 * @param visible : whether or not the element is visible.
 * @param position : position of the dropdown menu (optional).
 * @param children : the contents of the dropdown to display.
 */
function Dropdown({ visible, position, children }, ref) {
  
  const [display, setDisplay] = useState(visible);
  
  useEffect(() => {
    setDisplay(visible);
  }, [visible]);

  function closeMenu(e) {
    if (!e.composedPath().includes(ref.current)) {
      setDisplay(false);
    }
  }

  useEffect(() => {
    if (display) {
      window.addEventListener("click", closeMenu);
    } else {
      window.removeEventListener("click", closeMenu);
    }
    
    return () => {
      window.removeEventListener("click", closeMenu);
    }
  }, [display]);

  
  return (
    <dS.DropdownMenuContainer
      visible={display}
      position={position}
      ref={ref}>
      {children}
    </dS.DropdownMenuContainer>
  )
}

export default React.forwardRef(Dropdown);
