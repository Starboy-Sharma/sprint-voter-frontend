import React from 'react';
import { BsBuilding } from 'react-icons/bs';

const TeamCard = ({ team }) => {
  return (
    <div className="card text-black" style={{ width: '18rem' }} key={team.name}>
      <img
        className="card-img-top"
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="Team Image"
      />
      <div className="card-body">
        <h5 className="card-title">{team.name}</h5>
        <p className="card-text text-orange text-bold-700">
          {' '}
          <BsBuilding /> Company: {team.companyName}
        </p>

        <p className="card-text text-blue text-bold-700">
          Members: Pankaj Sharma, Shivang, Akshit +3
        </p>

        <a href="#" className="btn btn-dark">
          START PLANNING
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
