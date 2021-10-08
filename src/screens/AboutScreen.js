import React from "react";
import { useSelector } from "react-redux";

const AboutScreen = () => {
  const message = useSelector((state) => state.message);
  return (
    <>
      <h2> AboutScreen </h2>
      <p> {message} </p>
    </>
  );
};

export default AboutScreen;
