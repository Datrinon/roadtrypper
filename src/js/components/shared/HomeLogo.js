import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import RoadTrypperIcon from "../../../data/logo.jpg";

const Logo = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  font-weight: 700;
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
  textDecoration: "none"
}


function HomeLogo() {
  return (
      <Link to="/" style={linkStyled} className="home-logo">
        <Logo>
          <LogoImg src={RoadTrypperIcon} alt="logo" />
        </Logo>
      </Link>
  )
}

export default HomeLogo
