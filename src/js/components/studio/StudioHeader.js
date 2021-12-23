import React from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from '../shared/AccountIcon'
import HomeLogo from '../shared/HomeLogo'

import * as s from "../styled/template.style";
import * as sH from "./styled/StudioHeader.style.js";


function StudioHeader() {
  return (
    <s.Header>
      <sH.StudioHeaderContents>
        <HomeLogo />
        <AccountIcon />
      </sH.StudioHeaderContents>
    </s.Header>
  )
}

export default StudioHeader
