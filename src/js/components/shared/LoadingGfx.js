import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const Loader = styled.div`
  color: red;
  font-family: "comic sans ms";
  display: ${props => props.visible ? 'block' : 'none'};
`

function LoadingGfx({visible}) {

  return (
    <Loader visible={visible}>
      Loading!
    </Loader>
  )
}

export default LoadingGfx
