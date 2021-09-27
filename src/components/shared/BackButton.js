import React from "react";
import { useHistory } from "react-router";

const BackButton = ({ sm }) => {
  const history = useHistory();

  return (
    <button
      onClick={() => history.goBack()}
      className={"btn btn-primary " + (sm ? "btn-sm" : "")}
    >
      Back
    </button>
  );
};

export default BackButton;
