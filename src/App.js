// Import react components
import { useState } from "react";

// Import App Component
import { Links } from "./components/links";
import { Loading } from "./components/loading";
import { Steps } from "./components/steps";
import { WebPage } from "./components/webpage";
import { WorkshopForm } from "./components/form";

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
  // Define app state helpers
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  // Step 1 Helpers
  const [file, setFile] = useState();
  const [fileSkylink, setFileSkylink] = useState("");

  // Step 2 Helpers
  const [name, setName] = useState("");
  const [webpageSkylink, setWebPageSkylink] = useState("");

  // Step 3 Helpers
  const [seed, setSeed] = useState("");
  const [registryURL, setRegistryURL] = useState("");

  // Handle form submission. This is where the bulk of the workshop logic is
  // handled
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form submitted");
    setLoading(true);

    /************************************************/
    /*        Step 1: Upload a file                */
    /************************************************/
    console.log("Uploading file");

    /************************************************/
    /*        Step 1.3 Code goes here               */

    /************************************************/

    /************************************************/
    /*        Step 1: Upload a Web Page             */
    /************************************************/
    console.log("Uploading Webpage");

    /************************************************/
    /*        Step 2.1 Code goes here               */

    /************************************************/

    /************************************************/
    /*        Step 3: Make it Dynamic               */
    /************************************************/
    console.log("Saving user data to SkyDB");

    /************************************************/
    /*        Step 3A.3 Code goes here              */

    /************************************************/

    setLoading(false);
  };

  // loadData will load the users data from SkyDB
  const loadData = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Loading user data from SkyDB");

    /************************************************/
    /*        Step 3A.4 Code goes here              */

    /************************************************/

    setLoading(false);
    console.log("User data loaded from SkyDB!");
  };

  // handleRegistryURL will handle generating the registry URL for the WebPage
  const handleRegistryURL = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Generating registryURL");

    /************************************************/
    /*        Step 3B.1 Code goes here              */

    /************************************************/

    console.log("RegistryURL generated!");
    setLoading(false);
  };

  // handleSelectStep handles selecting the step of the workshop
  const handleSelectStep = (eventKey, event) => {
    event.preventDefault();
    if (eventKey === "1") {
      setActiveKey("1");
      setStep2(false);
      setStep3(false);
    }
    if (eventKey === "2") {
      setActiveKey("2");
      setStep2(true);
      setStep3(false);
    }
    if (eventKey === "3") {
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
            webpageSkylink={webpageSkylink}
          />
        </>
      )}
    </div>
  );
}

export default App;
