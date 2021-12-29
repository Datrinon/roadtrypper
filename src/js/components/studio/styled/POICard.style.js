import styled from 'styled-components';
import DefaultPOICardImg from '../../../../data/images/city-map-vector.png';
import { FAIcon } from '../../styled/template.style';

export const POICardBox = styled.div`
  /* background-image: url("${DefaultPOICardImg}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  --bg-color: ${props => `#${props.color}`};
  background: linear-gradient(90deg, var(--bg-color) 0%, rgba(255,255,255, 1) 100%);
  display: flex;
  align-items: center;
  width: 96%;
  height: 128px;
  transition: border 300ms;
  cursor: pointer;
  margin: 12px auto;
  position: relative;

  &:hover {
    border-left: 4px solid #658dff;
  }
`;

export const POICardTitle = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  color: white;
  text-shadow: 0 0 4px black;
  margin: 12px 6px;
  position: relative;
`

export const POIIcon = styled(FAIcon)`
    color: rgb(30 30 30 / 75%);
    position: absolute;
    top: 43%;
    transform: scale(5);
    left: 20%;
    z-index: 0;
`