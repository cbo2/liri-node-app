require("dotenv").config();
var keys = require('./keys');
var request = require("request");
var fs = require("fs");    // filesystem

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


console.log("*** the request is for: " + process.argv[2]);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

// console.log(client);

client.get('search/tweets', { q: 'node.js', count: '20' }, function (error, tweets, response) {
  console.log("=========================================================================================");
  console.log("the length of statuses is: ", tweets.statuses.length);
  for (i = 0; i < tweets.statuses.length; i++) {
    // console.log(tweets.statuses[i].text);
  }
  console.log("=========================================================================================");
  // console.log(tweets);
});


// spotify stuff...
var track = "All the Small Things";
var searchCriteria = {
  type: 'track',
  query: track
};
console.log("------------ spotify ----------------");
spotify
  // .search({ type: 'track', query: 'All the Small Things' })
  .search(searchCriteria)
  .then(function (response) {
    // console.log(JSON.stringify(response));
    // console.log("The name of the album is: " + JSON.stringify(response.tracks.items[0]));
    var items = response.tracks.items;
    for (var i = 0; i < items.length; i++) {
      console.log("The name of the album is: " + items[i].album.name);
      var artists = items[i].artists;
      for (var j = 0; j < artists.length; j++) {
        console.log("artist[" + i + ":" + j + "] = " + artists[j].name);
      }
      // console.log(response.tracks.items[0].artists[0].name);
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].external_urls.spotify);
    }
  })
  .catch(function (err) {
    console.log(err);
  });


// OMDB section
var movieName = "Caddyshack";

request("https://www.omdbapi.com/?t=" + movieName + "&y=&r=json&plot=short&apikey=trilogy", function (error, response, body) {

  // If the request was successful...
  if (!error && response.statusCode === 200) {

    // Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
    console.log("--------------------OMDB DATA START ---------------------------------");
    body = JSON.parse(body);
    console.log("Title: " + body.Title);
    console.log("Year Released: " + body.Year);
    console.log("Rated: " + body.Rated);
    for (var i = 0; i < body.Ratings.length; i++) {
      if (body.Ratings[i].Source === "Rotten Tomatoes") {
        console.log("As Rated by Rotten Tomatoes: " + body.Ratings[i].Value);
      }
    }
    console.log("Country: " + body.Country);
    console.log("Language: " + body.Language);
    console.log("Plot: " + body.Plot);
    console.log("Actors: " + body.Actors);
    console.log("--------------------OMDB DATA END---------------------------------");
  }
});

fs.readFile("random.txt", "utf8", function (error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  console.log("======================== FS DATA from random.txt ==========================");
  console.log(data);

  // Then split it by commas (to make it more readable)
  var argsFromRandomFile = data.split(",");

  for (var i = 0; i < argsFromRandomFile.length; i++) {
    console.log(argsFromRandomFile[i]);
  }
  console.log("======================== FS DATA from random.txt ==========================");

});
