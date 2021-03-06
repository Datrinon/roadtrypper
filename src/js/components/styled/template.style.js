import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.div`
  width: 100vw;
  height: 48px;
  border-bottom: 1px solid #d3d3d3;
  box-shadow: 0px 1px 6px 0px #00000026;
`

export const NavLink = styled(Link)`
  text-decoration: none;
`

export const ListingBox = styled.div`
  display: flex;
  flex-direction: row;
`

export const ListingLabel = styled.p`
  max-width: 45ch;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0.3em 0;
`

export const ListingName = styled.span`
  font-weight: bold;
  font-size: 1.25em;
`

export const ListingSubstrMatch = styled.b`
  font-weight: 600;
  color: red;
`

export const FAIcon = styled(FontAwesomeIcon)`
  font-size: 1.25em;
  margin: 0 5px;
  align-self: center;
`

