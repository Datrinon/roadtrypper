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
    top: 100%;
    left: 0px;
    animation: hjECeF 300ms;
    width: max-content;
    background-color: white;
    box-shadow: 0px 2px 3px 0px #3f3f3f54;
`
