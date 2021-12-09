// react-router-dom
import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

// components
import Studio from "./studio/Studio";
import Overview from "./overview/Overview";
import Login from './auth/login';
import SignUp from './auth/signup';
import NotFound from './shared/NotFound';

// db
import { authStateObserver } from '../database/auth';



export const UserContext = React.createContext(null);


function Router() {
  const [userInfo, setUserInfo] = useState(undefined);

  // need this duplicate here so ourlogin doesnt clean up the observer.
  // TODO move the callback to login, send the unsubscribe here.
  // It's causing the problem with the redirects...
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

  if (userInfo === undefined) {
    // TODO
    // Remove this.
    return <div>TEST! PLEASE REMOVE LATER.</div>
  }

  return (
    <HashRouter>
      <UserContext.Provider value={userInfo}>
        <Switch>
          {/* Home page redirects to the studio. */}
          <Route exact path="/">
            {userInfo ? <Redirect to="/trips/" /> : <Redirect to="/signup/login" />}
          </Route>
          {/* Protected Content */}
          <Route path="/trips/:tripId">
            {userInfo ? <Studio /> : <Redirect to="/signup/login" />}
          </Route>
          <Route exact path="/trips">
            {userInfo ? <Overview /> : <Redirect to="/signup/login" />}
          </Route>
          {/* Auth pages; redirect if the user is already signed in. */}
          <Route exact path="/signup/login">
            {userInfo ? <Redirect to="/trips/" /> : <Login/>}
          </Route>
          <Route exact path="/signup/" component={SignUp}>
            {userInfo ? <Redirect to="/trips/" /> : <SignUp />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default Router;
