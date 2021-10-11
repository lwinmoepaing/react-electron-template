import React from "react";
import { useSelector } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import IsAuthMiddleware from "../hooks/middleware/IsAuthMiddleware";
import { ABOUT_SCREEN, HOME_SCREEN, LOGIN_SCREEN } from "./constants";

const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector(({ profile }) => profile.data);
  const onlyChildren = React.Children.only(children);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(onlyChildren, { ...rest, ...props })
        ) : (
          <Redirect to={LOGIN_SCREEN.path} />
        )
      }
    />
  );
};

const Routes = () => {
  const { isCheckingUser } = IsAuthMiddleware();

  return (
    <HashRouter>
      <Switch>
        <Route exact path={LOGIN_SCREEN.path}>
          <LOGIN_SCREEN.component />
        </Route>
        <AuthRoute exact path={HOME_SCREEN.path}>
          <HOME_SCREEN.component />
        </AuthRoute>
        <AuthRoute exact path={ABOUT_SCREEN.path}>
          <ABOUT_SCREEN.component />
        </AuthRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
