# Animation Engine Refactor

Preston Sia (presia27), forked from Dr. Chris Marriott's (algorithm0r) Empty--GameEngine repository

This project is a refactor of Chris Marriott's game engine code in TypeScript
using a componentized organization structure. This version aims to be more
type safe with fewer bugs and more flexible for larger projects through
better organization of code.

For testing, an Express.js server is included to run the application locally.

## Get it running
From your terminal, run ```npm install```

Every time you make a change to your source code, run ```npm run build``` to compile to JavaScript.

To run the server, run ```npm run start``` and navigate to localhost:8000 in your browser.

## Directories
assets - these contain game assets, such as images and music

js - this is the JavaScript output folder for transpiled TypeScript code

server - source code for the Express.js server

srvbuild - compiled Express.js server code

view - HTML files

src - source code for the game engine. The core files are here, and some basic
components can be found in the componentLibrary directory. The sampleFiles
directory contains additional sample code for running a cat animation.
