import React, { useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { BsBuilding } from 'react-icons/bs';

export function Teams() {
  const { user } = useContext(AuthContext);

  // @TODO: Create a Card Component and pass props
  // @TODO: Also Create a member Component and pass members list from Card Component

  return (
    <Container fluid="md">
      <Row className="p-2 d-flex justify-content-around align-items-center text-center">
        <h1 className="my-5 text-capitalize"> Howdy! 👋 {user.username} </h1>
        <Col xs={12} className="d-flex justify-content-around">
          {user.teams.length == 0 && (
            <div className="row">
              <div className="col-md-8 display-flext justify-center align-items-center">
                <h1> You don't have any team. </h1>
                <p> Please create a new team </p>
                <button className="btn btn-dark"> Click here </button>
              </div>
            </div>
          )}

          {user.teams.map((team) => (
            <div className="card text-black" style={{ width: '18rem' }}>
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
          ))}
        </Col>
      </Row>
    </Container>
  );
}
