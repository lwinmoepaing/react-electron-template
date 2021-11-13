import React from "react";

export default function FormErrorMessage(value) {
  return (
    <div style={{ color: "#fb7c7c", fontFamily: "Roboto", fontSize: 12 }}>
      {value}
    </div>
  );
}
