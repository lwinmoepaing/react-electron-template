import React, { useEffect, useState } from "react";

// Predefined Preload.js
const { electron } = window;

const PaymentHook = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    return () => {};
  }, [title]);

  return {
    title,
  };
};

export default PaymentHook;
