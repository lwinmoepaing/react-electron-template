import React from "react";
import { useParams } from "react-router";
import ChatMessageList from "../components/ChatMessageList";
import ChatUserList from "../components/ChatUserList";
import ViewTitle from "../components/shared/ViewTitle";

const ChatScreen = ({ title = "" }) => {
  const { id } = useParams();

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle title={`Joined Channel: ${id}`} />
        <ChatMessageList />
      </div>
    </div>
  );
};

export default ChatScreen;
