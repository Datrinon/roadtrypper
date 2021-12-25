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
