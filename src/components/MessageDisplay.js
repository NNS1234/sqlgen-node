import React from "react";

export default function MessageDisplay({ text }) {
  return (
    <div className="message-display">
      <p className="message-text">{text}</p>
    </div>
  );
}
