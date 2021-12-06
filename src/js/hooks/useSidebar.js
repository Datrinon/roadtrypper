import React, { useState, useRef, useEffect } from 'react'


/**
 * A hook for managing the state of a Sidebar. Call this hook from the component
 * in which you need the sidebar.
 * 
 * The parameters are provided in an object as follows.
 * @param {object} init - Object to initialize the sidebar with. It should
 * have the following properties...:
 * 
 * @prop {boolean} visible - True if visible, false if not visible. 
 * @prop {HTMLElement} contents - The contents of the sidebar to display.
 */
 export default function useSidebar(init = null) {
  const [sidebarVisible, setSidebarVisible] = useState(init?.visible ?? false);
  const [sidebarContent, setSidebarContent] = useState(init?.content ?? null);

  const sidebarRef = useRef();
  const sidebarObserver = useRef();

  /**
   * This UE hook is to establish observers which will watch for the addition 
   * or removal of children sidebar and then set the visibility of the sidebar.
   * • If the sidebar has children but is collapsed, show a tab for expand / collapse.
   * • If the sidebar has no children and is collapsed, do not show that tab.
   */
  useEffect(() => {
    const callback = () => {
      const sidebarStyle = getComputedStyle(sidebarRef.current);
      if (sidebarStyle.display === 'none') {
        setSidebarVisible(false);
      }
    }

    sidebarObserver.current = new MutationObserver(callback);

    return () => {
      sidebarObserver.current.disconnect();
    }
  }, []);

  useEffect(() => {
    const config = { attributes : true };

    if (sidebarRef.current) {
      console.log(sidebarRef.current);
      sidebarObserver.current.observe(sidebarRef.current, config);
    }
  }, [sidebarRef.current]);
  
  const values = {
    visible: sidebarVisible,
    content: sidebarContent
  };

  const mutators = {
    setVisible: setSidebarVisible,
    setContent: setSidebarContent
  };

  return [
    values,
    mutators,
    sidebarRef
  ]
}

