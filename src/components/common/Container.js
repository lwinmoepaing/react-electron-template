import React from "react";
import NavBar from "./NavBar";
export default function Container(props) {
  const { withNavbar, children } = props;

  return (
    <div>
      {withNavbar && <NavBar />}
      {children}
    </div>
  );
}
