require("dotenv").config();
var keys = require('./keys');
console.log("the value of keys is: ", keys);
console.log("the value of twitter keys is: ", keys.twitter);


var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var Twitter = require('twitter');
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(client);

client.get('search/tweets', { q: 'cally_bomba', count: '20' }, function (error, tweets, response) {
  console.log("=========================================================================================");
  console.log("the length of statuses is: ", tweets.statuses.length);
  for (i = 0; i < tweets.statuses.length; i++) {
    console.log(tweets.statuses[i].text);
  }
  console.log("=========================================================================================");
  // console.log(tweets);
});


// spotify stuff...
console.log("------------ spotify ----------------");
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function (response) {
    console.log(JSON.stringify(response));
  })
  .catch(function (err) {
    console.log(err);
  });
