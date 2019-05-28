"Dit project is gemaakt in het kader proeve van bekwaamheid aan het Mediacollege Amsterdam in het jaar 2018-2019."

This project operates under the name "Morfits", this file aims to get you started up quickly.

> Let me start by first explaining why we chose node, as it has some level of entrance. This is purely due to the fact that we try to always use the tool that is best for the job at hand. In the case of Phaser and multiplayer using socket.io is the most logical decision. This also because this is the way Phaser explains implementing multiplayer. For running socket.io a node server is a MUST. As the popularity of using node servers grows within the branch, using a node server also closely relates to the work field.

Requirements:
- Node (recommended: 10.15.3)
- NPM (Comes installed with node)
- A terminal to type the start commands in.

This projects requires node to run, this is for the multiplayer aspect of the game.

You have two options to get started, either compile from source or start up the node server with the already compiled folder. _NOTE HERE that compiling from source deletes the already compiled version_

## Starting the server
Open up the terminal and navigate to this folder. If unaware on a way to do this we would recommend using the code editor VSCode and opening the folder in there and then go under view > terminal

Next we have provided two zips, one with node_modules installed and one that doesn't have the node_modules. If this is the version with the node modules not installed you first need to install these via the terminal with the following command:

```
npm install
```

If you are using the version that comes with the node_modules you can skip this step.

### Using the already compiled version
Again focus the terminal on this folder and type the following:

```
npm run nodeStart
```

This should start the server on localhost:1337, the application should now be working in the browser if you navigate to localhost:1337

If it throws a error in the terminal please make sure that you have the node modules installed.

### Building from source
If you want to compile from source, then first focus the terminal on this folder. Then please make sure you have the node_modules installed. Then simply type the following command in the terminal:

```
npm start
```

Compiling might take a while, but this should start the server in a development mode and should start the server on localhost:8080

If you go to localhost:8080 it should now show the application in the browser.

## If all these methods don't work
If for whatever all these methods don't work, don't be alarmed, there is one last way to also get the application working (in a limit mode). Meaning all multiplayer aspects won't work and some part of the application such as Snake won't work as socket.io isn't running and these rely on those heavily.

Keeping this in mind you can start the server by opening the dist folder in the terminal, and then using a CLI tool such as browser-sync to start the server.

```shell
cd /path/to/folder/morfits/dist

browser-sync
```

This should start a server locally with the index.html as a base.

## Finally
If you wish to do so you could also deploy the already compiled application to a node server running on a host such as digitalocean, who have one click installs for node applications.

See: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

