import React, { useContext } from 'react'
import styled from 'styled-components';
import { UserContext } from '../Router'

const Icon = styled.div`
    background-color: navy;
    border-radius: 50%;
    border: 1px solid black;
    width: 32px;
    height: 32px;
    position: relative;
    cursor: pointer;
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


  return (
    <div>
      <Icon>
        <IconText>
          {user.email[0]}
        </IconText>
      </Icon>
    </div>
  )
}

export default AccountIcon
