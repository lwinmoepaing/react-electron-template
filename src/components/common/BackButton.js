import React, { useEffect } from "react";
import { useHistory } from "react-router";

const BackButton = () => {
  const history = useHistory();

  useEffect(() => {
    console.log("history", history);

    history.listen(console.log);
  }, []);

  return (
    history.length > 1 && (
      <button onClick={() => history.goBack()}> Back </button>
    )
  );
};

export default BackButton;
