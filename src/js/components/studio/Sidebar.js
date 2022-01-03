import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faAngleRight, faAngleLeft, faMapSigns, } from '@fortawesome/free-solid-svg-icons';

import * as sbS from './styled/Sidebar.style';
import { FAIcon } from '../styled/template.style';
import { NoContentMessage } from './styled/Details.style';



/**
 * A sidebar which is a wrapper component; place your children in it.
 * @param {*} param0 
 * @returns 
 */
function Sidebar({ visible, content, classNames=[] }, ref) {
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
      visible={display}
      className={`sidebar ${[...classNames]} ${collapsed ? "collapsed" : "not-collapsed"}`}>
      <sbS.CollapseButton className="sidebar-toggle-button" onClick={() => { setCollapsed(!collapsed) }}>
        {collapsed ?
          <FAIcon icon={faAngleLeft} />
          : <FAIcon icon={faAngleRight} />}
      </sbS.CollapseButton>
      <sbS.CloseButton onClick={() => { setDisplay(false) }}>
        <FontAwesomeIcon icon={faTimes} />
      </sbS.CloseButton>
      {/* Need wrapper for box shadow and to maintain a width of 100%
      (that is, to the screen's edge.)*/}
      <sbS.SidebarContent
        ref={ref}
        className={`sidebar-contents ${collapsed && "collapsed"}`}>
        {
          content ??
          <NoContentMessage>
            <FAIcon icon={faMapSigns} className="sign-icon"/>
            <span>No Day or POI currently selected.</span>
          </NoContentMessage>
        }
      </sbS.SidebarContent>
    </sbS.SidebarContainer>
  )
}

export default React.forwardRef(Sidebar)
