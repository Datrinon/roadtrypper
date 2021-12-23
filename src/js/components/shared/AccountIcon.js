import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components';
import { signOutUser } from '../../database/auth';
import useDropdown from '../../hooks/useDropdown';
import { UserContext } from '../Router'
import Dropdown from './Dropdown';


const Icon = styled.div`
    background-color: navy;
    border-radius: 50%;
    border: 1px solid black;
    width: 32px;
    height: 32px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    float: right;
`

const IconText = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 15%;
    /* bottom: 25%; */
    text-transform: capitalize;
    color: white;
    font-weight: 700;
    font-size: 24px;
    user-select: none;
`



function AccountIcon() {

  const user = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible, dropdownRef] = useDropdown();

  return (
    <div>
      <Icon onClick={setDropdownVisible.bind(null, true)}>
        <IconText>
          {user.email ? user.email[0] : "G"}
        </IconText>
        <Dropdown visible={dropdownVisible} ref={dropdownRef}>
          <ul>
            <li>Here's your dropdown, bro.</li>
            <li><button onClick={signOutUser}>Sign Out.</button></li>
          </ul>
        </Dropdown>
      </Icon>
    </div>
  )
}

export default AccountIcon
