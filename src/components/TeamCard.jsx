import React from 'react';
import { BsBuilding } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const TeamCard = ({ team }) => {

  const memberNames = getMembers();

  function getMembers() {
    const members = team.members;
    const firstFourMember = members.slice(0, 3);
    let memberNames = [];

    firstFourMember.forEach(member => {
      if (member.id !== team.userId) memberNames.push(member.name);
    })
    memberNames = memberNames.join(', ');

    if (memberNames.length <= 3) {
      memberNames = 'You, ' + memberNames;
    } else {
      // remove the last member name
      memberNames.slice(memberNames.length-1, 1);
      memberNames = 'You, ' + memberNames;
    }
    return memberNames;
  }

  console.log(team);
  getMembers();

  return (
    <div className="card text-black" style={{ width: '18rem' }}>
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
        <Link to="/planning" state={{ team: team }}  className="btn btn-dark btn-sm d-flex justify-content-center">
          START PLANNING
        </Link>
      </div>
    </div>
  );
};

export default TeamCard;
