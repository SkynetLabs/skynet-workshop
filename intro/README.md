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

Lastly let's add a `.gitignore` file and add the following lines to help keep things in order.

```
.git
node_modules
```

Don't forget to commit your work!

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
wget -O dist/index.html "https://siasky.net/AADX6yDR4UsENZH42IzUwg2DyucOh3FEHCm7ai8m4fRKGg"
wget -O src/index.js "https://siasky.net/AACqlQ-nD6yb5L_4yG_FXR5OeLpYB6wWW0q93tQXJuI96A"
```

Just like a normal webpage you can add a `style.css` file. You can add your own
or copy ours.

```
cp ../templates/intro/style.css dist/style.css

or

wget -O dist/style.css "https://siasky.net/AAApNjwWHNlrCGUHyDRV0oVMAno9jwKzjELhhGGOzu9rjA"
```

Don't forget to commit your work!

## Skynet SDK
Now that we have the main code files for our application ready to do let's
install the Browser JS SDK for Skynet.

```
npm install skynet-js
```

Don't forget to commit your work!

## Build Application
Now we are ready to build our application. We do that by running the following
command.

```
npx webpack
```

You'll notice that this generated a `main.js` file in your `dist/` directory. 

Don't forget to commit your work!

## Deploy Application
We are now ready to deploy our application on Skynet. To deploy our application
we simply need to upload the `dist/` directory using any available Skynet Portal
like https://siasky.net.

 - Click Upload Directory
 - Find your `dist/` directory
 - Click Upload
 - Follow Skylink to your App!

