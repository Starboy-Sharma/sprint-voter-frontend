import { useRef, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const [error, setError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const teamNameRef = useRef();
  const orgNameRef = useRef();

  const navigate = useNavigate();

  const handleSignup = function () {
    // validate form
    setError('We have a cool error message');
    return false;

    navigate('/login');
  };

  return (
    <Container fluid="md">
      <Row className="d-flex p-2 justify-content-center align-items-center text-center login-container">
        <Col sm={8} xs={8} md={5} className="login-card signup-card">
          <h2> Register Your Team </h2>

          {error.length !== 0 && (
            <div className="mx-3 error">
              <Alert key="danger"> `${error}` </Alert>
            </div>
          )}

          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Your Secret" ref={passwordRef} />
          <input type="text" placeholder="Your Team Name" ref={teamNameRef} />
          <input type="text" placeholder="Company Name" ref={orgNameRef} />

          <button className="signin-btn mt-4" onClick={handleSignup}>
            {' '}
            Sign up{' '}
          </button>

          <p className="mt-3">
            {' '}
            Already have an account{' '}
            <Link to="/login" className="btn btn-dark btn-sm" title="Login">
              {' '}
              Click here 🐭{' '}
            </Link>{' '}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
