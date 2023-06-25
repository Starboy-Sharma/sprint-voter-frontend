import React from 'react';

export default function VoteCard({ value, handleVote, count, isVoteApproved }) {
  console.log(isVoteApproved);

  return (
    <div
      className={`vote-card ${isVoteApproved ? 'approved' : ''}`}
      onClick={() => handleVote(value)}
    >
      {value}

      {count != 0 && <span className="count">{count}</span>}
    </div>
  );
}
