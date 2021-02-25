import { Button, Col, Row } from "react-bootstrap";

// Links is a simple row containing links created during the workshop
const Links = (props) => {
  return (
    <Row>
      <Col>
        {props.fileSkylink && (
          <Button href={props.fileSkylink}>View File on Skynet</Button>
        )}
      </Col>
      <Col>
        {/* Show button to view user's webpage on skynet once uploaded */}
        {props.webpageSkylink && (
          <Button href={props.swebpageSkylink}>View Webpage on Skynet</Button>
        )}
      </Col>
      <Col>
        {/* Show button to view the user's registry URL */}
        {props.registryURL && (
          <Button href={props.registryURL}>View the Registry URL</Button>
        )}
      </Col>
    </Row>
  );
};

export { Links };
