import React from "react";

import AvailableChatsList from "../components/AvailableChatsList";
import JoinedChatsList from "../components/JoinedChatsList";
import ViewTitle from "../components/shared/ViewTitle";

const HomeScreen = ({ title = "" }) => {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList />
      </div>
      <div className="col-9 fh">
        <div className="container-fluid">
          <ViewTitle />
          <AvailableChatsList />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
