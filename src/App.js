// Import react components
import { useState } from 'react';

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

/*****/

function App() {
  // Define app state helpers
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Step 1 Helpers
  const [file, setFile] = useState();
  const [fileSkylink, setFileSkylink] = useState('');

  // Step 2 Helpers
  const [name, setName] = useState('');
  const [webPageSkylink, setWebPageSkylink] = useState('');

  // Step 3 Helpers
  const [seed, setSeed] = useState('');
  const [dataKey, setDataKey] = useState('');
  const [userColor, setUserColor] = useState('#000000');

  // Handle form submission. This is where the bulk of the workshop logic is
  // handled
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');
    setLoading(true);

    /************************************************/
    /*        Part 1: Upload a file                */
    /************************************************/
    // console.log("Uploading file...");

    /************************************************/
    /*        Step 1.3 Code goes here               */
    /************************************************/

    /************************************************/
    /*        Part 2: Upload a Web Page             */
    /************************************************/
    // console.log("Uploading web page...");

    /************************************************/
    /*        Step 2.1 Code goes here               */
    /************************************************/

    /************************************************/
    /*        Part 3: Make it Dynamic               */
    /************************************************/
    // console.log("Saving user data to SkyDB...");

    /************************************************/
    /*        Step 3.2 Code goes here              */
    /************************************************/

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

    /*****/

    setLoading(false);
  };

  // handleSelectTab handles selecting the part of the workshop
  const handleSelectTab = (e, { activeIndex }) => {
    setActiveTab(activeIndex);
  };

  // define args passed to form
  const formProps = {
    handleSubmit,
    loadData,
    name,
    seed,
    dataKey,
    userColor,
    setDataKey,
    setFile,
    setName,
    setSeed,
    setUserColor,
    activeTab,
    fileSkylink,
    webPageSkylink,
    loading,
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
