// Import react components
import { useState } from 'react';

// Import App Component
import Links from './components/Links';
import Loading from './components/Loading';
import Steps from './components/Steps';
import WorkshopForm from './components/Form';
import generateWebPage from './helpers/generateWebPage';

/************************************************/
/*        Step 3A.1 Code goes here               */
/************************************************/

/************************************************/
/*        Step 1.2 Code goes here               */
/************************************************/

// Import the SkynetClient and a helper method
import { SkynetClient } from 'skynet-js';

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = 'https://siasky.net/';

// Initiate the SkynetClient
const client = new SkynetClient(portal);

/************************************************/
/*        Step 3A.2 Code goes here               */
/************************************************/

function App() {
  // Define app state helpers
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  // Step 1 Helpers
  const [file, setFile] = useState();
  const [fileSkylink, setFileSkylink] = useState('');

  // Step 2 Helpers
  const [name, setName] = useState('');
  const [webPageSkylink, setWebPageSkylink] = useState('');

  // Step 3 Helpers
  const [seed, setSeed] = useState('');
  const [registryURL, setRegistryURL] = useState('');

  // Handle form submission. This is where the bulk of the workshop logic is
  // handled
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');
    setLoading(true);

    /************************************************/
    /*        Part 1: Upload a file                */
    /************************************************/
    console.log('Uploading file...');

    /************************************************/
    /*        Step 1.3 Code goes here               */
    /************************************************/

    // Upload user's file and get backs descriptor for our Skyfile
    const { skylink } = await client.uploadFile(file).catch((error) => {
      console.error(`error uploading file: ${error.message}`);
    });

    // skylinks start with `sia://` and don't specify a portal URL
    // we can generate URLs for our current portal though.
    const skylinkUrl = client.getSkylinkUrl(skylink);

    console.log('File Uploaded:', skylinkUrl);

    // To use this later in our React app, save the URL to the state.
    setFileSkylink(skylinkUrl);

    /************************************************/
    /*        Part 2: Upload a Web Page             */
    /************************************************/
    console.log('Uploading web page...');

    /************************************************/
    /*        Step 2.1 Code goes here               */
    /************************************************/

    // Create the text of an html file what will be uploaded to Skynet
    // We'll use the skylink from Part 1 in the file to load our Skynet-hosted image.
    const webPage = generateWebPage(name, skylinkUrl);

    // Build our directory object, we're just including the file for our webpage.
    const webDirectory = {
      'index.html': webPage,
      // 'couldList.jpg': moreFiles,
    };

    // Upload user's webpage
    const { skylink: dirSkylink } = await client
      .uploadDirectory(webDirectory, 'certificate')
      .catch((error) => {
        console.error(`error uploading web page: ${error.message}`);
      });

    // generate a URL for our current portal
    const dirSkylinkUrl = client.getSkylinkUrl(dirSkylink);

    console.log('Web Page Uploaded:', dirSkylinkUrl);

    // To use this later in our React app, save the URL to the state.
    setWebPageSkylink(dirSkylinkUrl);

    /************************************************/
    /*        Part 3: Make it Dynamic               */
    /************************************************/
    // console.log('Saving user data to SkyDB');

    /************************************************/
    /*        Step 3A.3 Code goes here              */
    /************************************************/

    setLoading(false);
  };

  // loadData will load the users data from SkyDB
  const loadData = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Loading user data from SkyDB');

    /************************************************/
    /*        Step 3A.4 Code goes here              */
    /************************************************/

    setLoading(false);
    console.log('User data loaded from SkyDB!');
    return {
      name: res.data.name,
      fileskylink: res.data.fileskylink,
      webskylink: res.data.webpageskylink,
    };
  };

  // handleRegistryURL will handle generating the registry URL for the WebPage
  const handleRegistryURL = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Generating registryURL');

    // We want the webPageLinks so make sure it was set or try and load from
    // SkyDB
    let data = webPageSkylink;
    if (!data) {
      let { webskylink } = await loadData(event).catch((error) => {
        console.log(`error loading user data: ${error.message}`);
      });
      data = webskylink;
    }

    /************************************************/
    /*        Step 3B.1 Code goes here              */
    /************************************************/

    setLoading(false);
  };

  // handleSelectStep handles selecting the step of the workshop
  const handleSelectStep = (eventKey, event) => {
    event.preventDefault();
    if (eventKey === '1') {
      setActiveKey('1');
      setStep2(false);
      setStep3(false);
    }
    if (eventKey === '2') {
      setActiveKey('2');
      setStep2(true);
      setStep3(false);
    }
    if (eventKey === '3') {
      setActiveKey('3');
      setStep2(true);
      setStep3(true);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Skynet!</h1>
      <br />

      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Steps Nav */}
          <Steps activeKey={activeKey} handleSelect={handleSelectStep} />
          <br />

          {/* Workshop input form */}
          <WorkshopForm
            handleRegistryURL={handleRegistryURL}
            handleSubmit={handleSubmit}
            loadData={loadData}
            name={name}
            seed={seed}
            setFile={setFile}
            setName={setName}
            setSeed={setSeed}
            step2={step2}
            step3={step3}
          />
          <br />

          {/* Show button to view user's file on skynet once uploaded */}
          <Links
            fileSkylink={fileSkylink}
            registryURL={registryURL}
            webPageSkylink={webPageSkylink}
          />
        </>
      )}
    </div>
  );
}

export default App;
