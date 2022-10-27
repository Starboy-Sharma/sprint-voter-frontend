import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export function Teams() {

  useEffect(() => {
    console.log('TEAM DATA LOAD TIME');
  }, []);

  return (
    <Container fluid="md">
      <Row className="p-2 d-flex justify-content-around align-items-center text-center">
          <h1 className='my-5'> Your Teams </h1>
        <Col xs={12} className="d-flex justify-content-around">
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Team Image" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-dark">START PLANNING</a>
            </div>
          </div>

          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Team Image" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-dark">START PLANNING</a>
            </div>
          </div>

        </Col>
      </Row>
    </Container>
  )
}
