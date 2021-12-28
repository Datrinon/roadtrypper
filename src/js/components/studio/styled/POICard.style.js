import styled from 'styled-components';
import DefaultPOICardImg from '../../../../data/images/city-map-vector.png';

export const POICardBox = styled.div`
  background-image: url("${DefaultPOICardImg}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 75%;
  height: 128px;
  border: 1px solid grey;
  transition: transform 300ms, border 300ms;
  cursor: pointer;

  &:hover {
    border: 1px solid darkgrey;
  }
`;

export const POICardTitle = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  color: white;
  text-shadow: 0 0 4px black;
  margin: 12px 6px;
`
