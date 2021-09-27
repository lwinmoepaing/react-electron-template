import React from "react";
import { Link } from "react-router-dom";
import BackButton from "./shared/BackButton";

const Navbar = () => (
  <>
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <BackButton />
          <Link to="/settings" className="btn btn-outline-success ml-2">
            Settings
          </Link>
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>
          <Link to="/register" className="btn btn-outline-danger ml-2">
            Logout
          </Link>
          <Link to="login" className="btn btn-outline-success ml-2">
            Login
          </Link>
        </div>
      </nav>
    </div>
  </>
);

export default Navbar;
