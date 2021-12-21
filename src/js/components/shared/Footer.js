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
    <FooterContainer className="footer">
      <FAIcon icon={faGithub}/>
      View Github here. (TODO)
    </FooterContainer>
  )
}

export default Footer
