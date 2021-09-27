import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ABOUT_SCREEN, HOME_SCREEN } from "./constants";

import Navbar from "../components/common/NavBar";

const Routes = () => {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path={ABOUT_SCREEN.path} component={ABOUT_SCREEN.component} />
          <Route path={HOME_SCREEN.path} component={HOME_SCREEN.component} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Routes;
