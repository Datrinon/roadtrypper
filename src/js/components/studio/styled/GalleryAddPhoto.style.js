import styled from 'styled-components';
import { color } from '../../styled/colors.style';
import { BaseButton } from './StudioButtons.style';

export const AddAPhotoContainer = styled.div`
  border: 1px solid fuchsia;
  color: darkgrey;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 1em;
  text-align: center;

  & .icon-error {
    display: block;
    margin: 0 auto;
  }
`

export const ShowFormButton = styled(BaseButton)`
  display: ${props => props.visible ? "block" : "none"};
  margin-top: 1em;
  padding: 0.5em;
  font-size: 1.25em;
  color: black;
`


export const Warning = styled.h1`
  display: ${props => props.visible ? "block" : "none"};
  font-size: 2.5em;
`;

export const AddPhotoForm = styled.div`
  display: ${props => props.visible ? "block" : "none"};
  font-family: inherit;
  text-align: start;

  & .photo-upload {
    font-family: inherit;
    font-size: 100%;
  }

  & .photo-description > * {
    display: block;
  }

  & .photo-description .label {
    display: block;
    padding: 3px;
    font-size: 110%;
    font-weight: 600;
    font-variant-caps: all-petite-caps;
  }

  & .photo-description .text-area {
    width: 100%;
    resize: none;
    height: 10em;
    font-family: inherit;
    font-size: 100%;
  }

  & .photo-description .char-rem {
    display: block;
    text-align: end;
  }
`

export const AddPhotoButton = styled(BaseButton)`
  all: unset;
  text-align: center;
  border-radius: 3px;
  box-shadow: 0px 1px 1px 0px #0000002b;
  font-weight: 600;
  padding: 5px;
  margin: 3px;
  cursor: pointer;
  transition: all 300ms;
  color: white;
  background-color: ${color.primary};

  
  &:hover:not([disabled]) {
    background-color: ${color.primaryHover};

  }

  &:active:not([disabled]) {
    background-color: ${color.primaryPress};
    box-shadow: inset 1px 2px 7px black;
  }
`


