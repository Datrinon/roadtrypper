// react-router-dom
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

// auth data
import { userInfo } from '../database/auth';

// components
import Studio from "./studio/Studio"
import Login from './auth/login';


function Router({ userInfo }) {
  console.log(userInfo);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          {userInfo ? <Studio /> : <Redirect to="/signup/login"/>} />
        </Route>
        <Route exact path="/signup/login" component={Login}/>
      </Switch>
    </HashRouter>
  );
}

export default Router;
