import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types';

import * as PWReqs from "./styled/PWReqs.style";

/**
 * Template for creating password requirements.
 */
class PasswordRequirement {
  constructor(description, test) {
    this.description = description;
    this.test = test;
  }
}

const PASSWORD_TESTS = [
  new PasswordRequirement(
    "Longer than 8 characters",
    (password) => password.length >= 8
  ),
  new PasswordRequirement(
    "Contains a digit",
    (password) => password.match(/[0-9]/) !== null
  ),
  new PasswordRequirement(
    "Contains an uppercase character",
    (password) => password.match(/[A-Z]/) !== null
  ),
  new PasswordRequirement(
    "Contains a lowercase character",
    (password) => password.match(/[a-z]/) !== null
  ),
  new PasswordRequirement(
    "Contains a special character",
    (password) => password.match(/\W/) !== null
  )
]



function PWRequirements({ password, setReqsMet }) {

  function mapReq(req, index) {
    let passed = req.test(password);

    return (
      <div key={index}>
        <PWReqs.Req passed={passed}>
          {passed 
            ? <span className={"mark pass"}>✔</span>
            : <span className={"mark miss"}>○</span>
          }
          {req.description}
        </PWReqs.Req>
      </div>
    )
  }

  useEffect(() => {
    let testsPassed = true;

    PASSWORD_TESTS.forEach(req => {
      if (!req.test(password)) {
        testsPassed = false;
      }
    })

    setReqsMet(testsPassed);
  });

  return (
    <PWReqs.ReqContainer className="pw-requirements">
      {
        PASSWORD_TESTS.map(mapReq)
      }
    </PWReqs.ReqContainer>
  )
}

/**
 * Component renders and runs tests
 * Fails and sets failed to true
 * 1st UE fails to be met, fails.
 * 2nd UE runs and sets to false, which triggers rerender
 * requirements are set to true and the component runs tests again
 * infinite loop!!
 */

PWRequirements.defaultProps = {
  password: ""
}

PWRequirements.propTypes = {
  password: PropTypes.string
}

export default PWRequirements