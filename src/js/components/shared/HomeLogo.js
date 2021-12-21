import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import RoadTrypperIcon from "../../../data/Roadtrypper.png";

const Logo = styled.div`
  font-family: "Segoe UI";
  display: flex;
  font-weight: 400;
  font-size: 1.5em;
  padding: 0 8px;
`

const LogoImg = styled.img`
  height: 32px;
`

const LogoTxt = styled.p`
  align-self: center;
`

const linkStyled = {
  textDecoration: "none",
  ["align-self"]: "center"
}


function HomeLogo() {
  return (
      <Link to="/" style={linkStyled}>
        <Logo>
          <LogoImg src={RoadTrypperIcon} alt="logo" />
          <LogoTxt>RoadTrypper</LogoTxt>
        </Logo>
      </Link>
  )
}

export default HomeLogo
