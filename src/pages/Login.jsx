import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config.js';
import { Container, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (input) => {
    return String(input)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setError('');
    localStorage.clear();
    console.log('Login API request');
    const loginURL = `${BASE_URL}/user/login`;

    axios
      .post(loginURL, {
        email,
        password,
      })
      .then((response) => {
        let result = response.data.result;

        if (result.profile.status !== 'active') {
          setError('Your account is blocked by admin.');
          return;
        }

        login({
          accessToken: result.accessToken,
          userId: result.profile.id,
          username: result.profile.username,
          name: result.profile.name,
          role: result.profile.role,
          teams: result.teams,
        });

        setTimeout(() => {
          navigate('/teams');
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
        <Col sm={8} xs={8} md={6} className="login-card">
          <h2> Login </h2>
          {error.length !== 0 && <Alert variant="danger"> {error} </Alert>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Secret"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signin-btn mt-4" onClick={handleLogin}>
            {' '}
            Sign In{' '}
          </button>

          <p className="mt-3">
            {' '}
            Don't have an account{' '}
            <Link
              to="/signup"
              className="btn btn-dark btn-sm"
              title="Create a Free Account"
            >
              {' '}
              Click here{' '}
            </Link>{' '}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
