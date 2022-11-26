import { useRef, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import axios from 'axios';

export function Signup() {
  const [error, setError] = useState('');

  const emailRef = useRef();
  const nameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const teamNameRef = useRef();
  const orgNameRef = useRef();
  const [role, setRole] = useState();

  const navigate = useNavigate();

  const validateEmail = (input) => {
    return String(input)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignup = function () {
    if (!nameRef.current.value || nameRef.current.value.length < 3) {
      setError('❌ Name should be at least more than 3 characters.');
      return;
    }

    if (!validateEmail(emailRef.current.value)) {
      setError('❌ Please enter a valid email.');
      return;
    }

    if (!role) {
      setError('❌ Please select a role.');
      return;
    }

    if (role && role === 'team-manager') {
      if (!orgNameRef.current.value || orgNameRef.current.value.length < 3) {
        setError('❌ Company name must be at least 3 characters.');
        return;
      }

      if (!teamNameRef.current.value || teamNameRef.current.value.length < 3) {
        setError('❌ Team name must be at least 3 characters.');
        return;
      }
    }

    if (!passwordRef.current.value || passwordRef.current.value.length < 8) {
      setError('❌ Password must be at least 8 characters.');
      return;
    }

    if (!userNameRef.current.value || userNameRef.current.value.length < 3) {
      setError('❌ Team name must be at least 3 characters.');
      return;
    }

    setError('');
    localStorage.clear();
    const signupURL = `${BASE_URL}/user/register`;

    axios
      .post(signupURL, {
        email: emailRef.current.value,
        username: userNameRef.current.value,
        name: nameRef.current.value,
        role: role,
        password: passwordRef.current.value,
        teamName: teamNameRef?.current?.value || '',
        companyName: orgNameRef?.current?.value || '',
      })
      .then((response) => {
        let result = response.data.result;

        setTimeout(() => {
          navigate('/login');
        }, 600);
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          // validation error from server
          setError(err.response.data.message);
          return;
        }

        setError('Something went wrong, please try again later');
      });
  };

  return (
    <Container fluid="md">
      <Row className="d-flex p-2 justify-content-center align-items-center text-center login-container">
        <Col sm={8} xs={8} md={5} className="login-card">
          <h2> Register Your Team </h2>

          {error.length !== 0 && <Alert variant="danger"> {error} </Alert>}

          <input type="text" placeholder="Your Name" ref={nameRef} />
          <input type="text" placeholder="Username" ref={userNameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Your Secret" ref={passwordRef} />
          <select
            className="form-select mt-3"
            aria-label="Choose login Type"
            onChange={(e) => setRole(e.target.value)}
          >
            <option defaultValue="">Select Role</option>
            <option value="team-member">Team Member </option>
            <option value="team-manager">Team Manager</option>
          </select>
          {role === 'team-manager' ? (
            <>
              <input
                type="text"
                placeholder="Your Team Name"
                ref={teamNameRef}
              />
              <input type="text" placeholder="Company Name" ref={orgNameRef} />
            </>
          ) : null}

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
