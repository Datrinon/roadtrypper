// react-router-dom
import React, { useReducer } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import Studio from "./studio/Studio"

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Studio} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
