var twitterUtil = require('../utility/util-twtr.js');
var havenUtil = require('../utility/util-haven.js');
var Promise = require('bluebird');

var {Score} = require('../db/index.js');
var {User} = require('../db/index.js');
var {Handle} = require('../db/index.js');
var queryString = require('query-string');




var getTweetsAsync = Promise.promisify(twitterUtil.getTweets, {context: twitterUtil, multiArgs: true});
var getSentimentAsync = Promise.promisify(havenUtil.getSentiment, {context: havenUtil});
var getSearchTweetsAsync = Promise.promisify(twitterUtil.getSearchTweets, {context: twitterUtil, multiArgs: true});

module.exports = {
  getAnalysis: function(req, res, next) {
    //takes one user
    //runs getSearchTweetAsync for each geocode
    //promise.all(array of async calls).then(results run sentiment analysis)

    // Using hardcoded twitter handle for testing purposes, default currently pulls 5 most recent tweets
    var twitterHandle = req.params.handle || 'TweetsByTutt';
    var currentUser = req.params.user || 'RipplMaster';
    var location = req.params.location;
    var globaldata, globaltweetData, globalsentiment, globaluser;

    var geocodesIn = [
      {city:'Worldwide', geocode: ''},
      {city:'San Francisco', geocode: '37.7749,-122.4194,50km'},
      {city:'Toronto', geocode: '43.6532,-79.3832,50km'},
      {city:'New York', geocode: '40.7128,-74.0059,50km'},
      {city:'Chicago', geocode: '41.8781,-87.6298,50km'},
      {city:'Austin', geocode: '30.2672,-97.7431,50km'}
    ];

    var geocodesOut = {
      '': 'Worldwide',
      '37.7749,-122.4194,50km': 'San Francisco',
      '43.6532,-79.3832,50km': 'Toronto',
      '40.7128,-74.0059,50km': 'New York',
      '41.8781,-87.6298,50km': 'Chicago',
      '30.2672,-97.7431,50km': 'Austin'
    }

////////
    var promises = [];

    for (var i = 0; i < geocodesIn.length; i++) {
      promises.push(getSearchTweetsAsync(twitterHandle, geocodesIn[i].geocode));
    }

    Promise.all(promises).then(values => {
      var globalTweets = values;
      // console.log('%%%%%', values[0][0].statuses.length)
        var globalTweetStrings = globalTweets.map(location => {
          return twitterUtil.getTweetString(location[0].statuses);
        })
        var sentimentPromises = globalTweetStrings.map((location, index) => {
          return getSentimentAsync(null, location.string);
        })
        return Promise.all(sentimentPromises);
      })
      .then(sentiments => {
        // console.log('@@@@', sentiments)
        for (var k = 0; k < geocodesIn.length; k++) {
          Score.create({
            twitterHandle: twitterHandle,
            numTweets: globalTweets[k][0].statuses.length,
            tweetText: globalTweetStrings[k].text,
            sentimentScore: sentiments[k],
            retweetCount: globalTweetStrings[k].retweetCount,
            favoriteCount: globalTweetStrings[k].favoriteCount,
            locationId: k
          })
        }
        res.end()
      })

// %%% [ [ { statuses: [Object], search_metadata: [Object] },


      //////

    // getTweetsAsync(twitterHandle)
    // .spread((data, response) => {
    //   globaldata = data;
    //   globaltweetData = twitterUtil.getTweetString(globaldata);
    //   res.send(JSON.stringify(globaldata));
    //   // Need to look into handling haven asynchronously
    //   return getSentimentAsync(twitterHandle, globaltweetData.string);
    // })
    // .then((sentiment) => {
    //   globalsentiment = sentiment;
    //   console.log('response ==>', sentiment);
    //   return User.findOne({username: currentUser});
    // })
    // .then(function(user) {
    //   console.log('CREATING SCORE');
      // return Score.create({twitterHandle: twitterHandle,
      //   numTweets: globaldata.length,
      //   tweetText: globaltweetData.string,
      //   sentimentScore: globalsentiment,
      //   retweetCount: globaltweetData.retweetCount,
      //   favoriteCount: globaltweetData.favoriteCount})
    //     .then((newScore) => newScore.setUser(user.id)
    //     .then((newScore) => newScore));
    // })
    // .then((newScore) => {
    //   console.log('New score created!');
    //   return res.status(200).json(newScore);
    // })
    // .catch((err) => {
    //   console.error('Analysis error ', err);
    //   return res.status(404).end();
    // });
  },

  getRequestToken: function(req, res, next) {
    twitterUtil.getRequestToken(req, res);
  },

  getAccessToken: function(req, res, next) {
    // Receives callback that contains oAuth verifier
    // Pull verifier from query parameters
    // Send oAuth verifier through utility function and user promises to verify consumer keys
    let oAuthVerifier = req.query.oauth_verifier;
    twitterUtil.getAccessToken(req, res, oAuthVerifier);
  },

  getSearchTweets: function(req, res, next) {
      getSearchTweetsAsync('abc', data => {
        var tweetString = twitterUtil.getTweetString(data.statuses).string;
        console.log('index getSearchTweets', tweetString);
        console.log('total tweets', data.statuses.length);


        getSentimentAsync('', tweetString).then(data => {
          console.log('$$$$$$#####', data);
        });


        res.send(data);
    });
  },
  getUserScores: function(req, res, next) {
    console.log('Username param: ' + req.params.username);
    let username = req.params.username || 'RipplMaster';
    console.log(username);
    User.find({where: { username: username }})
    .then(function(user) {
      console.log('USER :', user);
      return Score.findAll({UserId: user.id});
    })
    .then(function(scores) {
      res.status(200).json(scores);
    })
    .catch(function(err) {
      console.error('Error fetching user scores', err);
      res.status(404).end();
    });
  },

  createTestUser: function(req, res, next) {
    User.findOrCreate({where: {username: 'RipplMaster'}, defaults: {password: ''}})
    .then((user) => {
      console.log('testUser created');
      res.status(200).end();
    })
    .catch((err) => {
      console.log('RipplMaster creation error');
      res.status(404).end();
    });
  },

  updateLocation: function(req, res, next) {
    var location = req.params.locationId;



  }

};