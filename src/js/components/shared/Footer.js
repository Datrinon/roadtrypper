import React from 'react'
import styled from 'styled-components'
import { FAIcon } from '../styled/template.style'

import { faGithub } from '@fortawesome/free-brands-svg-icons'

const FooterContainer = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  padding: 8px;
`

function Footer() {
  return (
    <FooterContainer>
      <FAIcon icon={faGithub}/>
      View Github here.
    </FooterContainer>
  )
}

export default Footer
