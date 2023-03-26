import React from 'react';

// https://xsgames.co/randomusers/avatar.php?g=male
// https://xsgames.co/randomusers/avatar.php?g=female

export default function ChatSidebar({ members }) {
  return (
    <div className="chat-sidebar">
      <div className="member-count"> Members ({members.length}) </div>

      <ul className="members">
        {members.map((member) => (
          <li key={member.email}>
            <img
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              className="avatar"
            />
            <span className="name"> {member.name} </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
