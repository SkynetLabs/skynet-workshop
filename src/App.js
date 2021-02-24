// Import react components
import { useState } from "react";

// Logo
import logo from "./skynet_logo.svg";

// Import custom css
import "./App.css";

// Import bootstrap
import { Button, Col, Form, Row } from "react-bootstrap";

// Step 2
import { WebPage } from "./webpage";

// TODO: add Step 1 import code here

// TODO: Add Step 3 variable here

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
    console.log("Uploading file");
    // Step 1 code starts here

    // Step 1 code ends here

    // Step 2: Upload Webpage
    console.log("Uploading Webpage");
    // Step 2: code starts here

    // Step 2: code ends here

    // Step 3: Save to SkyDB
    console.log("Saving user data to SkyDB");

    // Step 3: code start here

    // Step 3: code ends here

    setLoading(false);
  };

  const loadData = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Loading user data from SkyDB");


    setLoading(false);
    console.log("User data loaded from SkyDB!");
  };

  const handleRegistryURL = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Generating registryURL");

    // TODO: Fill in code to load user data from SkyDB here

    console.log("RegistryURL generated!");
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
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter your Seed"
                value={seed}
                onChange={(e) => {
                  setSeed(e.target.value);
                }}
              />
            </Form.Group>
            <Row>
              <Col>
                <Button
                  variant="success"
                  onClick={(e) => {
                    loadData(e);
                  }}
                >
                  Load Data
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  onClick={(e) => {
                    handleRegistryURL(e);
                  }}
                >
                  See Registry URL
                </Button>
              </Col>
            </Row>
            <br />

            {/* Input for name */}
            <Form.Group>
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
            <Form.Group>
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
          <Row>
            <Col>
              {fileSkylink && (
                <Button href={fileSkylink}>View File on Skynet</Button>
              )}
            </Col>
            <Col>
              {/* Show button to view user's webpage on skynet once uploaded */}
              {webpageSkylink && (
                <Button href={webpageSkylink}>View Webpage on Skynet</Button>
              )}
            </Col>
            <Col>
              {/* Show button to view the user's registry URL */}
              {registryURL && (
                <Button href={registryURL}>View the Registry URL</Button>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default App;
