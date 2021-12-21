import styled from "styled-components";
import { unravel } from "../../styled/anim.style";

export const ReqContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: ${props => props.displayed ? "block" : "none"};
  animation: ${unravel} 1s;
`

export const Req = styled.p`
  font-size: 90%;
  padding: 5px 0;
  color: ${props => props.passed ? "green" : "#474747"};

  & > .mark {
    padding: 0 5px;
  }

  & > .pass {
    color: green;
  }

  & > .miss {
    color: #474747;
  }
`