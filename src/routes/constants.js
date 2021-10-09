import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import LoginScreen from "../screens/LoginScreen";

// All Routes Constant Defined Here
// Forget All About Routers in Browser View
// Coz of we create Desktop App
export const LOGIN_SCREEN = {
  name: "LOGIN_SCREEN",
  path: "/",
  component: LoginScreen,
};

export const HOME_SCREEN = {
  name: "HOME_SCREEN",
  path: "/home",
  component: HomeScreen,
};

export const ABOUT_SCREEN = {
  name: "ABOUT_SCREEN",
  path: "/about",
  component: AboutScreen,
};
