import React from "react";

import AvailableChats from "../components/AvailableChats";
import JoinedChats from "../components/JoinedChats";
import Navbar from "../components/Navbar";
import ViewTitle from "../components/shared/ViewTitle";

const HomeScreen = ({ title = "" }) => {
  return (
    <div className="content-wrapper">
      <Navbar />
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChats />
        </div>
        <div className="col-9 fh">
          <div className="container-fluid">
            <ViewTitle />
            <AvailableChats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
