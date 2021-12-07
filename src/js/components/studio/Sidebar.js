import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SidebarContainer = styled.div`
  border: 1px solid fuchsia;
  display: ${props => props.visible ? "block" : "none"};
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(233,233,233);
`

const SidebarContent = styled.div`
  /* TODO debug this later with percentage height or just use vw. */
  height: ${[props => props.collapsed ? "0" : "100%"]};
  transition: all 300ms ease;
  overflow: hidden;
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

  // this keeps track of content changes; any time content changes or the user
  // clicks on it again, we automatically redisplay and uncollapse the sidebar.
  useEffect(() => {
    if (content) {
      setCollapsed(false);
      setDisplay(true);
    }
  }, [content]);


  return (
    <SidebarContainer
      visible={display}>
      <button onClick={() => { setDisplay(false) }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <button onClick={() => { setCollapsed(!collapsed) }}>
        Toggle Collapse
      </button>
      <FlexWrapper>
        <SidebarContent
          ref={ref}
          collapsed={collapsed}
          className={`sidebar ${collapsed && "collapsed"}`}>
          <p className="debug">
            {collapsed ? "(DEBUG. currently collapsed)" : "(DEBUG. not collapsed)"}
          </p>
          <section className="sidebar-contents">
            {!collapsed && (content ?? "No Day or POI currently selected.")}
          </section>
        </SidebarContent>
      </FlexWrapper>
    </SidebarContainer>
  )
}

export default React.forwardRef(Sidebar)
