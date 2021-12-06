import React, { useState, useRef, useEffect } from 'react'

//! Damn I wrong, I needed this to manage sync the visibility status
//! between the child and the parent.

/**
 * A hook for managing the state of a Dropdown. Call this hook from the component
 * in which you need the dropdown.
 * 
 * The parameters are provided in an object as follows.
 * @param {object} init - Object to initialize the dropdown with. It should
 * have the following properties...:
 * 
 * @prop {boolean} visible - True if visible, false if not visible. 
 */
 export default function useDropdown(init = null) {
  const [dropdownVisible, setDropdownVisible] = useState(init?.visible ?? false);

  const dropdownRef = useRef();
  const dropdownObserver = useRef();

  /**
   * This useEffect hook is to establish a mutationObserver which will 
   * watch to see if the dropdown closes, at then it which it will sync
   * the state variable dropdownVisible to match the status.
   * 
   * ! This is important to ensure that the child (dropdown) and the parent
   * ! which uses it have its state synced together.
   * ! This is one of the primary reasons we have this custom hook.
   */
  useEffect(() => {
    const callback = () => {
      const dropdownStyle = getComputedStyle(dropdownRef.current);
      if (dropdownStyle.display === 'none') {
        setDropdownVisible(false);
      }
    }

    dropdownObserver.current = new MutationObserver(callback);

    return () => {
      dropdownObserver.current.disconnect();
    }
  }, []);

  useEffect(() => {
    const config = { attributes : true };

    if (dropdownRef.current) {
      console.log("Dropdown: ");
      console.log(dropdownRef.current);
      dropdownObserver.current.observe(dropdownRef.current, config);
    }
  }, [dropdownRef.current]);
  
  return [
    dropdownVisible,
    setDropdownVisible,
    dropdownRef
  ]
}

