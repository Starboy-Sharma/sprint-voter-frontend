import { ListGroup, Placeholder } from 'react-bootstrap';

const Spinner = function () {
  return (
    <ListGroup className="member-container mt-3" title="Please wait...">
      <Placeholder as={ListGroup.Item} animation="glow" className="mb-2">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as={ListGroup.Item} animation="glow" className="mb-2">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as={ListGroup.Item} animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
    </ListGroup>
  );
};

export default Spinner;
