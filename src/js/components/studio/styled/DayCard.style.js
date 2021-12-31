import styled from 'styled-components'

export const Card = styled.div`
  border: 2px solid #cccccc;
  width: 90%;
  border-radius: 3px;
  padding: 5px;
  /* max-width: 240px; */
  margin: 15px auto;
  min-height: 128px;
  box-shadow: 0px 2px 3px 0px #d7d7d7;
  transition: border 300ms;

  &:hover {
    border: 2px solid #a3bcff;
  }

  position: relative;
  cursor: pointer;

  &.active-card {
    border-color: #658dff;
  }
`

export const DayNumLabel = styled.h2`
  font-variant: all-petite-caps;
  font-weight: 400;
  font-size: 90%;
  margin-left: 10px;

  & span {
    font-weight: 600;
    font-size: 125%;
  }
`

export const dayTitle = styled.p`
  text-align: center;
`

export const titledDay = styled.span`
  font-weight: 600;
`

export const UntitledDay = styled.span`
  font-style: italic;
  color: #bcbcbc;
`

export const DayColor = styled.div`
  background-color: ${props => `#${props.color}`};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  bottom: 5px;
  right: 5px;
`

export const DayColorLine = styled.div`
  background-color: ${props => `#${props.color}`};
  width: 10px;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 2px;
  border-left: 1px dotted #8a8a8ae6;
  border-right: 1px dotted #8a8a8ae6;
  z-index: -1;
`

export const DayPOIList = styled.ol`
  list-style: decimal;
  width: 80%;
  margin: 4px auto;
  margin-top: 10px;
`

export const DayPOIBullet = styled.li`
  font-size: 80%;
`

export const DayPOIBulletText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 110%;
  padding-bottom: 2px;
`