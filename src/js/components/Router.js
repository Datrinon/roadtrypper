// react-router-dom
import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

// auth data
import { auth } from '../database/auth';
import { onAuthStateChanged } from '@firebase/auth';
import { authStateObserver } from '../database/auth';

// components
import Studio from "./studio/Studio"
import Login from './auth/login';
import SignUp from './auth/signup';

export const UserContext = React.createContext(null);

function Router() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {

    // this is our callback to execute when authentication state changes.
    const manageUserState = (user) => {
      if (user) {
        console.log(user);
        setUserInfo(user);
      } else {
        // signed out, 
        // do not allow access to app
        setUserInfo(null);
      }
    };

    // this method watches the authentication state of the application.
    // it returns a cleanup function, so, we invoke that in 
    // the return of this hook.
    const unsubscribe = authStateObserver(manageUserState);

    return () => {
      unsubscribe();
    }
  }, []);


  return (
    <HashRouter>
      <UserContext.Provider value={userInfo}>
        <Switch>
          {/* Home page redirects to the studio. */}
          <Route exact path="/">
            {userInfo ? <Redirect to="/studio/" /> : <Redirect to="/signup/login" />}
          </Route>
          {/* Protected Content */}
          <Route exact path="/studio">
            {userInfo ? <Studio /> : <Redirect to="/signup/login" />}
          </Route>
          {/* Auth pages; redirect if the user is already signed in. */}
          <Route exact path="/signup/login">
            {userInfo ? <Redirect to="/studio/" /> : <Login />}
          </Route>
          <Route exact path="/signup/" component={SignUp}>
            {userInfo ? <Redirect to="/studio/" /> : <SignUp />}
          </Route>
        </Switch>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default Router;
