// react-router-dom
import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";



// components
import Studio from "./studio/Studio"
import Login from './auth/login';
import SignUp from './auth/signup';

export const UserContext = React.createContext(null);

function Router() {
  const [userInfo, setUserInfo] = useState(null);


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
            {userInfo ? <Redirect to="/studio/" /> : <Login setUserInfo={setUserInfo}/>}
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
