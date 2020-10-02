# Intro

In this introduction we will go through the process of creating and deploying
a simple application on [Skynet](https://siasky.net).

This package can be used as a stand alone repo.

# Prerequisites

- Fork the main Skynet Workshop repo or install wget
- [node & npm](https://nodejs.org/en/)
- [Psych](https://www.youtube.com/watch?v=ZXsQAXx_ao0)

# Creating Your First Skapp

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
wget -O dist/index.html "https://siasky.net/AABDxjXy3nukGnc6mK0SIeLZ_qAcyRj8DVeUffydHBYSYQ"
wget -O src/index.js "https://siasky.net/AACBVHyF5m2t9efH4GU4b83XZlYW7rynrZR4SiGztkL8QQ"
```

Just like a normal webpage you can add a `style.css` file. You can add your own
or copy ours.

```
cp ../templates/intro/style.css dist/style.css

or

wget -O dist/style.css "https://siasky.net/AAATOFYwsrzvfAJUZZB3ZWWZWGVac3rSoxlnnlw-17JvPA"
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
