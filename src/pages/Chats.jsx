import React, { useEffect } from 'react';
import { useState } from 'react';
import ChatHeader from './ChatHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import axios from 'axios';

export function Chats() {
  const location = useLocation();
  const navigate = useNavigate();
  const [team, setTeam] = useState({});
  const [manager, setManager] = useState({});

  function getTeamManager(teamId) {
    const URL = `${BASE_URL}/user/team-manager/${teamId}`;

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
  }

  useEffect(() => {
    const teamData = location.state?.team;
    if (!teamData || Object.keys(teamData).length == 0) {
      console.log('Redirecting to... teams page');
      navigate('/teams');
    }
    console.log(teamData);

    setTeam(teamData);
    getTeamManager(teamData['_id']);
  }, []);

  return (
    <ChatHeader
      teamName={team.teamName}
      companyName={team.companyName}
      manager={manager}
    ></ChatHeader>
  );
}
