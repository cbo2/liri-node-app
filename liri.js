require("dotenv").config();
var keys = require('./keys');
// import keys from './keys';
console.log("the value of keys is: ", keys);
console.log("the value of twitter keys is: ", keys.twitter);
var Twitter = require('twitter');
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(client);

client.get('search/tweets', {q: 'cally_bomba'}, function(error, tweets, response) {
  for (i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
  }
  // console.log(tweets);
});

// client.get('favorites/list', function(error, tweets, response) {
//   if(error) throw error;
//   console.log(tweets);  // The favorites.
//   console.log(response);  // Raw response object.
// });
