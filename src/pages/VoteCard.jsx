import React from 'react';

export default function VoteCard({ value, handleVote }) {
  return (
    <div className="vote-card" onClick={() => handleVote(value)}>
      {value}
    </div>
  );
}
