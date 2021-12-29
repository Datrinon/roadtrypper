import styled from "styled-components";
import { TripTitle } from "../../overview/styled/TripCard.style";
import { appear } from "../../styled/anim.style";
import { UntitledDay } from "./DayCard.style";
import { BaseButton } from "./StudioButtons.style";

/**
 * For elements of which DayDetails and POIDetails share.
 */

export const Heading = styled.h1`
  margin: 25px 5px;
  font-size: 125%;
  text-align: center;
  font-variant: all-small-caps;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 5px;
  text-shadow: 1px 1px 11px #cfcfcf;
  letter-spacing: 1px;
`

export const DeleteItemButton = styled.button`
  all: unset;
  position: absolute;
  top: -5px;
  left: 0px;
  color: maroon;
  font-size: 90%;
  padding: 8px 4px;
  border-radius: 50%;
  transition: background-color 300ms;
  cursor: pointer;

  &:hover {
    background-color: #ff9a9a;
  }

  &:hover::after {
    position: absolute;
    content: attr(data-tip);
    font-variant-caps: all-small-caps;
    border-radius: 5px;
    background-color: rgb(45 45 45 / 90%);
    padding: 3px;
    color: beige;
    /* bottom: 15px; */
    top: calc(80% + 5px);
    left: calc(50% + 5px);
    /* width: 100%; */
    -webkit-animation: dMBcsj 300ms;
    animation: dMBcsj 300ms;
  }
`

export const DayOrder = styled.h1`
      /* font-variant-caps: all-small-caps; */
  font-size: 200%;
  font-weight: 300;
  margin: 15px 5px 0 5px;
`

export const DayOrderNum = styled.span`
  font-weight: 500;
`

export const EditHeading = styled.p`
  font-variant-caps: all-petite-caps;
`

export const DayOrderEdit = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  padding: 0 5px;
`

export const OrderSelect = styled.select`
  padding: 6px;
  font-family: inherit;
  font-weight: 700;
`

export const DayTitle = styled.h2`
  font-size: 150%;
  margin: 5px 0 15px 5px;
  font-weight: 300;
`

export const UntitledDayDisp = styled(UntitledDay)`

    /* margin: 0 0 15px 5px; */
`

export const DayTitleEdit = styled.input`
  all: unset;
  padding: 2px 0;
  border: 2px solid transparent;
  border-bottom: 1px solid #dedede;
  margin: 8px 3px;

  &:focus {
    border: 2px solid #54B4D3;
    border-radius: 4px;
  }
`

export const HeadingLv2 = styled.h2`
  font-size: 150%;
  margin: 30px 0 10px 0;
  text-align: center;
  font-variant: all-small-caps;
  margin: 18px auto;
  font-size: 125%;
  text-align: center;
  font-variant: all-small-caps;
  padding-bottom: 5px;
  text-shadow: 1px 1px 11px #cfcfcf;
  letter-spacing: 1px;
`