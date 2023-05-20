import React from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import dayjs from 'dayjs';

export default function ChatHeader({
  teamName,
  companyName,
  manager,
  sprintData,
}) {

  const [currentSprint, [startDate, endDate]] = sprintData;

  return (
    <header className="chat-header">
      <h1> {teamName} </h1>
      <h1 className="fw-normal">
        {' '}
        {currentSprint} |<p className="text-md"> By- {manager?.name} </p>
        <span className="text-md fs-6 d-flex justify-content-start fw-normal mt-2 text-center text-green ">
          {' '}
          <AiFillClockCircle className="me-1" />{' '}
          {dayjs(startDate).format('DD-MM-YY')} -{' '}
          {dayjs(endDate).format('DD-MM-YY')}{' '}
        </span>
      </h1>
      <p> 🏢{companyName} </p>
    </header>
  );
}
