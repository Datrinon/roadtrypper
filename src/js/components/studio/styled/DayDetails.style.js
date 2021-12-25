import styled from "styled-components";

export const dayColorPin = styled.div`
  background-color: ${props => `#${props.color}`};
  width: 32px;
  height: 32px;
  display: block;
  transition: background-color 300ms;
  border-radius: 50%;
`