# liri-node-app

This is a cli (command line interface app).  It has the following commands:
* my-tweets <twitter handle>  if twitter handle is omitted it will use node.js
* spotify-this-song "song in quotes"
* movie-this "movie name in quotes"
* do-what-it-says    This command will read a command from the random.txt file


I am using the following npm packages with this app:
- winston for logging
- dotenv for handing .env file secrets/keys
- request for calls to omdb
- fs for filesystem reads
- node-spotify-api for calls to spotify
- twitter