import React, { useEffect, useState, useReducer } from 'react';
import ChatHeader from './ChatHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, SOCKET_URL } from '../config.js';
import axios from 'axios';
import ChatSidebar from './ChatSidebar';
import io from 'socket.io-client';

function getUserTeam(location, navigate) {
  const teamData = location.state?.team;
  if (!teamData || Object.keys(teamData).length == 0) {
    console.log('Redirecting to... teams page');
    navigate('/teams');
  }

  return teamData;
}

export function Chats() {
  const location = useLocation();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);

  const team = getUserTeam(location, navigate);

  const connect = () => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('You are connected... 🧑‍🚀');
    });

    socket.emit('joinRoom', {
      room: team['teamName'],
      username: 'Pankaj',
      userId: team['userId'],
    });

    socket.on('userStatus', function (user) {
      console.log('User status received: 🧑‍🚀');
      console.table(user);
    });
  };

  useEffect(() => {
    const URL = `${BASE_URL}/user/team-manager/${team['_id']}`;

    axios
      .get(URL, {
        headers: {
          ['access.token']: JSON.parse(localStorage.getItem('user'))
            .accessToken,
        },
      })
      .then((res) => {
        setManager(res.data.result);
      })
      .catch((err) => console.error(err));

    // @subscribe socket connection and events
    connect();
  }, []);

  return (
    <>
      <ChatHeader
        teamName={team.teamName}
        companyName={team.companyName}
        manager={manager}
      ></ChatHeader>

      <div className="chat-container">
        <ChatSidebar></ChatSidebar>
      </div>
    </>
  );
}
