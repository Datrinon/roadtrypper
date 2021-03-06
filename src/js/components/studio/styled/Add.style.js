import styled from "styled-components";
import { appear } from "../../styled/anim.style";
import { device } from "../../styled/breakpoints.style";
import * as d from "./Details.style";
import { DivWithCustomScroll } from "./Studio.styled";
import { BaseButton } from "./StudioButtons.style";

export const AddPOIForm = styled.div`
  display: grid;
  grid-template-rows: 5% auto 40px;
  height: 100%;
`

export const AddPOIFormHeading = styled(d.Heading)`
  margin: 0 auto;
  width: 80%;
  align-self: center;
`

export const FormContainer = styled(DivWithCustomScroll)`
  overflow-y: auto;
`

export const Label = styled.label`
  display: block;
  position: relative;
  margin: 12px 12px 4px 12px;
  font-weight: 600;

  & > * {
    display: block;
  }
`

export const HeadingLv2 = styled(d.HeadingLv2)`
  font-size: 115%;
`


export const DaySelect = styled(d.OrderSelect)`
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

export const FormSectionMid = styled(FormSection)`
  border-top-width: 1px;
  border-bottom-width: 1px;
  margin-top: 0px;
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

  & .srch-container {
    visibility: initial;

    @media ${device.tablet} {
      visibility: initial;
    }
  }

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
    font-size: 0.85rem;
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
    top: 98%;
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

export const PoiTitleArr = styled.div`
  display: grid;
  grid-template-areas: 
  "label checkbox"
  "input input";
  grid-template-columns: 20% 80%;
  grid-template-rows: 60% auto;
  align-items: center;

  & .poi-title-label {
    grid-area: label;
    margin: 0;
    margin-left: 12px;
  }

  & .poi-title-input {
    grid-area: input;
  }

  & .poi-title-checkbox {
    grid-area: checkbox;
    font-size: 80%;
    margin: 0;
    font-weight: 400;
    user-select: none;


    & input {
      transform: scale(1.1);
    }
  }

  & #poi-same-title-as-loc {
    display: inline;
  }
`;

export const PoiTitleInput = styled.input`
  width: 88%;
  margin: 0 auto;
  display: block;
  padding: 6px 5px;
  font-family: inherit;
  border-radius: 4px;
  border: 1px solid #565656;
`

export const DescArr = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`

export const DescTextArea = styled.textarea`
  width: 97%;
  resize: none;
  font-family: inherit;
  padding: 2px 3px;
`

export const AddPOIButton = styled.button`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  position: relative;

  &:hover[disabled]::after {
    position: absolute;
    content: "Add and confirm a location first.";
    font-variant-caps: all-small-caps;
    font-weight: 400;
    border-radius: 5px;
    background-color: rgb(45 45 45 / 68%);
    padding: 3px;
    color: beige;
    bottom: 100%;
    left: 5px;
    width: 90%;
    animation: ${appear} 300ms;
  }
`

export const AddPhotoButton = styled(BaseButton)`
    padding: 3px;
    width: 95%;
    margin: 0 auto;
    margin-top: 15px;
    display: block;
`

export const PhotoPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 5px;
`


export const ImgPreview = styled.img`
  display: block;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  object-fit: contain;
`

export const PhotoHeading = styled.h3`
  font-size: 115%;
  margin: 0;
  font-weight: 400;
  font-variant-caps: all-petite-caps;
  height: fit-content;
  text-align: center;
`

export const ImgPreviewContainer = styled.div`
  width: 240px;
  height: 128px;
`

export const PhotoDescContainer = styled.div`
  & .add-photo-description {
    display: flex;
    flex-direction: column;
    margin: 3px 12px;
  }

  & .label {
    font-weight: 600;
    font-size: 80%;
  }

  & .text-area {
    font-family: inherit;
    resize: vertical;
    min-height: 32px;
    height: 60px;
    max-height: 128px;
  }

  & .char-rem {
    font-weight: 600;
    font-size: 80%;
    text-align: end;
  }
`

export const RemovePhotoButton = styled(d.DeleteItemButton)`
  position: absolute;
  top: 1.25rem;
  left: -0.5rem;

  &:hover {
    background-color: rgb(255, 0, 0, 0.3)
  }

  &:hover::after {
    all: unset;
  }
`

export const UsageTip = styled.span`
    display: ${props => props.display ? "block" : "none"};
    position: absolute;
    top: -50%;
    background-color: #1333a7;
    font-size: 80%;
    color: white;
    /* border: 1px solid black; */
    box-shadow: 0 0 6px 1px #00000069;
    border-radius: 1em;
    padding: 5px;
    transform: translateY(-25%);
    font-weight: initial;
    animation: ${appear} 300ms;
    animation-iteration-count: 1;

  &::before {
    content: "Tip";
    display: block;
    text-align: center;
    font-weight: bold;
  }

  /* Triangle */
  &::after {
    position: absolute;
    content: "";
    /* background-color: black; */
    /* width: 1em; */
    /* height: 1em; */
    border-top: 10px solid #1333a7;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    top: 100%;
    left: 10%;
    transform: translateX(-50%);
  }
`

// Checkbox
export const Checkbox = styled.input`
  
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }

  &:hover:disabled::after {
    content: attr(data-tip);
    position: absolute;
    bottom: 100%;
    width: max-content;
    padding: 3px;
    border-radius: 3px;
    /* border: 1px solid black; */
    font-size: 80%;
    background-color: #8a8a8a;
    color: white;
    font-family: inherit;
  }
`