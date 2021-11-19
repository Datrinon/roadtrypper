import styled from 'styled-components';

export const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
`
export const EditModeInput = styled.input`
  display: block;
`

export const EditModeTextBox = styled.textarea`
  display: block;
`

export const Modal = styled.div`
  border: 1px solid lime;
`

export const ToggleVisibilityDiv = styled.div`
  display: ${props => props.visible ? "display" : "none"};
`