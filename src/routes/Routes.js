import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ABOUT_SCREEN, HOME_SCREEN, LOGIN_SCREEN } from "./constants";

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          initialRoute
          path={LOGIN_SCREEN.path}
          component={LOGIN_SCREEN.component}
        />
        <Route
          exact
          path={ABOUT_SCREEN.path}
          component={ABOUT_SCREEN.component}
        />
        <Route
          exact
          path={HOME_SCREEN.path}
          component={HOME_SCREEN.component}
        />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
