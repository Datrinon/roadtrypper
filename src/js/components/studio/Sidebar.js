import React, { useState, useEffect } from 'react'

import PoiDetails from './POIDetails';

/**
 * A sidebar which is a wrapper component; place your children in it.
 * @param {*} param0 
 * @returns 
 */
function Sidebar({ children, collapseState }) {
  const [collapsed, setCollapsed] = useState(collapseState);

  useEffect(() => {
    setCollapsed(collapseState);
  }, [collapseState]);

  /**
   * Prioritize adding over activePin
   */
  return (
    <div className={`sidebar ${collapsed && "collapsed"}`}>
      {collapsed ? "(DEBUG. currently collapsed)" : "(DEBUG. not collapsed)"}
      {!collapsed && (
        <section className="sidebar-contents">
          {children}
        </section>
      )}
    </div>
  )
}

export default Sidebar
