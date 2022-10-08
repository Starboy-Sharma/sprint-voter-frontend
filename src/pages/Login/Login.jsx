import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import useFetch from '../../hooks/useFetch';

export function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data, loading, error } = useFetch('https://api.quotable.io/random', 'get', {});
    
    const handleLogin = () => {
        console.log(data)
    }

  return (
    <Container fluid="md">
      <Row className="d-flex p-2 justify-content-center align-items-center text-center login-container">
        <Col xs={6} className="login-card">
            <h2> Login </h2>

            <input type="email"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password"  placeholder="Your Secret" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className="signin-btn mt-4" onClick={handleLogin}> Sign In </button>

        </Col>
      </Row>
    </Container>
  )
}