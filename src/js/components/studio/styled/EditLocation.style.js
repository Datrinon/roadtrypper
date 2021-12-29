import styled from 'styled-components';
import { LocationInputContainer } from './Add.style';
import { BaseButton } from './StudioButtons.style';

export const EditLocationContainer = styled.div`
  height: 70px;
  /* border: 1px solid transparent; */
  margin: 1px;
  padding: 1px;
`;


export const EditButton = styled(BaseButton)`
  display: ${props => props.visible ? 'none' : 'block'};
  width: 80%;
  padding: 5px;
  margin: 0 auto;
`;

export const CloseButton = styled(BaseButton)`
  margin-top: 5px;
  margin-left: 5px;
  padding: 5px;
`;

export const EditLocationTool = styled(LocationInputContainer)`
  
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