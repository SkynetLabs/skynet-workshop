# Welcome to the Skynet Workshop!

Welcome! In this repo you will find a basic react app that is ready for you to
use to get started with developing on skynet!

## Step 1: Upload a file

Let us first cover the most basic functionality of Skynet, uploading data.
Follow the steps below to update this app to allow the user to upload a file
to skynet.

1.  Install `skynet-js` with `yarn add skynet-js`
2.  Initiate Skynet Client by adding the code to `src/Add.js`

```javascript
import { SkynetClient } from "skynet-js";
const portalURL = "https://siasky.net";
const client = new SkynetClient(portalURL);
```

It is important to note here that we are defining the `portalURL` to allow
for the testing on `localhost`, otherwise we can simply leave it blank.

3. Create the upload functionality. Add the following code that will upload
   file in `handleFileUpload` in `src/App.js`

```javascript
try {
  // Upload user's file
  const { skylink } = await client.uploadFile(file);

  // Set state
  const link = portalURL + "/" + skylink.replace("sia:", "");
  setFileSkylink(link);
  console.log("File Uploaded", link);
  return link;
} catch (error) {
  console.log(error);
}
```

4. Test it out!

## Step 2: Upload a Web Page

Now that we have successfully uploaded a file, let's upload a webpage.

1. Create the upload functionality. Add the following code that will upload
   file in `handleWebPageUpload` in `src/App.js`

```javascript
try {
  // Create WebPage
  const page = WebPage(name, filelink);

  // Upload user's webpage
  const { skylink } = await client.uploadFile(page);

  // Set state
  const link = portalURL + "/" + skylink.replace("sia:", "");
  setWebPageSkylink(link);
  console.log("WebPage Uploaded", link);
  return link;
} catch (error) {
  console.log(error);
}
```

2. Test it out!\
   Now the user can submit their name and picture and generate their very own
   webpage on Skynet!

## Step 3: Make it Dynamic

Having your own webpage on Skynet is pretty cool, however since skylinks are
immutable, the user can't change their webpage without changing the skylink. Let's make this webpage editable with SkyDB.

1. First we need to import the `genKeyPariFromSeed` method from `skynet-js`.

```javascript
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
```

2. Next we want to define the SkyDB entry `datakey` that we will be working with.

```javascript
const dataKey = "workshop";
```

3. Create the functionality to load the user's data from SkyDB. Add the
   following code that will use `getJSON` to `loadData` in `src/App.js`

```javascript
// Generate the user's public key
const { publicKey } = genKeyPairFromSeed(seed);

// Use getJSON to load the user's information from SkyDB
try {
  const { data } = await client.db.getJSON(publicKey, dataKey);
  if (data) {
    setName(data.name);
    setFileSkylink(data.fileskylink);
    setWebPageSkylink(data.webpageskylink);
  }
} catch (error) {
  console.log(error);
}
```

4. Create the functionality to save the user's data to SkyDB. Add the
   following code that will use `setJSON` to `saveData` in `src/App.js`

```javascript
// Generate the user's private key
const { privateKey } = genKeyPairFromSeed(seed);

// Create a json object with the relavant data
const json = {
  name: name,
  fileskylink: fileLink,
  webpageskylink: webpageLink,
};

// Use setJSON to save the user's information to SkyDB
try {
  await client.db.setJSON(privateKey, dataKey, json);
} catch (error) {
  console.log(error);
}
```

5. Test it out!\
   Now the user can update their information and see those updates!

## Step 3B: HNS

TODO

- Need to make sure the registry URL points to the webpage

Now that we have the code updating the user's information in SkyDB, we want
to be able to easily see those updates. This is where Handshake domains come
in. Let's see how we would link this user's data with an HNS domain.

1. First we need to see the registry URL. This a link to the SkyDB content.

```javascript
// Generate the user's private key
const { publicKey } = genKeyPairFromSeed(seed);

// Use getEntryUrl to generate the registry URl for this SkyDB Entry
try {
  const url = client.registry.getEntryUrl(publicKey, dataKey);
  setRegistryURL(url);
} catch (error) {
  console.log(error);
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
