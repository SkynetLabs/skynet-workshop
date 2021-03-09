import { Nav } from 'react-bootstrap';

// TODO: style tabs to match skynet styling

// Steps is a simple nav for switching between the steps in the workshop
const Steps = (props) => {
  return (
    <Nav
      variant="tabs"
      defaultActiveKey={props.activeKey}
      onSelect={props.handleSelect}
    >
      <Nav.Item>
        <Nav.Link eventKey="1">Step 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="2">Step 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="3">Step 3</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Steps;
