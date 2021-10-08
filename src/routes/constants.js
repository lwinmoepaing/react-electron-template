import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import LoginScreen from "../screens/LoginScreen";

// All Routes Constant Defined Here

export const HOME_SCREEN = {
  name: "HOME_SCREEN",
  path: "/",
  component: HomeScreen,
};

export const ABOUT_SCREEN = {
  name: "ABOUT_SCREEN",
  path: "/about",
  component: AboutScreen,
};

export const LOGIN_SCREEN = {
  name: "LOGIN_SCREEN",
  path: "/login",
  component: LoginScreen,
};
