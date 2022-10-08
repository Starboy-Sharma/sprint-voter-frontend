import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { BsFillArrowRightCircleFill } from 'react-icons/bs';


export function Home() {
  return (
    <Container fluid="md">
      <Row className="d-flex p-2 justify-content-center home-container align-items-center text-center">
        <Col>
          <h1 className='mb-5'> Welcome to Sprint Voter </h1>
          <Button variant="dark" size="lg">
            <Link to='/login'>
              Login <i className="fa-solid fa-right-to-bracket"></i>
              <BsFillArrowRightCircleFill />
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
