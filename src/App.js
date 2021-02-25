// Import react components
import { useState } from "react";

// Import App Component
import { FileDrop } from "./components/filedrop";
import {Loading} from "./components/loading";
import { WebPage } from "./components/webpage";

// Import bootstrap
import { Button, Col, Form, Nav, Row } from "react-bootstrap";

/************************************************/
/*        Step 1.2 Code goes here               */

/************************************************/

/************************************************/
/*        Step 2.1 Code goes here               */

/************************************************/

/************************************************/
/*        Step 3A.1 Code goes here               */

/************************************************/

/************************************************/
/*        Step 3A.2 Code goes here               */

/************************************************/

function App() {
  // Define app state
  //
  // Helpers
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
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
    /************************************************/
    /*        Step 1.3 Code goes here               */

    /************************************************/

    // Step 2: Upload Webpage
    console.log("Uploading Webpage");
    /************************************************/
    /*        Step 2.1 Code goes here               */

    /************************************************/

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

  const handleSelect = (eventKey, event) => {
    event.preventDefault();
    if (eventKey === "1") {
      console.log("1 clicked");
      setActiveKey("1");
      setStep2(false);
      setStep3(false);
    }
    if (eventKey === "2") {
      console.log("2 clicked");
      setActiveKey("2");
      setStep2(true);
      setStep3(false);
    }
    if (eventKey === "3") {
      console.log("3 clicked");
      setActiveKey("3");
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
          <Nav
            variant="tabs"
            defaultActiveKey={activeKey}
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey="1">Step 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">Step 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">Step 3</Nav.Link>
            </Nav.Item>
          </Nav>
          <br />
          {/* Basic input form */}
          <Form onSubmit={handleSubmit}>
            {/* Input for seed */}
            {step3 && (
              <>
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
              </>
            )}
            {/* Input for name */}
            {step2 && (
              <>
                {" "}
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
              </>
            )}
            {/* Input for file */}
            <Form.Group>
              <FileDrop />
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
