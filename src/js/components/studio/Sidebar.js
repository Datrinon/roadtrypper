import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faAngleRight, faAngleLeft, } from '@fortawesome/free-solid-svg-icons';

import * as sbS from './styled/Sidebar.style';
import { FAIcon } from '../styled/template.style';



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
    <sbS.SidebarContainer
      collapsed={collapsed}
      visible={display}>
      <sbS.CollapseButton onClick={() => { setCollapsed(!collapsed) }}>
        {collapsed ?
          <FAIcon icon={faAngleLeft}/> 
        : <FAIcon icon={faAngleRight}/>}
      </sbS.CollapseButton>
      {/* Need flex wrapper for box shadow */}
      <sbS.FlexWrapper>
        <sbS.CloseButton onClick={() => { setDisplay(false) }}>
          <FontAwesomeIcon icon={faTimes} />
        </sbS.CloseButton>
        <sbS.SidebarContent
          ref={ref}
          className={`sidebar ${collapsed && "collapsed"}`}>
          <section className="sidebar-contents">
            {!collapsed && (content ?? "No Day or POI currently selected.")}
          </section>
        </sbS.SidebarContent>
      </sbS.FlexWrapper>
    </sbS.SidebarContainer>
  )
}

export default React.forwardRef(Sidebar)
