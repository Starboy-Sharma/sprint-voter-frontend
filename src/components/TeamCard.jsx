import React, { useState } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

// Sprint planning form modal
function FormModal({
  isOpen,
  handleModalSubmit,
  setSprintDateRange,
  sprintRange,
}) {
  const todayDate = new Date();

  return (
    <Modal
      show={isOpen}
      onHide={() => toggleModal(close)}
      className="form-modal"
    >
      <Form onSubmit={handleModalSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Sprint Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sprint</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type your title..."
              required
              minLength={3}
              name="title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateRange">
            <p>Sprint Start & End Date</p>
            <DateRangePicker
              onChange={setSprintDateRange}
              value={sprintRange}
              minDate={todayDate}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const TeamCard = ({ team, user }) => {
  const memberNames = getMembers();
  const [isOpen, toggleModal] = useState(false);
  const [sprintData, setSprintData] = useState([]);
  const [sprintRange, setSprintDateRange] = useState([new Date(), new Date()]);

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

  function getMembers() {
    const members = team.members;
    const firstFourMember = members.slice(0, 3);
    let memberNames = [];

    firstFourMember.forEach((member) => {
      if (member.id !== team.userId) memberNames.push(member.name);
    });
    memberNames = memberNames.join(', ');

    if (memberNames.length <= 3) {
      memberNames = 'You, ' + memberNames;
    } else {
      // remove the last member name
      memberNames.slice(memberNames.length - 1, 1);
      memberNames = 'You, ' + memberNames;
    }
    return memberNames;
  }

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

  getMembers();

  return (
    <div className="card text-black" style={{ width: '18rem' }}>
      <FormModal
        isOpen={isOpen}
        handleModalSubmit={handleModalSubmit}
        setSprintDateRange={setSprintDateRange}
        sprintRange={sprintRange}
      />
      <img
        className="card-img-top img-responsive img-thumbnail"
        src="https://images2.alphacoders.com/531/531602.jpg"
        alt="Team Image"
      />
      <div className="card-body bg-light">
        <AiOutlineUsergroupAdd
          fontSize={18}
          className="add-member-icon"
          role="button"
          title="Add Member"
        />
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
      </div>
    </div>
  );
};

export default TeamCard;
