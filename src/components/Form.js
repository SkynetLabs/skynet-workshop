import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Header,
  Image,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';
import { PopoverPicker } from './PopoverPicker';
import Links from './Links';
import FileDrop from './Filedrop';

// WorkshopForm is a simple form used for the Skynet Workshop
const WorkshopForm = (props) => {
  const [uploadPreview, setUploadPreview] = useState(props.fileSkylink);

  useEffect(() => {
    setUploadPreview(props.fileSkylink);
  }, [props.fileSkylink]);

  return (
    <>
      <Segment>
        <Dimmer active={props.loading}>
          <Loader active={props.loading} />
        </Dimmer>

        {props.activeTab > 1 && (
          <>
            {props.loggedIn === true && (
              <Button onClick={props.handleMySkyLogout}>
                Log Out of MySky
              </Button>
            )}
            {props.loggedIn === false && (
              <Button onClick={props.handleMySkyLogin}>Login with MySky</Button>
            )}
            {props.loggedIn === null && (
              <Button onClick={props.handleMySkyLogin}>Loading MySky...</Button>
            )}
            <Divider />
          </>
        )}

        <Form onSubmit={props.handleSubmit}>
          {/* Input for seed */}
          {props.activeTab > 1 && (
            <>
              <Header as="h4">MySky SkyDB Data</Header>

              <Form.Group inline>
                {/* <Form.Group widths="equal"> */}
                {/* <Form.Input
                  label="MySky Data Domain"
                  // placeholder="Enter your seed."
                  value={props.dataDomain}
                  disabled
                  // onChange={(e) => {
                  //   props.setSeed(e.target.value);
                  // }}
                /> */}
                <Form.Input
                  label={`Data Path: ${props.dataDomain}/`}
                  placeholder="Enter rest of path."
                  value={props.dataKey}
                  onChange={(e) => {
                    props.setDataKey(e.target.value);
                  }}
                />
                <Button
                  variant="success"
                  disabled={props.loggedIn !== true || !props.dataKey}
                  onClick={(e) => {
                    props.loadData(e);
                  }}
                >
                  Load Data
                </Button>
              </Form.Group>
              <Form.Group inline>
                <Form.Input
                  label="Color"
                  placeholder="#000000"
                  value={props.userColor}
                  onChange={(e) => {
                    props.setUserColor(e.target.value);
                  }}
                />
                <PopoverPicker
                  color={props.userColor}
                  onChange={props.setUserColor}
                />
                {props.activeTab > 2 && (
                  <Button
                    style={{ marginLeft: '20px' }}
                    variant="success"
                    disabled={
                      props.loggedIn !== true ||
                      !props.dataKey ||
                      !props.userColor
                    }
                    onClick={(e) => {
                      props.handleSaveAndRecord(e);
                    }}
                  >
                    Save Data and Record Action
                  </Button>
                )}
              </Form.Group>
              <Divider />
            </>
          )}
          {/* Input for name */}
          {props.activeTab > 0 && (
            <>
              <Header as="h4">Input for Certificate</Header>
              <Form.Group>
                <Form.Input
                  label="Name"
                  placeholder="Enter your name"
                  value={props.name}
                  onChange={(e) => {
                    props.setName(e.target.value);
                  }}
                />
              </Form.Group>
            </>
          )}
          {/* Input for file */}
          <Header as="h4">Image Upload</Header>
          <Form.Group inline>
            <Form.Field>
              <label>Avatar Photo</label>
              <FileDrop
                setFile={props.setFile}
                setUploadPreview={setUploadPreview}
              />
            </Form.Field>
            <Image src={uploadPreview} size="small" />
          </Form.Group>
          <Divider />
          <Button variant="success" disabled={!uploadPreview} type="submit">
            Send to Skynet
          </Button>
        </Form>
      </Segment>
      <Links
        fileSkylink={props.fileSkylink}
        webPageSkylink={props.webPageSkylink}
      />
    </>
  );
};

export default WorkshopForm;
