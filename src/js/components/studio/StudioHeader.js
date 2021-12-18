import React from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from '../shared/AccountIcon'
import HomeLogo from '../shared/HomeLogo'

import * as s from "../styled/template.style"


function StudioHeader() {
  return (
    <s.Header>
      <HomeLogo/>
      <span>Here's your header, bro.</span>
      <AccountIcon />
    </s.Header>
  )
}

export default StudioHeader
