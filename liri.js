var winston = require("winston");   // use winston for logging to a file and the console
// create winston loggers and initially set levels to deeper values
const transports = {
  console: new winston.transports.Console({
    level: 'warn',
    format: winston.format.simple()
  }),
  file: new winston.transports.File({
    filename: 'log.txt',
    format: winston.format.simple(),
    level: 'error'
  })
};

const logger = winston.createLogger({
  transports: [
    transports.console,
    transports.file
  ]
});

// dynamically change the logger levels to lighter levels
transports.console.level = 'info';
transports.file.level = 'info';


require("dotenv").config();
var keys = require('./keys');
var request = require("request");
var fs = require("fs");    // filesystem

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);


process.argv.splice(0, 2);  // strip off the first 2 args from the command line

runAgainstArgs(process.argv);

function runAgainstArgs(args) {
  logger.verbose("*** the request is for: " + process.argv[2]);
  switch (args[0]) {
    case "my-tweets":
      args.shift();
      if (args[0] === undefined) {
        args[0] = "node.js";   // default the search to node.js
      }
      myTweets(args[0]);
      break;
    case "spotify-this-song":
      args.shift();
      spotifyThisSong(args);
      break;
    case "movie-this":
      args.shift();
      movieThis(args);
      break;
    case "do-what-it-says":
    default:
      doWhatItSays();
      break;
  }
}

function myTweets(args) {
  logger.info("================ Running my-tweets for: " + args);
  client.get('search/tweets', { q: args, count: '20' }, function (error, tweets, response) {
    for (i = 0; i < tweets.statuses.length; i++) {
      logger.info(tweets.statuses[i].created_at + ": " + tweets.statuses[i].text);
    }
  });
}


// spotify stuff...
function spotifyThisSong(args) {
  logger.info("==================== Running spotify-this-song on track: " + args);
  var track = args[0];
  var searchCriteria = {
    type: 'track',
    query: track
  };
  spotify
    .search(searchCriteria)
    .then(function (response) {
      var items = response.tracks.items;
      for (var i = 0; i < items.length; i++) {
        logger.info("The name of the album is: " + items[i].album.name);
        var artists = items[i].artists;
        var artistArray = [];
        for (var j = 0; j < artists.length; j++) {
          artistArray.push(artists[j].name);
        }
        logger.info("artists: " + artistArray.join(", "));
        // logger.info(response.tracks.items[0].artists[0].name);
        logger.info(response.tracks.items[0].name);
        logger.info(response.tracks.items[0].external_urls.spotify);
      }
    })
    .catch(function (err) {
      logger.info(err);
    });
}

// OMDB section
function movieThis(movieName) {
  logger.info("===================== Running movie-this for: " + movieName);

  request("https://www.omdbapi.com/?t=" + movieName + "&y=&r=json&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      logger.info("Title: " + body.Title);
      logger.info("Year Released: " + body.Year);
      logger.info("Rated: " + body.Rated);
      for (var i = 0; i < body.Ratings.length; i++) {
        if (body.Ratings[i].Source === "Rotten Tomatoes") {
          logger.info("As Rated by Rotten Tomatoes: " + body.Ratings[i].Value);
        }
      }
      logger.info("Country: " + body.Country);
      logger.info("Language: " + body.Language);
      logger.info("Plot: " + body.Plot);
      logger.info("Actors: " + body.Actors);
    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return logger.error(error);
    }

    logger.debug(data);

    var argsFromRandomFile = data.split(",");

    runAgainstArgs(argsFromRandomFile);  // run app with args from file as-if from the command line

  });
}
