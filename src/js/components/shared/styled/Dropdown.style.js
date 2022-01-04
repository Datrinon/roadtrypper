import styled, {keyframes} from 'styled-components';

const appear = keyframes`
0% {
  opacity: 0
}
100% {
  opacity: 1
}
`

export const DropdownMenuContainer = styled.div`
    display: ${props => props.visible ? "block" : "none"};
    border: 1px solid #bebebe;
    border-radius: 3px;
    position: absolute;
    top: 135%;
    right: -15%;
    animation: hjECeF 300ms;
    width: max-content;
    background-color: white;
    box-shadow: 0px 2px 3px 0px #3f3f3f54;
    z-index: 999;

    &::after{
      position: absolute;
      content: "";
      border-bottom: 10px solid #b1b1b1;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid transparent;
      top: -20px;
      right: 0%;
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      transform: translateX(-50%);
    }
`
