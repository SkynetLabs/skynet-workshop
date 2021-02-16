// Import react components
import { useState } from "react";

// Logo
import logo from "./skynet_logo.svg";

// Import custom css
import "./App.css";

// Import bootstrap
import { Button, Form } from "react-bootstrap";

// Step 2
import { WebPage } from "./webpage";

// TODO: add Step 1 import code here

// TODO: Add Step 3 variable here

// asyncFunc is a helper function for error handling async function calls
function asyncFunc(promise) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      return [err]; // which is same as [err, undefined];
    });
}

function App() {
  // Define app state
  //
  // Helpers
  const [loading, setLoading] = useState(false);
  // Step 1
  const [file, setFile] = useState();
  const [fileSkylink, setFileSkylink] = useState("");
  // Step 2
  const [name, setName] = useState("");
  const [webpageSkylink, setWebPageSkylink] = useState("");
  // Step 3
  const [seed, setSeed] = useState("");
  const [registryURL, setRegistryURL] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form submitted");
    setLoading(true);

    // Step 1: Upload File
    const [fileErr] = await asyncFunc(handleFileUpload(event));
    if (fileErr) {
      console.error("error from file upload", fileErr);
      setLoading(false);
      return;
    }

    // Step 2: Upload Webpage
    const [webpageErr] = await asyncFunc(handleWebPageUpload(event));
    if (webpageErr) {
      console.error("error from webpage upload", webpageErr);
      setLoading(false);
      return;
    }

    // Step 3: Save to SkyDB
    const [skydbErr] = await asyncFunc(saveData(event));
    if (skydbErr) {
      console.error("error from skyDB upload", skydbErr);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  // handleFileUpload is the function used to upload the file
  const handleFileUpload = async (event) => {
    event.preventDefault();
    console.log("Uploading File");

    // TODO: Fill in code to upload file

    console.log("File Uploaded!");
  };

  // handleWebPageUpload is the function used to upload the webpage
  const handleWebPageUpload = async (event) => {
    event.preventDefault();
    console.log("Uploading WebPage");

    // TODO: Fill in code to upload webpage

    console.log("WebPage Uploaded!");
  };

  const loadData = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Loading user data from SkyDB");

    // TODO: Fill in code to load user data from SkyDB here

    setLoading(false);
    console.log("User data loaded from SkyDB!");
  };

  const saveData = async (event) => {
    event.preventDefault();
    console.log("Saving user data to SkyDB");

    // TODO: Fill in code to save user data to SkyDB

    console.log("User data saved to SkyDB!");
  };

  const handleRegistryURL = async (event) => {
    event.preventDefault();
    setLoading(true);

    // TODO: Fill in code to load user data from SkyDB here

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Welcome to Skynet!</h1>
      <br />

      {loading ? (
        <>
          <p>Loading...</p>
          <img src={logo} className="App-logo" alt="logo" />
        </>
      ) : (
        <>
          {/* Basic input form */}
          <Form onSubmit={handleSubmit}>
            {/* Input for seed */}
            <Form.Group inline>
              <Form.Control
                type="text"
                placeholder="Enter your Seed"
                value={seed}
                onChange={(e) => {
                  setSeed(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={(e) => {
                loadData(e);
              }}
            >
              Load Data
            </Button>
            <Button
              variant="default"
              onClick={(e) => {
                handleRegistryURL(e);
              }}
            >
              See Registry URL
            </Button>

            <br />
            <br />

            {/* Input for name */}
            <Form.Group inline>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <br />

            {/* Input for file */}
            <Form.Group inline>
              <Form.File
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>

            <br />
            <Button variant="success" type="submit">
              Send to Skynet
            </Button>
          </Form>

          {/* Show button to view user's file on skynet once uploaded */}
          <br />
          {fileSkylink && (
            <Button href={fileSkylink}>View File on Skynet</Button>
          )}

          {/* Show button to view user's webpage on skynet once uploaded */}
          <br />
          {webpageSkylink && (
            <Button href={webpageSkylink}>View Webpage on Skynet</Button>
          )}

          {/* Show button to view the user's registry URL */}
          <br />
          {registryURL && (
            <Button href={registryURL}>View the Registry URL</Button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
