import React, { useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { BsPlusLg } from 'react-icons/bs';
import TeamCard from '../components/TeamCard';

export function Teams() {
  const { user } = useContext(AuthContext);

  return (
    <Container fluid="md">
      <a href="#" className="float" title="Add a New Team">
        <BsPlusLg />
      </a>
      <Row className="p-2 d-flex justify-content-around align-items-center text-center">
        <h1 className="my-5 text-capitalize"> Howdy! 👋 {user?.name} </h1>
        <Col xs={12} className="d-flex justify-content-around">
          {user.teams.map((team) => (
            <TeamCard key={team.name} team={team} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
