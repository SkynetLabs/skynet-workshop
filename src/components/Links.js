import { Button } from 'semantic-ui-react';

// Links is a simple row containing links created during the workshop
const Links = ({ fileSkylink, webPageSkylink, registryURL }) => {
  return (
    <>
      {fileSkylink && (
        <Button basic secondary href={fileSkylink} target="_blank">
          View File on Skynet
        </Button>
      )}
      {/* Show button to view user's webpage on skynet once uploaded */}
      {webPageSkylink && (
        <Button basic secondary href={webPageSkylink} target="_blank">
          View Web Page on Skynet
        </Button>
      )}
    </>
  );
};

export default Links;
