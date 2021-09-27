import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SettingScreen from "./screens/SettingScreen";
import ChatScreen from "./screens/ChatScreen";

// Default Electron (preload.js)
// You Can use electron.notification.onNotiClicked

export default function App() {
  return (
    <Router>
      <div className="content-wrapper">
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeScreen} exact />
          <Route path="/chat/:id" exact component={ChatScreen} />
          <Route path="/settings" exact component={SettingScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
        </Switch>
      </div>
    </Router>
  );
}
