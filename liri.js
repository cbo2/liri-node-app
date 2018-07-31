require("dotenv").config();
var keys = require('./keys');
// import keys from './keys';
console.log("the value of keys is: ", keys);
console.log("the value of twitter keys is: ", keys.twitter);
var Twitter = require('twitter');
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(client);
// var client = new Twitter({
//   consumer_key: 'iA5NyyChKcjrSVU5slzzAqWdx',
//   consumer_secret: '6YAR3sCe0Gx1qgPR9xHLP0XvtbQJBy4nyldinKcf75h9JHqDby',
//   access_token_key: '1023926400842194944-5l7ZbVRdNtVNHmN1yPagJulp0T1I3e',
//   access_token_secret: 'skZTdEuc7IfCuD2mBnKiyGd97T9x9tX2meP8of2AuJpy8'
// });
// console.log(client);

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
