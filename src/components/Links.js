import { Button } from 'semantic-ui-react';

// Links is a simple row containing links created during the workshop
const Links = ({ fileSkylink, webPageSkylink, registryURL }) => {
  return (
    <>
      {fileSkylink && (
        <Button primary href={fileSkylink} target="_blank">
          View File on Skynet
        </Button>
      )}
      {/* Show button to view user's webpage on skynet once uploaded */}
      {webPageSkylink && (
        <Button primary href={webPageSkylink} target="_blank">
          View Web Page on Skynet
        </Button>
      )}
      {/* Show button to view the user's registry URL */}
      {registryURL && (
        <Button primary href={registryURL} target="_blank">
          View the Registry URL
        </Button>
      )}
    </>
  );
};

export default Links;
