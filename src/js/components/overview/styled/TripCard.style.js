import styled from "styled-components";

export const TripCardContainer = styled.div`
  width: 210px;
  height: 200px;
  border: 1px solid #888888;
  border-radius: 3px;
  position: relative;
  transition: transform 200ms;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 2px 2px 0px #a5e8fc69;
  }
`

export const TripCardImg = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;
  border-bottom: 1px solid #888888;
`

export const TripTitle = styled.h2`
    -webkit-text-decoration: none;
    text-decoration: none;
    font-weight: 500;
    padding: 5px;
    height: 1em;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

export const TripDate = styled.p`
    font-size: 85%;
    color: #565656;
    margin: 0 5px;
`


export const Options = styled.div`
  position: absolute;
  z-index: 1;
  display: inline-block;
  right: 2px;
  bottom: 2px;
`

export const OptionsButton = styled.button`
  all: unset;
  padding: 4px 9px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #dddddd;
  }
`

export const CardOptionsList = styled.ul`

  list-style: none;
  height: fit-content;
  margin: 2px;

  & li {
    height: 1.5rem;
    font-size: 90%;
    border-radius: 2px;
    padding: 3px;
  }
  
  & li > * {
    all: unset;
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
  }

  & li:hover {
    background-color: #dddddd;
  }
`