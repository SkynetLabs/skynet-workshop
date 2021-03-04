import { Button, Col, Row } from 'react-bootstrap';

// Links is a simple row containing links created during the workshop
const Links = ({ fileSkylink, webPageSkylink, registryURL }) => {
  return (
    <Row>
      <Col>
        {fileSkylink && (
          <Button href={fileSkylink} target="_blank">
            View File on Skynet
          </Button>
        )}
      </Col>
      <Col>
        {/* Show button to view user's webpage on skynet once uploaded */}
        {webPageSkylink && (
          <Button href={webPageSkylink} target="_blank">
            View Web Page on Skynet
          </Button>
        )}
      </Col>
      <Col>
        {/* Show button to view the user's registry URL */}
        {registryURL && (
          <Button href={registryURL} target="_blank">
            View the Registry URL
          </Button>
        )}
      </Col>
    </Row>
  );
};

export { Links };
