# manila

## manila is about autonomous communication networks?




## api/ is a simple Flask API made to coordinate with Amazon S3 and a MongoDB instance. 
- You need an S3 Bucket with proper permissions and a MongoDB instance somewhere (I used a Compose.io server I already have running, but this could probably be written as using Sqlite or tinydb).
- The server should allow both http/https queries.

## extension/ is the Chrome Extension. Currently under total development.

If you reeeally want to use this: edit manifest.json and change the tabroom in 'settings' to something else. Anyone with the same chrome extension with the same tabroom will change/read the same set of new tabs.

- TODO: options page that sets tabroom & encryption passphrase
- TODO: encryption of url & scribble images with sjcl.js
- TODO: better performance so that the extension isn't loading jquery, sjcl, etc on each page but loads a stub piece of js that then loads more code
- TODO: figure out a better way to run code upon url change?
