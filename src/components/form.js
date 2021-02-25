import { Button, Col, Form, Row } from "react-bootstrap";
import { FileDrop } from "./filedrop";

// WorkshopForm is a simple form used for the Skynet Workshop
const WorkshopForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      {/* Input for seed */}
      {props.step3 && (
        <>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your Seed"
              value={props.seed}
              onChange={(e) => {
                props.setSeed(e.target.value);
              }}
            />
          </Form.Group>
          <Row>
            <Col>
              <Button
                variant="success"
                onClick={(e) => {
                  props.loadData(e);
                }}
              >
                Load Data
              </Button>
            </Col>
            <Col>
              <Button
                variant="success"
                onClick={(e) => {
                  props.handleRegistryURL(e);
                }}
              >
                Create Registry URL
              </Button>
            </Col>
          </Row>
          <br />
        </>
      )}
      {/* Input for name */}
      {props.step2 && (
        <>
          {" "}
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={props.name}
              onChange={(e) => {
                props.setName(e.target.value);
              }}
            />
          </Form.Group>
          <br />
        </>
      )}
      {/* Input for file */}
      <Form.Group>
        <FileDrop setFile={props.setFile} />
      </Form.Group>

      <br />
      <Button variant="success" type="submit">
        Send to Skynet
      </Button>
    </Form>
  );
};

export { WorkshopForm };
