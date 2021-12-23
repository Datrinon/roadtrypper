import styled from 'styled-components';

export const TripTitle = styled.input`
  all: unset;
  padding: 1px 3px 2px 0px;
  margin: 5px 0;
  font-size: 140%;
  font-weight: 600;
  border: 2px solid transparent;
  border-bottom: 2px solid #bcbcbc;
  width: 100%;

  &:focus {
    border: 2px solid #54B4D3;
    border-radius: 4px;
  }
`