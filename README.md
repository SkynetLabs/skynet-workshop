# Welcome to the Skynet Workshop!

Welcome!

In this repo you will find a basic Skynet app online to help you start
developing on Skynet!

The goal of this workshop is to provide developers with examples of the
important concepts of developing an app on Skynet.

> [Create React App](https://github.com/facebook/create-react-app) is used
> for structuring the project and simplifying deployment, but you don't need
> any knowledge of React to follow the workshop.

## Prerequisites

1. [NodeJS](https://nodejs.org/en/download/) installed.
1. [Yarn](https://yarnpkg.com/getting-started/install) installed. (`npm install -g yarn`)
1. Clone this repo.

## Part 0: Setup

1. Open your terminal to the cloned repo folder and run `yarn install` to
   install the project's dependencies.
1. Run `yarn start` to see our app's starting layout. If your browser doesn't
   launch, visit [localhost:3000](localhost:3000). Create React App will
   auto-reload when you save files. (Use <kbd>Ctrl</kbd>+<kbd>C</kbd> in the
   terminal to stop your app.)

## Part 1: Upload a file

We'll first cover the most basic functionality of Skynet, uploading data.

Follow the steps below to update this app to allow the user to upload a file
to Skynet. For this sample app, we'll ask the user to upload a picture.

1.  Install `skynet-js` by running `yarn add skynet-js`
2.  First, you need to import the SDK and initialize a Skynet Client. Open the
    file `src/App.js`, look for where _Step 1.2_ code goes, and paste the
    following code.

```javascript
// Import the SkynetClient and a helper
import { SkynetClient } from 'skynet-js';

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = 'https://siasky.net/';

// Initiate the SkynetClient
const client = new SkynetClient(portal);
```

3. Next, create the upload functionality. In the `handleSubmit` function
   (called for when form is submitted), paste the code that will upload a file
   below the _Step 1.3_ mark.

```javascript
// Upload user's file and get backs descriptor for our Skyfile
const { skylink } = await client.uploadFile(file);

// skylinks start with `sia://` and don't specify a portal URL
// we can generate URLs for our current portal though.
const skylinkUrl = client.getSkylinkUrl(skylink);

console.log('File Uploaded:', skylinkUrl);

// To use this later in our React app, save the URL to the state.
setFileSkylink(skylinkUrl);
```

4. Above this code, uncomment `console.log('Uploading file...');`

5. **Test it out!** If you aren't still running the app, run `yarn start`
   again and try uploading a file. If you open your Developer Console (by
   pressing <kbd>F12</kbd>), the console show helpful messages.

## Part 2: Upload a Web Page

> In Part 1, our app successfully uploaded a file to Skynet, now we'll build
> on that code to upload a web page.

In addition to files, Skynet can receive directory uploads. Once uploaded to
Skynet, any directory with an `index.html` will load in your browser just
like any website. This enables developers to write and deploy their web app,
just by uploading the project's build folder.

1. First, create the upload directory functionality. Back in `handleSubmit`
   inside `src/App.js`, paste this code in the area for _Step 2.1_.

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
const { skylink: dirSkylink } = await client.uploadDirectory(
  webDirectory,
  'certificate'
);

// generate a URL for our current portal
const dirSkylinkUrl = client.getSkylinkUrl(dirSkylink);

console.log('Web Page Uploaded:', dirSkylinkUrl);

// To use this later in our React app, save the URL to the state.
setWebPageSkylink(dirSkylinkUrl);
```

2. Above this code, uncomment `console.log('Uploading web page...');`

3. **Test it out!** Now the user can submit their name and photo to generate their very own
   web page on Skynet!

## Part 3: Make it Dynamic with SkyDB

> In parts 1 and 2, you uploaded files onto Skynet. The files at these
> Skylinks are _immutable_, that is, they cannot be modified (or else their URL
> would also change). In this section, we'll use SkyDB to store editable data
> on Skynet that we can come back to and update.

Right now, if you hover over your image in the certificate, you get a nice
green halo effect. But, we may want to change this later without changing our
skylink. We can do this by saving some editable JSON data to Skynet and
having our web page read the info directly from Skynet.

The first step is hooking up our app to `SkyDB`, but you'll need a little theory here.

SkyDB users Public / Private key pairs for read / write access. If you want
to write to SkyDB, you can use a private key and whatever name you want to
give it (the "data key"), and a JSON object to write. So the key combinations
are associated with a value. Then, anyone can read this value with your
public key and the data key. This kind of database is called a "key-value
store."

To get this public/private key pair, you'll use a "seed" which will always
generate the same pair based off the same text input.

1. First we need to import the `genKeyPariFromSeed` method from
   `skynet-js`. Add the code to `src/Add.js` for `Step 3.1`.

```javascript
import { genKeyPairFromSeed } from 'skynet-js';
```

2. Create the functionality to save the user's data to `SkyDB`. Add the
   following code to `src/App.js` for `Step 3.2`.

```javascript
// Generate the user's private and public keys
const { privateKey, publicKey } = genKeyPairFromSeed(seed);

// Create an object to write to SkyDB
// Conversion to JSON happens automatically.
const jsonData = {
  name,
  skylinkUrl,
  dirSkylinkUrl,
  color: userColor,
};

// Use setJSON to save the user's information to SkyDB
try {
  await client.db.setJSON(privateKey, dataKey, jsonData);
} catch (error) {
  console.log(`error with setJSON: ${error.message}`);
}

// Let's get see info on our SkyDB entry
console.log('SkyDB Entry Written--');
console.log('Public Key: ', publicKey);
console.log('Data Key: ', dataKey);
```

3. Above this code, uncomment `console.log('Saving user data to SkyDB...');`

4. Next, we want the certificate web page to read this data. The code to
   fetch the SkyDB entry is already in the generated page, but you'll need to
   tell it the public key and data key before uploading it to Skynet. Find the
   code from _Step 2.1_ that says

```javascript
const webPage = generateWebPage(name, skylinkUrl);
```

and replace it with

```javascript
const webPage = generateWebPage(name, skylinkUrl, seed, dataKey);
```

5. You may want to load the SkyDB entry later for viewing and editing. To
   create the functionality to load the user's data, we'll use a button to call
   the `loadData` function in our app. Put the following code in the below _Step
   3.5_.

```javascript
// Generate the user's public key again from the seed.
const { publicKey } = genKeyPairFromSeed(seed);

// Use getJSON to load the user's information from SkyDB
const { data } = await client.db.getJSON(publicKey, dataKey);

// To use this elsewhere in our React app, save the data to the state.
if (data) {
  setName(data.name);
  setFileSkylink(data.skylinkUrl);
  setWebPageSkylink(data.dirSkylinkUrl);
  setUserColor(data.color);
  console.log('User data loaded from SkyDB!');
} else {
  console.error('There was a problem with getJSON');
}
```

6. **Test it out!** Now the user can update the color of the halo and see it
   change when they refresh the page! Or, in our web app, you can load previous
   data so you don't have to fill out the form if want to generate a whole new
   page.

## Part 4: Deploy the Web App on Skynet

Congratulations! You have a fully functioning Skapp! Let's deploy
it and let the world see its wonder! As we mentioned before, deploying an
application is as easy as uploading a directory.

1. For Create React App projects, we need to add `"homepage": ".",` to the `package.json`.

2. Build the application with `yarn build`

3. Upload the newly created `build` folder to [https://siasky.net](http://siasky.net). (Make sure you select 'Do you want to upload an entire directory?')

4. Now any of your friends can make their own certificates!

## Where to go from here?

Now that you've deployed a Skynet app, there's many things to keep learning!

- You can [learn how to use
  Handshake](https://support.siasky.net/key-concepts/handshake-names) for a
  decentralized human-readable URL like
  [skyfeed.hns.siasky.net](https://skyfeed.hns.siasky.net).

- You can integrate cross-application identity with
  [SkyID](https://github.com/DaWe35/SkyID) (or the soon-to-be-released mySky,
  available April 2021).

- You can [automate
  deployment](https://blog.sia.tech/automated-deployments-on-skynet-28d2f32f6ca1)
  of your site using a [Github
  Action](https://github.com/kwypchlo/deploy-to-skynet-action).

We're always improving our [Skynet Developer
Resources](https://support.siasky.net/the-technology/developing-on-skynet),
so check that out and join [our Discord](https://discord.gg/sia) to share
ideas with other devs.

## Developing this Workshop

### Available Scripts

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
