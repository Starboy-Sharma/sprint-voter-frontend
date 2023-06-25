import { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  FloatingLabel,
  Toast,
  ToastContainer,
} from 'react-bootstrap';

import { FcReading } from 'react-icons/fc';
import { TEAM_MANAGER, TEAM_MEMBER } from '../config.js';

// SPRINT MODAL FORM
const ModalForm = function ({ setShowModal, showModal, setSprintData, room }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSprintData({ title, description, room });
    setShow(true);
    setShowModal(false);
  };

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
        style={{ minHeight: '240px' }}
      >
        <ToastContainer position="top-end">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            position="top-end"
          >
            <Toast.Header className="text-dark">
              <FcReading fontSize={26} className="mr-2" />
              <strong className="me-auto"> Success 🎉</strong>
            </Toast.Header>
            <Toast.Body className="text-dark">
              Woohoo, you have updated the title and description
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>

      <Modal show={showModal} onHide={setShowModal}>
        <Modal.Header>
          <Modal.Title className="text-dark">Add your task details</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-dark">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required="Title is required"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Leave a comment here"
                  style={{ height: '100px', resize: 'none' }}
                  required="Description is required"
                />
              </FloatingLabel>
            </Form.Group>

            <Button
              variant="dark"
              type="submit"
              className="mt-3"
              style={{ float: 'right' }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default function ChatMessage({ room, role, socket }) {
  const [showModal, setShowModal] = useState(false);
  const [sprintData, setSprintData] = useState({
    title: 'Your title will appear here',
    description: 'You will see description here',
    room: room,
  });

  const handleSprintData = (data) => {
    setSprintData({ ...data });
  };

  useEffect(() => {
    if (socket && role === TEAM_MANAGER) {
      console.log('Manager add sprint data');
      socket.emit('ticketData', sprintData);
      socket.emit('reset_vote', room);
    }
  }, [sprintData]);

  useEffect(() => {
    if (socket) {
      socket.on('getTicketData', handleSprintData);
    }

    // cleanup function
    return () => {
      if (socket) {
        socket.off('getTicketData', handleSprintData);
      }
    };
  }, [socket]);

  return (
    <>
      <div className="chat-message">
        <div className="message">
          <h3> {sprintData.title} </h3>

          <p> {sprintData.description} </p>
        </div>

        {role === TEAM_MANAGER && (
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
        )}
      </div>

      {showModal && (
        <ModalForm
          setShowModal={setShowModal}
          showModal={showModal}
          setSprintData={setSprintData}
          room={room}
        />
      )}
    </>
  );
}
