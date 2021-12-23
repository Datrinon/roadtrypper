import styled from "styled-components";
import { appear } from "../../styled/anim.style";
import { device } from "../../styled/breakpoints.style";
import { FAIcon } from "../../styled/template.style";


export const SearchFormContainer = styled.div`
  visibility: ${props => props.visible ? "initial" : "hidden"};

  @media ${device.tablet} {
    visibility: initial;
  }
`

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50%;
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
  visibility: ${props => props.visible ? "visible" : "hidden"};
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

export const SearchResultContainer = styled.div`
  position: relative;
  top: 5px;
  right: 5px;
  border-radius: 2px;
  box-shadow: 1px 3px 5px 0px #6c6a6a73;
`

export const SearchResult = styled.button`
all: unset;
display: block;
width: 100%;
height: 1.25rem;
background-color: #fdfdfd;
border: 1px solid transparent;
padding: 8px 0;

&:hover {
  background-color: #dedede;
}

&:focus {
  border: 1px solid blue;
}
`
