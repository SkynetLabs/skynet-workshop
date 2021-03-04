# Welcome to the Skynet Workshop!

Welcome!

In this repo you will find a basic Skynet app online to help you start developing on Skynet!

The goal of this workshop is to provide developers with examples of the
important concepts of developing an app on Skynet.

> [Create React App](https://github.com/facebook/create-react-app) is used for structuring the project and simplifying deployment, but you don't need any knowledge of React to follow the workshop.

## Prerequisites

1. [NodeJS](https://nodejs.org/en/download/) installed.
1. Clone this repo.

## Part 0: Setup

1. Open your terminal to the cloned repo folder and run `yarn install` to install the project's dependencies.
1. Run `yarn start` to see our app's starting layout. If your browser doesn't launch, visit [localhost:3000](localhost:3000). Create React App will auto-reload when you save files. (Use <kbd>Ctrl</kbd>+<kbd>C</kbd> in the terminal to stop your app.)

## Part 1: Upload a file

We'll first cover the most basic functionality of Skynet, uploading data.

Follow the steps below to update this app to allow the user to upload a file
to Skynet. For this sample app, we'll ask the user to upload a picture.

1.  Install `skynet-js` by running `yarn add skynet-js`
2.  First, you need to import the SDK and initialize a Skynet Client. Open the file `src/App.js`, look for where _Step 1.2_ code goes, and paste the following code.

> :warning: Removed unideal defaultPortal Code. We could return if it's something they'd use in production, but doesn't seem worth crowding code.

```javascript
// Import the SkynetClient and a helper
import { SkynetClient } from 'skynet-js';

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = 'https://siasky.net/';

// Initiate the SkynetClient
const client = new SkynetClient(portal);
```

3. Next, create the upload functionality. In the `handleSubmit` function (called for when form is submitted), paste the code that will upload a file below the _Step 1.3_ mark.

> :warning: Removed `!res` check. Not sure what a Falsey `res` that doesn't throw an error looks like or isn't handled by the SDK. Fixed upload response handling a bit. Fixed skylink handling here and in Links.js.

```javascript
// Upload user's file and get backs descriptor for our Skyfile
const { skylink } = await client.uploadFile(file).catch((error) => {
  console.error(`error uploading file: ${error.message}`);
});

// skylinks start with `sia://` and don't specify a portal URL
// we can generate URLs for our current portal though.
const skylinkUrl = client.getSkylinkUrl(skylink);

console.log('File Uploaded:', skylinkUrl);

// To use this later in our React app, save the URL to the state.
setFileSkylink(skylinkUrl);
```

4. Above this code, uncomment `console.log('Uploading file...');`

5. **Test it out!** If you aren't still running the app, run `yarn start` again and try uploading a file. If you open your Developer Console (by pressing <kbd>F12</kbd>), the console show helpful messages.

## Part 2: Upload a Web Page

> In Part 1, our app successfully uploaded a file to Skynet, now we'll build on that code to upload a web page.

In addition to files, Skynet can receive directory uploads. Once uploaded to Skynet, any directory with an `index.html` will load in your browser just like any website. This enables developers to write and deploy their web app, just by uploading the project's build folder.

1. First, create the upload directory functionality. Back in `handleSubmit` inside `src/App.js`, paste this code in the area for _Step 2.1_.

```javascript
// Create the text of an html file what will be uploaded to Skynet
// We'll use the skylink from Part 1 in the file to load our Skynet-hosted image.
const webPage = generateWebPage(name, skylinkUrl);

// Build our directory object, we're just including the file for our webpage.
const webDirectory = {
  'index.html': webPage,
  // 'couldList.jpg': moreFiles,
};

// Upload user's webpage
const { skylink: dirSkylink } = await client
  .uploadDirectory(webDirectory, 'certificate')
  .catch((error) => {
    console.error(`error uploading web page: ${error.message}`);
  });

// generate a URL for our current portal
const dirSkylinkUrl = client.getSkylinkUrl(dirSkylink);

console.log('Web Page Uploaded:', dirSkylinkUrl);

// To use this later in our React app, save the URL to the state.
setWebPageSkylink(dirSkylinkUrl);
```

2. Above this code, uncomment `console.log('Uploading web page...');`

3. **Test it out!** Now the user can submit their name and photo to generate their very own
   web page on Skynet!

## Part 3: Make it Dynamic

> In parts 1 and 2, you uploaded files onto Skynet. The files at these Skylinks are _immutable_, that is, they cannot be modified (or else their URL would also change). In this section, we'll use SkyDB to store editable data on Skynet.

> :warning: still need to revisit the pieces of part 3, and probably make 3B part 4.

### Section A: SkyDB

The first step to making this webpage editable is hooking it up to `SkyDB`.
`SkyDB` uses a user's seed to access and store information in a simple `Key | Value` store. Although this might seem very basic, it enables some incredible
functionality on Skynet.

1. First we need to import the `genKeyPariFromSeed` method from
   `skynet-js`. Add the code to `src/Add.js` for `Step 3A.1`.

```javascript
import { genKeyPairFromSeed } from 'skynet-js';
```

2. Next we want to define the `SkyDB` entry `datakey`, this is the `Key` that
   we will be working with in `SkyDB`. Add the code to `src/Add.js` for `Step 3A.2`.

   > :warning: I don't really like this here? this isn't really the key so :/

```javascript
const dataKey = 'workshop';
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

## Section 3B: HNS

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
const registryDataKey = 'registry-workshop2';

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

## Part 4: Identity

We're releasing our decentralized, cross-application identity solution for Skynet in April 2021. Keep an eye out for that.

## Part 5: Deployment

Congratulations! You have a fully functioning Skapp! Now it is time to deploy
it and let the world see its wonder! As we mentioned before, deploying an
application is as easy as uploading a directory.

1. For Create React App projects, we need to add `"homepage": ".",` to the `package.json`.

2. Build the application with `yarn build`

3. Upload the newly created `build` folder to [https://siasky.net](http://siasky.net). (Make sure you select 'Do you want to upload an entire directory?')

4. Done!

<!-- Now you might be thinking,
> wait, I all I have is this immutable skylink, what if I want to update my Skapp?.

You are right! Having a skylink that points to your Skapp isn't very useful because, as we saw in Part 3, if you make updates to your
Skapp the Skylink will change. We just learned about the registry and using
it to link data to an `HNS` domain. You can do that for your app as well!

To make your life even easier, one of our core team members created a super
useful Github Action to automate that entire process for you. You can find
the code [here](https://github.com/kwypchlo/deploy-to-skynet-action) and you
can use [this
blog](https://blog.sia.tech/automated-deployments-on-skynet-28d2f32f6ca1) to
help you get started. -->

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
