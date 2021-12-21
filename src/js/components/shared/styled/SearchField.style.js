import styled from "styled-components";
import { device } from "../../styled/breakpoints.style";


export const SearchForm = styled.form`
  display: ${props => props.visible ? "block" : "none"};

  @media ${device.tablet} {
    display: block;
  }
`