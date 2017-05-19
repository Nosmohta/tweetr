"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      console.log("about to create tweetsAry")

      db.collection("tweets").find({}).toArray((err , results) => {
        if (err) {
          console.log(err);
        }

        let tweetsAry = results;
        console.log(tweetsAry);

        const sortNewestFirst = (a, b) => b.created_at - a.created_at;
        callback(null, tweetsAry.sort(sortNewestFirst));



      })
    }

  };

}

