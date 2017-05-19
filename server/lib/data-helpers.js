"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

   /*
    * Saves a tweet to `db`
    *  @Params
    *  @returns
    */
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, () => {
        callback(null, true);
      })
    },

   /*
    *  Get all tweets in `db`, sorted by newest first
    *  @Params
    *  @returns
    */
    getTweets: function(callback) {
      db.collection("tweets").find({}).toArray((err , results) => {
        if (err) {
          console.log(err);
        }
        let tweetsAry = results;
        const sortNewestFirst = (a, b) => b.created_at - a.created_at;
        callback(null, tweetsAry.sort(sortNewestFirst));
      })
    }

  };

}

