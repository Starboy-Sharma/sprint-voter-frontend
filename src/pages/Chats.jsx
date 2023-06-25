import React, { useEffect, useState, useReducer } from 'react';
import ChatHeader from './ChatHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, SOCKET_URL, TEAM_MANAGER, TEAM_MEMBER } from '../config.js';
import axios from 'axios';
import ChatSidebar from './ChatSidebar';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage';
import VoteCard from './VoteCard';

const initVoteCard = {
  1: { count: 0, isVoteApproved: false },
  2: { count: 0, isVoteApproved: false },
  3: { count: 0, isVoteApproved: false },
  5: { count: 0, isVoteApproved: false },
  8: { count: 0, isVoteApproved: false },
  'No Idea': { count: 0, isVoteApproved: false },
};

function getUserData(location, navigate) {
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
  if (
    !sprintData ||
    (Object.keys(sprintData).length == 0 && userData.role === 'team-manager')
  ) {
    console.log('Redirecting to... teams page');
    navigate('/teams');
  }

  return { team: teamData, user: userData, sprintData: sprintData };
}

function reducer(state, action) {
  switch (action.type) {
    case 'inc_vote':
      return {
        ...state,
        [action.key]: {
          count: state[action.key].count + 1,
          isVoteApproved: false,
        },
      };

    case 'reset_vote':
      return {
        ...initVoteCard,
      };

    default:
      console.warn('Invalid action');
      break;
  }
}

export function Chats() {
  const location = useLocation();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);
  const [sprintData, setSpriteData] = useState(null);
  const [SOCKET, setSocket] = useState(null);
  const [votes, dispatchVote] = useReducer(reducer, initVoteCard);
  const [disableVote, setDisableVote] = useState(false);

  const { team, user, sprintData: sprint } = getUserData(location, navigate);

  const connect = function () {
    window.socket = io(SOCKET_URL);
    setSocket(socket);

    socket.on('connect', () => {
      console.log('You are connected... 🧑‍🚀');
    });

    socket.emit('joinRoom', {
      room: team['teamName'],
      username: user.username,
      name: user.name,
      role: user.role,
      userId: user.userId,
      sprintData: user.role === 'team-manager' ? sprint : null,
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

    socket.on('getSprintData', function (data) {
      if (user.role === 'team-member') {
        if (!data) {
          console.log('Redirecting to... teams page');
          navigate('/teams');
          return;
        }

        setSpriteData(data);
      }
    });

    socket.on('getVote', (data) => {
      console.log('Vote received', data.username, data.vote);

      dispatchVote({ type: 'inc_vote', key: data.vote });
    });

    socket.on('reset_vote', () => {
      dispatchVote({ type: 'reset_vote' });
      setDisableVote(false);
    });
  };

  useEffect(() => {
    if (user.role === 'team-manager') {
      setSpriteData(sprint);
    }

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
    if (user.role === TEAM_MANAGER) {
      return;
    }

    if (disableVote === true) {
      console.log('Already vote applied');
      return;
    }

    const voteData = {
      room: team['teamName'],
      username: user.username,
      name: user.name,
      role: user.role,
      userId: user.userId,
      vote: vote,
    };

    setDisableVote(true);

    socket.emit('addVote', voteData);
  };

  return (
    <>
      {sprintData && (
        <ChatHeader
          teamName={team.teamName}
          companyName={team.companyName}
          manager={manager}
          sprintData={sprintData}
        ></ChatHeader>
      )}

      <div className="chat-container">
        <ChatSidebar members={team.members}></ChatSidebar>

        <main>
          <ChatMessage room={team.teamName} role={user.role} socket={SOCKET} />

          <div className="vote-cards">
            {Object.keys(votes).map((key) => (
              <VoteCard
                value={key}
                count={votes[key].count}
                isVoteApproved={votes[key].isVoteApproved}
                handleVote={handleVote}
                key={key + Date.now()}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
