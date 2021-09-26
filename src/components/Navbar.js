import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <>
    {/* ########## NAVBAR START ############ */}
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <Link to="/home" className="btn btn-outline-success ml-2">
            Settings
          </Link>
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>
          <button
            onClick={() => {}}
            className="btn btn-sm btn-outline-danger ml-2"
          >
            Logout
          </button>
          <button
            onClick={() => {}}
            className="btn btn-sm btn-outline-success ml-2"
          >
            Login
          </button>
        </div>
      </nav>
    </div>
    {/* ########## NAVBAR END ############ */}
  </>
);

export default Navbar;
