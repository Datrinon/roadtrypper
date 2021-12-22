import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { issuePwReset } from '../../database/auth';

import * as authStyle from "./styled/auth.style";

const ResultMessage = styled(authStyle.FormText)`
  display: ${props => props.visible ? "initial" : "none"};
  color: #188618;
`

const successMessageBody = `Success! If the email you entered is found on our record,
you should see an email from us shortly.`


function ForgotPW() {

  const submitButton = useRef(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  
  function submitEmailRequest(e) {
    e.preventDefault();

    submitButton.current.disabled = true;

    submitButton.current.textContent = "Sending...";


    issuePwReset(email)
    .then(() => {
      // don't do anything with the success.
    })
    .catch((error) => {
      // don't do anything with the error.
    })
    .finally(() => {
      submitButton.current.textContent = "Sent!";
      setEmailSent(true);
    })
  }


  return (
    <authStyle.AuthFormContainer>
      <authStyle.Heading>
        Forgot Password?
      </authStyle.Heading>
      <authStyle.FormText>Not a problem. Simply enter your email here to get a link to 
        reset your password.
      </authStyle.FormText>
      <authStyle.Form onSubmit={submitEmailRequest}>
        <authStyle.Label htmlFor="email">
          Email
        </authStyle.Label>
        <authStyle.Input
          id={"email"}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email Address"
          value={email}
          required/>
        <authStyle.FormSubmitButton ref={submitButton}>Reset Password</authStyle.FormSubmitButton>
      </authStyle.Form>
      <ResultMessage visible={emailSent}>
        {successMessageBody}
      </ResultMessage>
      <authStyle.FormLink>
        <Link to={"/login"}>Return to Login</Link>
      </authStyle.FormLink>
    </authStyle.AuthFormContainer>
  )
}

export default ForgotPW
