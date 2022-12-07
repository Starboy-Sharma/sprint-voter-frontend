import React from 'react';

export default function ChatSidebar() {
  return (
    <div className="chat-sidebar">
      <div className="member-count"> Members (5) </div>

      <ul className="members">
        <li>
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            className="avatar"
          />
          <span className="name"> Pankaj </span>
        </li>

        <li>
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=male"
            className="avatar"
          />
          <span className="name"> Deepanshu </span>
        </li>

        <li>
          <img
            src="https://xsgames.co/randomusers/avatar.php?g=female"
            className="avatar"
          />
          <span className="name"> Pihu </span>
        </li>
      </ul>
    </div>
  );
}
