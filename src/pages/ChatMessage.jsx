import React from 'react';

export default function ChatMessage({ title, description }) {
  return (
    <div className="chat-message">
      <div className="message">
        <h3> {title} </h3>

        <p> {description} </p>
      </div>
      <button className="btn btn-warning"> Add </button>
    </div>
  );
}
