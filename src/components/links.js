import { Button, Col, Row } from "react-bootstrap";

// Links is a simple row containing links created during the workshop
const Links = (props) => {
  const fileSkylink = `https://siasky.net/${props.fileSkylink}`;
  const webpageSkylink = `https://siasky.net/${props.webPageSkylink}`;
  return (
    <Row>
      <Col>
        {props.fileSkylink && (
          <Button href={fileSkylink}>View File on Skynet</Button>
        )}
      </Col>
      <Col>
        {/* Show button to view user's webpage on skynet once uploaded */}
        {props.webPageSkylink && (
          <Button href={webpageSkylink}>View Webpage on Skynet</Button>
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
