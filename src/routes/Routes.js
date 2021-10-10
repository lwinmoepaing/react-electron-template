import React from "react";
import { useSelector } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import { ABOUT_SCREEN, HOME_SCREEN, LOGIN_SCREEN } from "./constants";

const Routes = () => {
  const profile = useSelector((store) => store.profile);

  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path={LOGIN_SCREEN.path}
          component={LOGIN_SCREEN.component}
        />
        <Route
          exact
          path={HOME_SCREEN.path}
          component={HOME_SCREEN.component}
        />
        <Route
          exact
          path={ABOUT_SCREEN.path}
          component={ABOUT_SCREEN.component}
        />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
