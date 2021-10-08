import React, { useEffect, useState } from "react";

// Predefined Preload.js
const { electron } = window;

const TitleHook = (
  initialTitle = process.env.APP_NAME || "Default Screen Title"
) => {
  const [title, setTitle] = useState("");

  const changeTitle = (titleText) => {
    if (titleText === title) return;
    setTitle(titleText);
    document.getElementById("title").innerHTML = titleText;
  };

  useEffect(() => {
    changeTitle(initialTitle);
    return () => {};
  }, [title]);

  return {
    title,
    changeTitle,
  };
};

export default TitleHook;
