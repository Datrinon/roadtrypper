import styled from 'styled-components';

export const TripTitle = styled.input`
  all: unset;
  padding: 1px 3px 2px 0px;
  margin: 15px 0 5px 0;
  font-size: 140%;
  font-weight: 600;
  border: 2px solid transparent;
  border-bottom: 1px solid #dedede;
  width: 97%;

  &:focus {
    border: 2px solid #54B4D3;
    border-radius: 4px;
  }
`