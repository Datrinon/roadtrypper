import styled from "styled-components";
import * as d from "./Details.style";

export const descriptionTextBox = styled.textarea``

export const Label = styled.label`
  display: block;
  margin: 12px 12px 4px 12px;
  font-weight: 600;

  & > * {
    display: block;
  }
`

export const HeadingLv2 = styled(d.HeadingLv2)`
  font-size: 115%;
`

export const DaySelect = styled(d.DayOrderSelect)`
  display: block;
  margin: 0 auto;
  width: 95%;
`

const FormSection = styled.section`
  border: 1px solid #bbbbbb;
  margin: 4px;
  padding-bottom: 1em;
`

export const FormSectionTop = styled(FormSection)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 0px;
`

export const FormSectionBot = styled(FormSection)`
  margin-top: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid transparent;
`

export const LocationResult = styled.input`
  all: unset;
  font-family: inherit;
  width: 95%;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 80%;
  font-weight: 400;

  &:disabled {
    font-style: italic;
    color: grey;
  }
`

export const LocationInputContainer = styled.div`
  margin-top: 5px;

  
  & .searchbar-close {
    display: none;
  }

  & .button-toggle {
    display: none;
  }

  & .searchbar {
    border: 1px solid #565656;
    display: flex;
    width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  & #search-field {
    all: unset;
    width: 80%;
    border-right: 1px solid black;
    padding: 5px;
    font-weight: 400;
    cursor: text;
  }

  & .searchbar-submit-button {
    all: unset;
    display: block;
    margin: 0 auto;
    padding: 0 6px;
    /* width: 16%; */
    background-color: #d1d1d1;
    transition: background-color 300ms;
    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }
  }
  
  & .add-location.form {
    position: relative;
  }

  & .search-results {
    font-size: 0.85rem;
    position: absolute;
    top: 99%;
    width: 100%;
    left: 0;
    border: 1px solid #565656;
    border-top: 1px solid transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  & .search-result {
    width: 99%;
    cursor: pointer;

    &:focus {
      border: 1px solid transparent;
      background-color: rgba(205, 205, 255, 1);
    }
  }

  & .listing-result-text {
    max-width: 40ch;
    font-size: 85%;
    letter-spacing: -1px;
  }

  & .listing-result-text-match {
    font-size: 1.1em;
  }
`
