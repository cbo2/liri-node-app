require("dotenv").config();
var keys = require('./keys');
var request = require("request");

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
    console.log("-----------------------------------------------------");
    console.log(response);
    console.log("-----------------------------------------------------");
    console.log(body);
    console.log("-----------------------------------------------------");
    body = JSON.parse(body);
    console.log(body.Title);
    console.log(body.Year);
    console.log(body.Rated);
    for (var i = 0; i < body.Ratings.length; i++) {
      if (body.Ratings[i].Source === "Rotten Tomatoes") {
        console.log(body.Ratings[i].Value);
      }
    }
    console.log(body.Country);
    console.log(body.Language);
    console.log(body.Plot);
    console.log(body.Actors);
  }
});
