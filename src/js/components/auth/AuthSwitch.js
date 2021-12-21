import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import ForgotPW from './ForgotPW';
import Login from './login';
import SignUp from './signup';

import * as authStyle from "./styled/auth.style";
import * as genStyle from "../../components/styled/template.style";
import Road from "../../../data/road.jpg";
import HomeLogo from '../shared/HomeLogo';
import Footer from '../shared/Footer';


/**
 * The Auth Switch decides which of the auth pages to load.
 */
function AuthSwitch() {
  let match = useRouteMatch();

  console.log(match);

  return (
    <>
      <genStyle.Header>
        <HomeLogo/>
      </genStyle.Header>
      <authStyle.Background bg={Road}>
      </authStyle.Background>
      <section className="content">
        <Switch>
          <Route exact path={`${match.path}/signup`}>
            <SignUp />
          </Route>
          <Route exact path={`${match.path}/forgot_password`}>
            {/* Forgot PW here. */}
            <ForgotPW />
          </Route>
          <Route path={match.path}>
            <Login />
            {/* Login Component Here */}
          </Route>
        </Switch>
      </section>
      <Footer/>
    </>
  )
}

export default AuthSwitch
