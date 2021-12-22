import styled from "styled-components";
import { appear } from "../../styled/anim.style";
import { device } from "../../styled/breakpoints.style";
import { FAIcon } from "../../styled/template.style";


export const SearchForm = styled.form`
  display: ${props => props.visible ? "initial" : "none"};
  position: absolute;
  top: 3px;
  left: 0;
  background-color: #d0d0d0;
  border-radius: 20px;
  padding: 0 8px 0 16px;
  animation: ${appear} 300ms;
  max-width: 410px;
  width: 79%;

  @media ${device.tablet} {
    /* display: block; */
  }
`

export const SearchInput = styled.input`
  all: unset;
`

export const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SearchButton = styled.button`
  all: unset;
  border-radius: 50%;
  padding: 0px 5px;

  &:hover {
    background-color: rgba(0,0,0,0.25);
  }
`

export const SearchBarToggle = styled(FAIcon)`
  display: ${props => props.visible ? "initial" : "none"};
  padding: 8px 10px;
  border-radius: 50%;
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.15);
  }
`

export const SearchBarIcon = styled(FAIcon)`
  padding: 8px 10px;
  border-radius: 50%;
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.15);
  }
`

export const SearchBarBG = styled.div`
`