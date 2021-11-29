import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SidebarContainer = styled.div`
  border: 1px solid fuchsia;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  background-color: darkgrey;
`

const SidebarContent = styled.div`
  display: ${props => props.visible ? "block" : "none"};
  height: ${[props => props.collapsed ? "0" : "100%"]};
  transition: all 100ms ease;
`

/**
 * A sidebar which is a wrapper component; place your children in it.
 * @param {*} param0 
 * @returns 
 */
function Sidebar({ visible, content }, ref) {
  const [display, setDisplay] = useState(visible);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setDisplay(visible);
  }, [visible]);

  // might not need sidebarCollapsed to be exposed in the custom hook, could
  // belong to state internally.
  useEffect(() => {
    if (content) {
      setCollapsed(false);
    }
  }, [content]);

  /**
   * Prioritize adding over activePin
   */
  return (
    <SidebarContainer>
      <button onClick={() => { setCollapsed(!collapsed) }}>
        <FontAwesomeIcon icon={faTimes} />
        Toggle Collapse
      </button>
      <SidebarContent
        ref={ref}
        visible={display}
        collapsed={collapsed}
        className={`sidebar ${collapsed && "collapsed"}`}>
        <p className="debug">
          {collapsed ? "(DEBUG. currently collapsed)" : "(DEBUG. not collapsed)"}
        </p>
        <section className="sidebar-contents">
          {display && content}
        </section>
      </SidebarContent>
    </SidebarContainer>
  )
}

export default React.forwardRef(Sidebar)
