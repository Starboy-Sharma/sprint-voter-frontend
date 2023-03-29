import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CustomModal = ({
  isOpen,
  toggleModal,
  title,
  saveBtnText,
  onSubmit,
  children,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={() => toggleModal(false)}
      className="form-modal"
    >
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            {saveBtnText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CustomModal;
