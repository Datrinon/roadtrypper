// react-router-dom
import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

// auth data
import { auth } from '../database/auth';
import { onAuthStateChanged } from '@firebase/auth';
import { userInfo } from '../database/auth';

// components
import Studio from "./studio/Studio"
import Login from './auth/login';
import SignUp from './auth/signup';


function Router() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        // signed out, 
        // do not allow access to app
        setUserInfo(null);
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);


  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          {userInfo ? <Redirect to="/studio/" /> : <Redirect to="/signup/login" />}
        </Route>
        <Route exact path="/studio">
          {userInfo ? <Studio /> : <Redirect to="/signup/login" />}
        </Route>
        <Route exact path="/signup/login">
          {userInfo ? <Redirect to="/studio/" /> : <Login />}
        </Route>
        <Route exact path="/signup/" component={SignUp}>
          {userInfo ? <Redirect to="/studio/" /> : <SignUp />}
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
