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

        <Form onSubmit={props.handleSubmit}>
          {/* Input for seed */}
          {props.activeTab > 1 && (
            <>
              <Header as="h4">SkyDB Data</Header>
              <Form.Group widths="equal">
                <Form.Input
                  label="Seed"
                  placeholder="Enter your seed."
                  value={props.seed}
                  onChange={(e) => {
                    props.setSeed(e.target.value);
                  }}
                />
                <Form.Input
                  label="Data Key"
                  placeholder="Enter your data key."
                  value={props.dataKey}
                  onChange={(e) => {
                    props.setDataKey(e.target.value);
                  }}
                />
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
              </Form.Group>
              <Form.Group inline>
                <Button
                  variant="success"
                  disabled={!props.seed || !props.dataKey}
                  onClick={(e) => {
                    props.loadData(e);
                  }}
                >
                  Load Data
                </Button>
              </Form.Group>
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
