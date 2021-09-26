import React from "react";
import { Link } from "react-router-dom";

// All Routes
import { HOME_SCREEN, ABOUT_SCREEN } from "../../routes/constants";

const Navbar = () => {
  return (
    <div>
      <Link to={HOME_SCREEN.path}> Dashboard - ({HOME_SCREEN.path})</Link>
      <Link to={ABOUT_SCREEN.path}> About ({ABOUT_SCREEN.path}) </Link>
    </div>
  );
};

export default Navbar;
