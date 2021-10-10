import React from "react";
import IsAuthMiddleware from "../../hooks/middleware/IsAuthMiddleware";
import NavBar from "../common/NavBar";
export default function Container(props) {
  IsAuthMiddleware();

  const { withNavbar, children } = props;

  return (
    <div>
      {withNavbar && <NavBar />}
      {children}
    </div>
  );
}
