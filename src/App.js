// Import react components
import { useState } from "react";

// Import custom css
import "./App.css";

// Import bootstrap
import { Button, Form } from "react-bootstrap";

// Step 2
import { WebPage } from "./webpage";

// TODO: add Step 1 import code here

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
  // Step 1
  const [file, setFile] = useState();
  const [fileSkylink, setFileSkylink] = useState("");
  // Step 2
  const [name, setName] = useState("");
  const [webpageSkylink, setWebPageSkylink] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form submitted");

    // Step 1: Upload File
    const [fileErr] = await asyncFunc(handleFileUpload(event));
    if (fileErr) {
      console.log("error from file upload", fileErr);
      return;
    }

    // Step 2: Upload Webpage
    const [webpageErr] = await asyncFunc(handleWebPageUpload(event));
    if (webpageErr) {
      console.log("error from webpage upload", webpageErr);
      return;
    }
  };

  // handleFileUpload is the function used to upload the file
  const handleFileUpload = async (event) => {
    event.preventDefault();
    console.log("Uploading File");

    // TODO: Fill in code to upload file
  };

  // handleWebPageUpload is the function used to upload the webpage
  const handleWebPageUpload = async (event) => {
    event.preventDefault();
    console.log("Uploading WebPage");

    // TODO: Fill in code to upload file
  };

  return (
    <div className="App">
      <h1>Welcome to Skynet!</h1>
      <br />

      {/* Basic input form */}
      <Form onSubmit={handleSubmit}>
        {/* Input for name */}
        <Form.Group inline>
          <Form.Control
            type="text"
            placeholder="Enter your name"
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
      {fileSkylink && <Button href={fileSkylink}>View File on Skynet</Button>}

      {/* Show button to view user's webpage on skynet once uploaded */}
      <br />
      {webpageSkylink && (
        <Button href={webpageSkylink}>View Webpage on Skynet</Button>
      )}
    </div>
  );
}

export default App;
