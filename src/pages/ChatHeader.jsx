import React from 'react';

export default function ChatHeader({ teamName, companyName, manager }) {
  return (
    <header className="chat-header">
      <h1> {teamName} </h1>
      <h1>
        {' '}
        🎯SPRINT 101 |<p className="text-md"> By- {manager?.name} </p>
      </h1>
      <p> 🏢{companyName} </p>
    </header>
  );
}
