import React, { useEffect, useState, useReducer } from 'react';
import ChatHeader from './ChatHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, SOCKET_URL } from '../config.js';
import axios from 'axios';
import ChatSidebar from './ChatSidebar';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import VoteCard from './VoteCard';

function getUserData(location, navigate) {
  console.log(location.state);

  const teamData = location.state?.team;
  if (!teamData || Object.keys(teamData).length == 0) {
    console.log('Redirecting to... teams page');
    navigate('/teams');
  }

  const userData = location.state?.user;
  if (!teamData || Object.keys(teamData).length == 0) {
    console.log('Redirecting to... teams page');
    navigate('/teams');
  }

  const sprintData = location.state?.sprintData;
  if (!sprintData || Object.keys(sprintData).length == 0) {
    console.log('Redirecting to... teams page');
    navigate('/teams');
  }

  return { team: teamData, user: userData, sprintData: sprintData };
}

export function Chats() {
  const location = useLocation();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);

  const { team, user, sprintData } = getUserData(location, navigate);

  const connect = function () {
    window.socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('You are connected... 🧑‍🚀');
    });

    socket.emit('joinRoom', {
      room: team['teamName'],
      username: user.username,
      name: user.name,
      role: user.role,
      userId: user.userId,
    });

    socket.on('userStatus', function (data) {
      console.log(typeof data);
      if (user.userId == data.userId) {
        console.warn(
          'You have logged in from a different instance.... Please logout now.'
        );
        return false;
      }

      console.log('User status received: 🧑‍🚀');
      console.table(data);
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

  const handleVote = function (vote) {
    console.log('Vote received', vote, user);

    const voteData = {
      room: team['teamName'],
      username: user.username,
      name: user.name,
      role: user.role,
      userId: user.userId,
      vote: vote,
    };

    socket.emit('addVote', voteData);
  };

  return (
    <>
      <ChatHeader
        teamName={team.teamName}
        companyName={team.companyName}
        manager={manager}
        sprintData={sprintData}
      ></ChatHeader>

      <div className="chat-container">
        <ChatSidebar members={team.members}></ChatSidebar>

        <main>
          <ChatMessage
            title="#3657: Support files in pulse"
            description="Implement support files in VFX/DI Pulls pages"
          ></ChatMessage>

          <div className="vote-cards">
            <VoteCard value={1} handleVote={handleVote} />
            <VoteCard value={2} handleVote={handleVote} />
            <VoteCard value={3} handleVote={handleVote} />
            <VoteCard value={5} handleVote={handleVote} />
            <VoteCard value={8} handleVote={handleVote} />
            <VoteCard value="No Idea" handleVote={handleVote} />
          </div>
        </main>
      </div>
    </>
  );
}
