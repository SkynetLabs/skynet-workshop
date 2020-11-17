# Skynet Workshop

Welcome! You are taking the first step in becoming a Skynet Developer!

In this workshop, we will go through three development cycles.

1. [Basic Skapp](#intro)
1. [SkyDB Skapp](#skydb)
1. [SkyID Skapp](#skyid)

# Prerequisites

- Fork the main Skynet Workshop repo or install wget
- [node & npm](https://nodejs.org/en/)
- [Psych](https://www.youtube.com/watch?v=ZXsQAXx_ao0)

# Intro

In this introduction we will go through the process of creating and deploying
a simple application on [Skynet](https://siasky.net).

## Creating Your First Skapp

Much of this introduction is following the webpack Getting Start guide:

https://webpack.js.org/guides/getting-started/

## Initialization

First we want to initialize the project. We do this by running the following
command:

```
npm init -y
```

This will initialize a new npm project. The `-y` by-passes the interactive set
up process by answering yes to all the questions. If you want to managed all the
field of the initialization then simply omit the `-y` and follow the prompts.

Next we install `webpack` for easy deployment of the application on Skynet.

```
npm install webpack webpack-cli --save-dev
```

Next we need to update our `package.json` file.

```
remove - "main": "index.js",
add    - "private": true,
```

`"main": "index.js"` was telling the application to expect `index.js` to be the
entry point for the application. Since we are uploading this application to
Skynet the entry point is going to be `index.html`.

Adding the `"private": true` line ensures that we don't accidentally publish our
application to `npm`.

## Add Code Files

Now that our repo is initialized let's add some code files. Our code will live
in two directories `dist/` and `src/` so let's make those.

```
mkdir dist src
```

Our application will be made up of two files, an `index.html` file that will
live in `dist/` and an `index.js` file that will live in `src/`. If you've clone
this repo you can use the following commands to copy over the files.

```
cp ../templates/intro/index.html dist/index.html
cp ../templates/intro/index.js src/index.js
```

Or you can download them directly.

```
wget -O dist/index.html "https://siasky.net/AADSJUoC_ML8qrkEAn2uiN5eIOwz-M2F9JxvRc1w05cKjg"
wget -O src/index.js "https://siasky.net/CACtCFF8mqkudyt1yJHcIVlGnO9hsGn1xTD4gRIZYIHXsA"
```

Just like a normal webpage you can add a `style.css` file. You can add your own
or copy ours.

```
cp ../templates/intro/style.css dist/style.css

or

wget -O dist/style.css "https://siasky.net/AAD7aVVqQ8poFQGJ7U08YA9BtK0XgMRa3H9Y7J3E5tRjOw"
```

## Skynet SDK

Now that we have the main code files for our application ready to do let's
install the Browser JS SDK for Skynet.

```
npm install skynet-js
```

## Build Application

Now we are ready to build our application. We do that by running the following
command.

```
npx webpack
```

You'll notice that this generated a `main.js` file in your `dist/` directory.

## Deploy Application

We are now ready to deploy our application on Skynet. To deploy our application
we simply need to upload the `dist/` directory using any available Skynet Portal
like https://siasky.net.

- Click Upload Directory
- Find your `dist/` directory
- Click Upload
- Follow Skylink to your App!

## Share you Success!

Congratulations! You just completed your first Skynet workshop and have an
awesome Certificate of Completion hosted on Skynet.

Be sure to share you accomplishment on Social Media to help spread the word
about how awesome and easy Skynet is to use!

Here is a sample post

```
I just completed my first Skynet workshop! Check out my Certificate of
Completion that was created and stored on Skynet <your skylink here>!

Give it a shot today!
https://github.com/NebulousLabs/skynet-workshop
https://siasky.net

@SiaTechHQ #skynet
```

# SkyDB

Now that we have a Skapp that can create a static webpage, let's upgrade it to
be more dynamic. This section will walk through how to update the Skapp to use
SkyDB to enable users to edit the information they have previously entered.

## Update Code Files

Let's update the `index.html` and the `index.js` file.

```
cp ../templates/skydb/index.html dist/index.html
cp ../templates/skydb/index.js src/index.js

or

wget -O dist/index.html "https://siasky.net/AAD1wg6wV3am-ft06YmVVB-HYtbrdOJa_rd7DPXTp_WN_Q"
wget -O src/index.js "https://siasky.net/AACjKhHk1AWfGdrWRYPfAkBzfFqlqiAPnhnXWNoDLrRbsg"
```

If we look at the `index.html` file we will notice it looks verify similar. We
added a input for a `seed` with a load button at the top.

```html
<!-- Seed and Load Button -->
<div>
  <!-- Load a Profile with seed or provide seed to save -->
  <label for="seed">Seed</label>
  <input id="seed" placeholder="Your Secret Seed" />
  <button
    id="load_profile"
    class="skyid-button small-margin-top"
    onclick="window.getProfile()"
  >
    Load Profile
  </button>
</div>
```

We also added inputs for an email and a bio to make this more of a user profile.

```html
<label for="email">Email</label> <input id="email" placeholder="email" /><br />
<p>Bio</p>
<textarea id="bio" class="p-3 rounded" placeholder="bio"></textarea><br />
```

Now there is a little more different in the `index.js` file so let's break it
down.

First you'll notice we are now importing `keyPariFromSeed` from the `skynet-js`
library. This is used to generate a `PrivateKey` and a `PublicKey` from the
`seed` enter by the user.

Next, we now have two functions, a `setProfile` and a `getProfile`. These
function set and get the profile information from `SkyDB` using the
`SkynetClient`'s `db.setJSON` and `db.getJSON`. The data in `SkyDB` can be
stored as `JSON` for ease and we use the variable `dbEntryName` as the
identifier.

`db.setJSON` takes the `PrivateKey` derived from the `seed` to set the JSON data
with the `dbEntryName` identifier. `db.getJSON` takes the `PublicKey` derived
from the `seed` to get the JSON data associated with the `dbEntryName`
identifier.

## Build Application

Now we are ready to re-build our application. We do that by running the
following command.

```
npx webpack
```

You'll notice that this updated the `main.js` file in your `dist/` directory.

## Deploy Application

We are now ready to re-deploy our application on Skynet. To re-deploy our
application we simply need to upload the `dist/` directory again using any
available Skynet Portal like https://siasky.net.

- Click Upload Directory
- Find your `dist/` directory
- Click Upload
- Follow Skylink to your App!

## Use you Skapp!

Now that we have a newly deployed Skapp we can use it to see the improved
functionality. You can now enter in your profile information with a seed and
save it to SkyDB. Now if you reload the Skapp you can enter your seed and load
that same profile information from SkyDB!

Awesome!

# SkyID

## Update Code Files

Let's update the `index.html` and the `index.js` file.

```
cp ../templates/skyid/index.html dist/index.html
cp ../templates/skyid/index.js src/index.js

or

wget -O dist/index.html "https://siasky.net/CAC55A0gnYGnBIIlkY_exMcd6DlfwfD4Lw6avNOYJ2nnvg"
wget -O src/index.js "https://siasky.net/AABxzVyBfbVZu6Pbw59IW2Q9wHOK3HCa1Dq8AwNgA2gM6w"
```

First let's look at the changes to the `index.html` file. At first glance it
looks like we change a lot, but don't worry, most of the changes are using the
nice `class` definitions that `SkyID` provides. To see the functional changes we
look to the bottom and the new `<script>` tags.

Here we are importing `SkyID`.

```html
<!-- Import SkyID JavaScript to Initialize and setup SkyID -->
<script src="https://skyaccounts.hns.siasky.net/skyid.js"></script>
```

Then we see the main `JavaScript` code that makes our Skapp work. There three
key pieces to look at.

First we have the `SkyID` initialization code that accepts the name of the Skapp
and an optional callback function.

```javascript
// Initialize SkyID
var skyid = new SkyID("SkyID Workshop", loginCallBack);
```

Second we have our `getProfile` function. In the `SkyDB` example, this
function was in our `index.js` file because we needed the `skynet-js` library.
`SkyID` handles the `skyney-js` code for us and allows us to move our JavaScript
code here enabling a more simple app. `getProfile` calls `skyid.getFile` and
passes in `profile` as the identifier. `SkyID` then handles all the `seed` and
key management for us.

```javascript
// Get the users Profile
function getProfile() {
  // Use getFiel to fetch the profile info
  skyid.getFile("profile", function (response, revision) {
    // Handle Response
  });
}
```

Third we have our `setProfile` function which calls `skyid.setFile` and passes
in the same `profile` identifier and the data we want to save as a JSON object.
Again, `SkyID` is handling all the `seed` and key managed for us.

```javascript
// Save the users profile
async function setProfile() {
  // Upload the avatar
  const avatarskylink = await window.uploadAvatar();

  // Grab the profile information
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  // Convert to json
  const json = JSON.stringify({ name, email, bio, avatarskylink });

  // Use setFile to upload the profile information to SkyDB
  skyid.setFile("profile", json, function (response) {
    if (response != true) {
      alert("Sorry, but upload failed :(");
    }
  });
}
```

Now let's look at the `index.js` file. You'll notice that this file got
significantly simplified. Since we are having the user upload a picture for
their avatar, we are using the `skyney'js` library to upload the file. This
enables us to only store the `skylink` of that avatar file in the user's profile
data.

In fact, if we weren't uploading an avatar file we could remove this file all
together!

## Build Application

Now we are ready to re-build our application. We do that by running the
following command.

```
npx webpack
```

You'll notice that this updated the `main.js` file in your `dist/` directory.

## Deploy Application

We are now ready to re-deploy our application on Skynet. To re-deploy our
application we simply need to upload the `dist/` directory again using any
available Skynet Portal like https://siasky.net.

- Click Upload Directory
- Find your `dist/` directory
- Click Upload
- Follow Skylink to your App!

## Use you Skapp!

Now you are ready to use you new `SkyID` Skapp! You'll be able to sign in with
your `SkyID` and create and update your profile information.

# Next Steps

Congratulations! You have all the tools you need to go build amazing new Skapps!

Be sure to join us on [Discord](https://discord.com/invite/sia) and share your
Skapp. Also be sure to upload your Skapp to the [Skynet App
Store](https://siasky.net/hns/skyapps) so others can easily find it and use it!
