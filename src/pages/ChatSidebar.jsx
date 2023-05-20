import React from 'react';

export default function ChatSidebar({ members }) {
  return (
    <div className="chat-sidebar">
      <div className="member-count"> Members ({members.length}) </div>

      <ul className="members">
        {members.map((member) => (
          <li key={member.email}>
            <img
              src={member.avatarUrl}
              className="avatar"
            />
            <span className="name"> {member.name} </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
