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
      <a
        style={{"text-decoration": "none",
                "color": "rgb(246 210 80)"}}
        rel="noreferrer"
        href="https://github.com/Datrinon/roadtrypper"
        target="_blank">View Github here.</a>
    </FooterContainer>
  )
}

export default Footer
