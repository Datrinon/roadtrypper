import styled from 'styled-components';
import { device } from '../../styled/breakpoints.style';
import { color } from '../../styled/colors.style';

/**
 * Stylings for authentication-related components of the website.
 */

/**
 * Define the responsiveness... best way? Remember -- mobile-first approach!
 */

export const Background = styled.div`
  overflow: hidden;

  @media ${device.mobileL} {
    background-image: url(/static/media/road.39b249a8.jpg);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-color: rgb(0 0 0 / 25%);
    background-blend-mode: darken;
    width: 100vw;
    height: 100vh;
    background-position-x: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    /* flex-direction: column; */
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    /* justify-content: center; */
    position: fixed;
    z-index: -1;
  }
`

export const AuthFormContainer = styled.div`
  background-color: white;
  margin: 0 auto;
  padding: 15px;
  border-radius: 5px;

  @media ${device.mobileL} {
    width: 90vw;
    max-width: 325px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const Header = styled.h1`
  text-align: center;
  margin: 15px 0;
  font-size: 125%;
`

export const Form = styled.form`
  width: 95%;
  margin: 0 auto;

  @media ${device.mobileL} {
  }
`

export const Label = styled.label`
  padding: 0 5%;
  margin: 12px 0 5px 0;
  display: block;
  font-weight: bold;
`

export const Input = styled.input`
  display: block;
  padding: 8px 4px;
  font-family: inherit;
  border: 1px solid #878787;
  border-radius: 2px;
  width: 90%;
  margin: 0 auto;
`

export const Button = styled.button`
  font-family: inherit;
  font-weight: bold;
  width: 90%;
  max-width: 320px;
  margin: 15px auto;
  padding: 8px 17px;
  display: block;
  border: none;
  border-radius: 2px;
  transition: all 300ms;
  cursor: pointer;

  color : ${props => props.color ?? "initial"};

  background-color: ${props => props.hue ? `hsl(${props.hue}, ${props.sat}%, ${props.lig}%)` : "darkgrey"};

  &:hover:not([disabled]) {
    background-color: ${props => props.hue ? `hsl(${props.hue}, ${props.sat}%, ${props.lig + 15}%)` : "darkgrey"};
  }

  &:active:not([disabled]) {
    background-color: ${props => props.hue ? `hsl(${props.hue}, ${props.sat}%, ${props.lig - 15}%)` : "darkgrey"};
    box-shadow: inset 1px 2px 7px black;
  }

  &:disabled {
    background-color: hsl(0, 0%, 50%);
    cursor: not-allowed;
  }
`

export const FormSubmitButton = styled(Button)`
  background-color: ${color.primary};
  color: white;
  transition: background-color box-shadow 300ms;
  width: 95%;

  &:hover:not([disabled]) {
    background-color: ${color.primaryHover};
  }

  &:active:not([disabled]) {
    background-color: ${color.primaryPress};
    box-shadow: inset 1px 2px 7px black;
  }
`

export const FormLink = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 90%;
`

export const FormDividerBreak = styled.hr`
  border: 1px solid #909090;
  margin: 0 35px;
`

export const FormDivider = styled.div`
  position: relative;
  margin: 25px 15px 5px;
`

export const FormDividerLabel = styled.span`
  position: absolute;
  z-index: 1;
  top: -8px;
  left: 50%;
  /* right: 25%; */
  transform: translate(-50%, 0);
  width: fit-content;
  padding: 0 5px;
  font-size: 85%;
  text-align: center;
  background-color: white;
`

export const FormBreak = styled.hr`
  border: none;
  border-top: 3px double #333;
  color: #333;
  overflow: visible;
  text-align: center;
  height: 5px;
  margin: 35px;

  &:after {
    background: #fff;
    content: 'OR';
    padding: 0 4px;
    position: relative;
    top: -13px;
}
`

export const FormText = styled.p`
  text-align: center;
  width: 80%;
  margin: 0 auto;
  line-height: 1.25em;
`

export const FormTextError = styled(FormText)`
  color: red;
  font-size: 90%;
`