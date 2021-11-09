import React from "react";
import { useSelector } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import LoginScreen from "../components/../screens/LoginScreen";
import OnlineStatusHook from "../hooks/common/OnlineStatusHook";
import IsAuthMiddleware from "../hooks/middleware/IsAuthMiddleware";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";

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
          <Redirect to={"/"} />
        )
      }
    />
  );
};

const Routes = () => {
  const { isCheckingUser } = IsAuthMiddleware();
  const { isOnline } = OnlineStatusHook({ showNoti: true });

  return (
    <HashRouter>
      <Switch>
        <Route exact path={"/"}>
          <LoginScreen />
        </Route>
        <AuthRoute exact path={"/home"}>
          <HomeScreen />
        </AuthRoute>
        <AuthRoute exact path={"/about"}>
          <AboutScreen />
        </AuthRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
