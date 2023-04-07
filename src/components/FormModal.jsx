import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

// Sprint planning form modal
function FormModal({
  isOpen,
  handleModalSubmit,
  setSprintDateRange,
  sprintRange,
  toggleModal,
}) {
  const todayDate = new Date();

  return (
    <Modal
      show={isOpen}
      onHide={() => toggleModal(false)}
      className="form-modal"
    >
      <Form onSubmit={handleModalSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Sprint Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sprint</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type your title..."
              required
              minLength={3}
              name="title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateRange">
            <p>Sprint Start & End Date</p>
            <DateRangePicker
              onChange={setSprintDateRange}
              value={sprintRange}
              minDate={todayDate}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default FormModal;
