import styled from 'styled-components';
import { unravelX, unravelY } from '../../styled/anim.style';
import { LocationInputContainer } from './Add.style';
import { BaseButton } from './StudioButtons.style';

export const EditLocationContainer = styled.div`
  height: 70px;
  /* border: 1px solid transparent; */
  margin: 12px 4px;
  padding: 1px;
`;


export const EditButton = styled(BaseButton)`
  display: ${props => props.visible ? 'none' : 'block'};
  width: 80%;
  padding: 5px;
  margin: 0 auto;
  position: relative;
  top: 25%;
  bottom: 25%;
`;

export const CloseButton = styled(BaseButton)`
  animation: ${unravelX} 300ms;

  margin-top: 5px;
  margin-left: 5px;
  padding: 5px;
`;

export const EditLocationTool = styled(LocationInputContainer)`
  animation: ${unravelX} 300ms;

  & .edit-location-poi.form {
    position: relative;
  }

  & .searchbar-submit-button {
    padding: 0 3px;
    margin: 0 auto;
    flex: 1 1 auto;
    text-align: center;
  }
`

