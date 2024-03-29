import { useState } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, TEAM_MANAGER } from '../config';

import CustomModal from './CustomModal';
import AddMember from './AddMember';
import FormModal from './FormModal';
import { getMembers } from '../utils/utils';

const TeamCard = ({ team, user }) => {
  const memberNames = getMembers(team);
  const [isOpen, toggleModal] = useState(false);
  const [isAddMemberModal, setAddMemberModal] = useState(false);
  const [sprintData, setSprintData] = useState([]);
  const [sprintRange, setSprintDateRange] = useState([new Date(), new Date()]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const navigate = useNavigate();

  const handleModalSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.title.value);
    setSprintData([event.target.title.value, sprintRange]);
    toggleModal(false);

    navigate('/planning', {
      state: {
        team: team,
        user,
        sprintData: [event.target.title.value, sprintRange],
      },
    });
  };

  const handleAddMembersModalSubmit = (event) => {
    console.log('handleAddMembersModalSubmit called');
    event.preventDefault();
    console.log(selectedUserIds);
    console.log(team['_id']);

    if (selectedUserIds.length === 0) {
      console.info('No users selected');
      setAddMemberModal(false);
      return;
    }

    // Make an API Call and reload the page
    const API_URL = `${BASE_URL}/member/`;

    axios
      .post(
        API_URL,
        {
          teamId: team['_id'],
          userIds: selectedUserIds,
        },
        {
          headers: {
            ['access.token']: JSON.parse(localStorage.getItem('user'))
              .accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const result = response.data.result;
        console.log(result);

        if (response.status === 200) {
          alert('Member added successfully!');
          location.reload();
        }

        alert('Server error! Please try again later!');
        console.error(result);

        // hide the modal
        // setAddMemberModal(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  function handleSprintPlanning(e) {
    e.preventDefault();

    if (user.role === 'team-manager') {
      toggleModal(true);
      return;
    }

    navigate('/planning', {
      state: {
        team: team,
        user,
        sprintData,
      },
    });
  }

  return (
    <div className="card text-black" style={{ width: '18rem' }}>
      <FormModal
        isOpen={isOpen}
        handleModalSubmit={handleModalSubmit}
        setSprintDateRange={setSprintDateRange}
        sprintRange={sprintRange}
        toggleModal={toggleModal}
      />

      <CustomModal
        isOpen={isAddMemberModal}
        title="Add Members"
        toggleModal={setAddMemberModal}
        saveBtnText="Save"
        onSubmit={handleAddMembersModalSubmit}
      >
        <AddMember
          teamId={team['_id']}
          isOpen={isAddMemberModal}
          setSelectedUserIds={setSelectedUserIds}
        />
      </CustomModal>

      <img
        className="card-img-top img-responsive img-thumbnail"
        src="https://images2.alphacoders.com/531/531602.jpg"
        alt="Team Image"
      />
      <div className="card-body bg-light">
        <h5 className="card-title">{team.teamName}</h5>
        <p className="card-text text-bold-700">
          {' '}
          <BsBuilding /> Company: {team.companyName}
        </p>

        <p className="card-text text-blue text-bold-400">
          Members: {memberNames}
        </p>
        <hr />
        <Link
          to="/planning"
          onClick={handleSprintPlanning}
          className="btn btn-dark btn-sm d-flex justify-content-center"
        >
          START PLANNING
        </Link>

        {user.role === TEAM_MANAGER && (
          <button
            className="btn btn-secondary mt-2 w-100 btn-sm d-flex justify-content-center"
            onClick={() => {
              setAddMemberModal(true);
            }}
          >
            <AiOutlineUsergroupAdd
              fontSize={18}
              style={{ marginRight: '0.5rem' }}
            />
            ADD MEMBERS
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
