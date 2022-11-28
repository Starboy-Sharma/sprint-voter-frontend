import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Chats() {
  const location = useLocation();
  const navigate = useNavigate();
  const [team, setTeam] = useState({})

  useEffect(() => {
    const teamData = location.state?.team;
    if (!teamData || Object.keys(teamData).length == 0) {
      console.log('Redirecting to... teams page');
      navigate('/teams');
    }

    setTeam(teamData);

  }, [])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">{team.teamName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/teams">
              <Nav.Link>My Teams</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
