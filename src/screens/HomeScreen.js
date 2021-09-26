import React from "react";

import AvailableChats from "../components/AvailableChats";
import JoinedChats from "../components/JoinedChats";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
  return (
    <div className="content-wrapper">
      <Navbar />
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          {/* ########## CHAT LIST START ############ */}
          <JoinedChats />
          {/* ########## CHAT LIST END ############ */}
        </div>
        <div className="col-9 fh">
          {/* ########## CHAT NAME CONTAINER START ############ */}

          {/* ########## CHAT NAME CONTAINER END ############ */}
          <div className="container-fluid">
            {/* ########## CHAT LIST START ############ */}
            <AvailableChats />
            {/* ########## CHAT LIST END ############ */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
