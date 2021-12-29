import styled from "styled-components";
import { appear, unravelY } from "../../styled/anim.style";
import { BaseButton } from "./StudioButtons.style";


export const SuccessContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    animation: ${unravelY} ease-in-out 600ms;
`


export const SuccessMessage = styled.p`
  margin-bottom: 15px;
`

export const Button = styled(BaseButton)`
    width: 70%;
    margin: 5px auto;
    padding: 8px;
`