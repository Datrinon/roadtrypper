import React, { useContext, useRef, useState } from 'react'
import { signOutUser } from '../../database/auth';
import useDropdown from '../../hooks/useDropdown';
import { UserContext } from '../Router'
import Dropdown from './Dropdown';


import * as aS from "./styled/AccountIcon.style";


function AccountIcon() {

  const user = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible, dropdownRef] = useDropdown();

  return (
    <div className="account-icon">
      <aS.Icon onClick={setDropdownVisible.bind(null, true)}>
        <aS.IconText>
          {user.email ? user.email[0] : "G"}
        </aS.IconText>
        <Dropdown
          visible={dropdownVisible}
          position={"-325%"}
          ref={dropdownRef}>
          <aS.IconDropdownList>
            <aS.AccBullet className="account-info">
              Signed in as
              <br/>
              <span>{user.email ? user.email : "Guest"}</span>
            </aS.AccBullet>
            <li><button className={"sign-out-button"} onClick={signOutUser}>Sign Out</button></li>
          </aS.IconDropdownList>
        </Dropdown>
      </aS.Icon>
    </div>
  )
}

export default AccountIcon
