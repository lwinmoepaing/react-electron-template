import React from "react";
import BackButton from "./BackButton";

const ViewTitle = ({ title }) => (
  <div className="chat-name-container">
    <span className="name">{title ? title : "Choose your channel"}</span>
    <BackButton sm />
  </div>
);

export default ViewTitle;
