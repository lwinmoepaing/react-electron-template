import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
// Screens
import HomeScreen from "./screens/HomeScreen";

// Default Electron (preload.js)
// You Can use electron.notification.onNotiClicked
const ScreenTwo = () => (
  <div>
    Screen 2 <Link to="/">Home Page 1</Link>
  </div>
);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/home" component={ScreenTwo} />
      </Switch>
    </Router>
  );
}
