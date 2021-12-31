import styled from 'styled-components';
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

export const AddPhotoButton = styled(BaseButton)`
  margin-top: 1em;
  padding: 0.5em;
  font-size: 1.25em;
`


export const Warning = styled.h1`
  display: ${props => props.visible ? "block" : "none"};
  font-size: 2.5em;
`;



