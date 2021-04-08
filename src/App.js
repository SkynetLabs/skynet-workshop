// Import react components
import { useState, useEffect } from 'react';

// Import App Component & helper
import WorkshopForm from './components/Form';
import generateWebPage from './helpers/generateWebPage';

// Import UI Components
import { Header, Tab, Container } from 'semantic-ui-react';

/************************************************/
/*        Step 3.1 Code goes here               */
/************************************************/

/************************************************/
/*        Step 1.2 Code goes here               */
/************************************************/

// Import the SkynetClient and a helper
import { SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from 'content-record-library';

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

// Initiate the SkynetClient
const client = new SkynetClient(portal);

const contentRecord = new ContentRecordDAC();

/*****/

function App() {
  /************************************************/
  /*        Step 3._ Code goes here               */
  /************************************************/
  const [mySky, setMySky] = useState();
  // const [contentRecord, setContentRecord] = useState();
  const [loggedIn, setLoggedIn] = useState(null);
  const dataDomain =
    window.location.hostname === 'localhost' ? 'localhost' : 'snew.hns';

  useEffect(() => {
    async function initMySky() {
      try {
        // const mySky = await client.loadMySky();
        const mySky = await client.loadMySky(dataDomain);
        mySky.loadDacs(contentRecord);

        // mySky.addPermissions('certificate.hns/');
        const loggedIn = await mySky.checkLogin();
        console.log('silent response:', loggedIn);
        setMySky(mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
        }
      } catch (e) {
        console.error(e);
      }
    }

    initMySky();

    // Specify how to clean up after this effect:
    return function cleanup() {
      async function destroyMySky() {
        if (mySky) {
          await mySky.destroy();
        }
      }

      destroyMySky();
    };
  }, []);

  /*****/

  // Define app state helpers
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(3);

  // Step 1 Helpers
  const [file, setFile] = useState();
  const [fileSkylink, setFileSkylink] = useState('');

  // Step 2 Helpers
  const [name, setName] = useState('');
  const [webPageSkylink, setWebPageSkylink] = useState('');

  // Step 3 Helpers
  // const [seed, setSeed] = useState('');
  const [dataKey, setDataKey] = useState('');
  const [userColor, setUserColor] = useState('#ffffff');
  const [filePath, setFilePath] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    setFilePath(dataDomain + '/' + dataKey);
  }, [dataKey]);

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
    const { skylink } = await client.uploadFile(file);

    // skylinks start with `sia://` and don't specify a portal URL
    // we can generate URLs for our current portal though.
    const skylinkUrl = await client.getSkylinkUrl(skylink);

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
    const webPage = generateWebPage(name, skylinkUrl, userID, filePath);

    // Build our directory object, we're just including the file for our webpage.
    const webDirectory = {
      'index.html': webPage,
      // 'couldList.jpg': moreFiles,
    };

    // Upload user's webpage
    const { skylink: dirSkylink } = await client.uploadDirectory(
      webDirectory,
      'certificate'
    );

    // generate a URL for our current portal
    const dirSkylinkUrl = await client.getSkylinkUrl(dirSkylink);

    console.log('Web Page Uploaded:', dirSkylinkUrl);

    // To use this later in our React app, save the URL to the state.
    setWebPageSkylink(dirSkylinkUrl);

    /************************************************/
    /*        Part 3: Make it Dynamic               */
    /************************************************/
    console.log('Saving user data to SkyDB using MySky...');

    /************************************************/
    /*        Step 3.2 Code goes here              */
    /************************************************/

    const jsonData = {
      name,
      skylinkUrl,
      dirSkylinkUrl,
      color: userColor,
    };

    await handleMySkyWrite(jsonData);

    /*****/

    setLoading(false);
  };

  // loadData will load the users data from SkyDB
  const loadData = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Loading user data from SkyDB');

    /************************************************/
    /*        Step 3.5 Code goes here              */
    /************************************************/
    // Use getJSON to load the user's information from SkyDB
    const data = await mySky.getJSON(filePath);
    console.log(data);

    // To use this elsewhere in our React app, save the data to the state.
    if (data) {
      setName(data.name);
      setFileSkylink(data.skylinkUrl);
      setWebPageSkylink(data.dirSkylinkUrl);
      setUserColor(data.color);
      console.log('User data loaded from SkyDB!');
    } else {
      console.error('There was a problem with getJSON');
    }
    /*****/

    setLoading(false);
  };

  const handleMySkyLogin = async () => {
    /************************************************/
    /*        Step 3._ Code goes here               */
    /************************************************/

    const status = await mySky.requestLoginAccess();
    console.log('requestLoginAccess', status);
    setLoggedIn(status);
    if (status) {
      setUserID(await mySky.userID());
    }

    /*****/
  };

  const handleMySkyLogout = async () => {
    await mySky.logout();

    setLoggedIn(false);
  };

  // handleSelectTab handles selecting the part of the workshop
  const handleSelectTab = (e, { activeIndex }) => {
    setActiveTab(activeIndex);
  };

  const handleMySkyWrite = async (jsonData) => {
    // Use setJSON to save the user's information to SkyDB
    try {
      await mySky.setJSON(filePath, jsonData);
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
  };

  const handleSaveAndRecord = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Saving user data to MySky');

    const jsonData = {
      name,
      skylinkUrl: fileSkylink,
      dirSkylinkUrl: webPageSkylink,
      color: userColor,
    };

    try {
      await mySky.setJSON(filePath, jsonData);
      console.log('call DAC here.');
      const result = await contentRecord.recordInteraction({
        skylink: webPageSkylink,
        metadata: { action: 'updatedColorOf' },
      });
      console.log('result:', result);
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
    setLoading(false);
  };

  // define args passed to form
  const formProps = {
    handleSubmit,
    handleMySkyLogin,
    handleMySkyLogout,
    loadData,
    name,
    // seed,
    dataKey,
    userColor,
    setDataKey,
    setFile,
    setName,
    // setSeed,
    setUserColor,
    activeTab,
    fileSkylink,
    webPageSkylink,
    loading,
    mySky,
    loggedIn,
    setLoggedIn,
    dataDomain,
    handleSaveAndRecord,
  };

  const panes = [
    {
      menuItem: 'Part 1: File Upload',
      render: () => (
        <Tab.Pane>
          <WorkshopForm {...formProps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Part 2: Folder Upload',
      render: () => (
        <Tab.Pane>
          <WorkshopForm {...formProps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Part 3: SkyDB',
      render: () => (
        <Tab.Pane>
          <WorkshopForm {...formProps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Part 4: Content Record',
      render: () => (
        <Tab.Pane>
          <WorkshopForm {...formProps} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container>
      <Header
        as="h1"
        content="Skynet Workshop App"
        textAlign="center"
        style={{ marginTop: '1em', marginBottom: '1em' }}
      />
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
        onTabChange={handleSelectTab}
        activeIndex={activeTab}
      />
    </Container>
  );
}

export default App;
