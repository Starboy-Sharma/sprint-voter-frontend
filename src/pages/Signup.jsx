import { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const teamNameRef = useRef();
    const orgNameRef = useRef();
    const roleRef = useRef();

    const navigate = useNavigate();

    const handleSignup = function() {
        console.log('Good to go');

        navigate('/login');
    }

    return (
        <Container fluid="md">
          <Row className="d-flex p-2 justify-content-center align-items-center text-center login-container">
            <Col xs={6} className="login-card signup-card">
                <h2> Register Your Team </h2>
    
                <input type="email"  placeholder="Email" ref={emailRef} />
                <input type="password"  placeholder="Your Secret" ref={passwordRef} />
                <input type="text"  placeholder="Your Team Name" ref={teamNameRef} />
                <input type="text"  placeholder="Company Name" ref={orgNameRef} />
                <select className="form-select" aria-label="Choose login Type" ref={roleRef}>
                  <option defaultValue=''>Select Role</option>
                  <option value="member">Member</option>
                  <option value="team_member">Team Manager</option>
                </select>
    
                <button className="signin-btn mt-4" onClick={handleSignup}> Sign up </button>
    
                <p className='mt-3'> Already have an account <Link to="/login" className='btn btn-dark btn-sm' title='Login'> Click here 🐭 </Link> </p>
    
            </Col>
          </Row>
        </Container>
      )
}
