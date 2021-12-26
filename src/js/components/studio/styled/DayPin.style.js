import styled from "styled-components";

export const TipText = styled.span`
  background-color: ${props => `#${props.color}`};
  width: 100%;
  display: block;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid white;
  box-shadow: 0 0 3px 1px #0000006b;
  text-shadow: 0 0 4px black;
  font-size: 110%;
`