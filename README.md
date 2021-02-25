# Welcome to the Skynet Workshop!

Welcome! In this repo you will find a basic react app that is ready for you to
use to get started with developing on skynet!

The goal of this workshop is to provide developers with examples of the
important concepts of developing an app on skynet.

## Prerequisits

1. [NodeJS](https://nodejs.org/) installed
1. Close this repo

## Step 1: Upload a file

Let us first cover the most basic functionality of Skynet, uploading data.
Follow the steps below to update this app to allow the user to upload a file
to skynet. For this example we are asking the user to upload a picture.

1.  Install `skynet-js` with `yarn add skynet-js`
2.  Initiate Skynet Client by adding the code to `src/Add.js` for `Step 1.2`

```javascript
// Import the SkynetClient and the defaultPortalUrl
import { SkynetClient, defaultPortalUrl, parseSkylink } from "skynet-js";

// Check if the portal is localhost, if so, set it to siasky.net for local
// development.
let portal = defaultPortalUrl();
if (portal.includes("localhost")) {
  portal = "https://siasky.net/";
}

// Initiate the skynet client
const client = new SkynetClient(portal);
```

3. Create the upload functionality. Add the following code that will upload
   file in `handleSubmit` in `src/App.js` for `Step 1.3`

```javascript
// Upload user's file
let res = await client.uploadFile(file).catch((error) => {
  console.log(`error uploading file: ${error.message}`);
});

// Check for a response
if (!res) {
  setLoading(false);
  return;
}

// Set App state
// NOTE: This is for this app specifically, not required.
const fileLink = parseSkylink(res.skylink);
setFileSkylink(fileLink);
console.log("File Uploaded", portal + fileLink);
```

4. Test it out!\
   Run `yarn start` and check out the app at `localhost:3000`

## Step 2: Upload a Web Page

Now that we have successfully uploaded a file, let's upload a webpage. To do
this, we will be uploading a directory with an `index.html` file. Skynet
supports directory uploads and if the directory has an `index.html` file it
will render that file. This enables uploading websites and applications as a
directory for easy deployment.

1. Create the upload functionality. Add the following code that will upload
   the directory in `handleSubmit` in `src/App.js` for `Step 2.1`

```javascript
// Create WebPage
const webPage = WebPage(name);
const webDirectory = {
  "index.html": webPage,
  "image.jpg": file,
};

// Upload user's webpage
res = await client
  .uploadDirectory(webDirectory, "certificate")
  .catch((error) => {
    console.log(`error uploading webpage: ${error.message}`);
  });

// Check for a response
if (!res) {
  setLoading(false);
  return;
}

// Set App state
// NOTE: This is for this app specifically, not required.
const webLink = parseSkylink(res.skylink);
setWebPageSkylink(webLink);
console.log("WebPage Uploaded", portal + webLink);
```

2. Test it out!\
   Now the user can submit their name and picture and generate their very own
   webpage on Skynet!

## Step 3: Make it Dynamic

Having your own webpage on Skynet is pretty cool, however since skylinks are
immutable, the user can't change their webpage without changing the skylink.

### Part A: SkyDB

The first step to making this webpage editable is hooking it up to `SkyDB`.
`SkyDB` uses a user's seed to access and store information in a simple `Key | Value` store. Although this might seem very basic, it enables some incredible
functionality on Skynet.

1. First we need to import the `genKeyPariFromSeed` method from
   `skynet-js`. Add the code to `src/Add.js` for `Step 3A.1`.

```javascript
import { genKeyPairFromSeed } from "skynet-js";
```

2. Next we want to define the `SkyDB` entry `datakey`, this is the `Key` that
   we will be working with in `SkyDB`. Add the code to `src/Add.js` for `Step 3A.2`.

```javascript
const dataKey = "workshop";
```

3. Create the functionality to save the user's data to `SkyDB`. Add the
   following code to `src/App.js` for `Step 3A.3`.

```javascript
// Generate the user's private key
const { privateKey } = genKeyPairFromSeed(seed);

// Create a json object with the relevant data
const json = {
  name: name,
  fileskylink: fileLink,
  webpageskylink: webLink,
};

// Use setJSON to save the user's information to SkyDB
try {
  await client.db.setJSON(privateKey, dataKey, json);
} catch (error) {
  console.log(`error with setJSON: ${error.message}`);
}
```

4. Create the functionality to load the user's data from `SkyDB`. Add the
   following code to `loadData` in `src/App.js` for `Step 3A.4`.

```javascript
// Generate the user's public key
const { publicKey } = genKeyPairFromSeed(seed);

// Use getJSON to load the user's information from SkyDB
const res = await client.db.getJSON(publicKey, dataKey).catch((error) => {
  console.log(`error with getJSON: ${error.message}`);
});

// Check for a response
if (!res) {
  setLoading(false);
  return;
}

// Update App State
// NOTE: This is for this app specifically, not required.
setName(res.data.name);
setFileSkylink(res.data.fileskylink);
setWebPageSkylink(res.data.webpageskylink);
console.log(res);
```

5. Test it out!\
   Now the user can update their information and see those updates!

## Step 3B: HNS

1. Look at linking to dLink

- Need to make sure the registry URL points to the webpage

The technology that makes `SkyDB` work is called the `registry`. Now that we
have the code updating the user's information in `SkyDB`, we want to be able to
easily see those updates. This is where Handshake domains come in. Let's see
how we would link this user's data with an HNS domain.

1. First we need to see the registry URL. This a link to the `SkyDB` content.

```javascript
// This registry entry is going to be different from the SkyDB entry so we need
// to handle it slightly differently.
// First we need a new Data Key as to not overwrite what we put into SkyDB
const registryDataKey = "registry-workshop2";

// As before we need the public and private keys
const { publicKey, privateKey } = genKeyPairFromSeed(seed);

// Registry entries have revisions. SkyDB handles the revision for us when we us
// setJSON and getJSON. Since we are working with the registry directly we need
// to know the revision number.
const { entry } = await client.registry.getEntry(publicKey, registryDataKey);
const revision = entry ? entry.revision + BigInt(1) : BigInt(0);

try {
  // Build the update entry to save to the registry
  const updatedEntry = {
    datakey: registryDataKey,
    revision,
    data,
  };
  await client.registry.setEntry(privateKey, updatedEntry);

  // Now that we have updated the registry entry, get the registry entry URL
  const entryUrl = client.registry.getEntryUrl(publicKey, registryDataKey);
  setRegistryURL(entryUrl);
  console.log(`Registry entry updated: ${entryUrl}`);
} catch (error) {
  console.log(`Failed to update registry entry: ${error.message}`);
}
```

2. Now that we have the registry URL we can update our HNS domain records.\
   Read more about that [here](https://blog.sia.tech/skynet-handshake-d5d16e6b632f)

3. Test it out!\
   Update the blockchain records the first time will take some time, but all
   other updates will be instant.\
   In the mean time you can check out [this example](https://doesitwork.hns.siasky.net)

## Step 4: Identity

Coming soon...

## Step 5: Deployment

Congratulations! You have a fully functioning Skapp! Now it is time to deploy
it and let the world see its wonder! As we mentioned before, deploying an
application is as easy as uploading a directory.

1. Build the application with `yarn build`

2. Upload the newly created `build` folder to `https://siasky.net`

3. Done!

Now you might be thinking, `wait, I all I have is this immutable skylink, what if I want to update my Skapp?`. You are right! Having a skylink that
points to your Skapp isn't very useful because if you make updates to your
Skapp the Skylink will change. We just learned about the registry and using
it to link data to an `HNS` domain. You can do that for your app as well!

To make your life even easier, one of our core team members created a super
useful Github Action to automate that entire process for you. You can find
the code [here](https://github.com/kwypchlo/deploy-to-skynet-action) and you
can use [this
blog](https://blog.sia.tech/automated-deployments-on-skynet-28d2f32f6ca1) to
help you get started.

### Developing this Workshop

#### Available Scripts

In the project directory, you can run:

**yarn start**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**yarn build**

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
