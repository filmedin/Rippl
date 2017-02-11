var twitterUtil = require('../utility/util-twtr.js');
var havenUtil = require('../utility/util-haven.js');
var Promise = require('bluebird');

var {Score, User, Handle, Trend} = require('../db/index.js');

var getSentimentAsync = Promise.promisify(havenUtil.getSentiment, {context: havenUtil});
var getSearchTweetsAsync = Promise.promisify(twitterUtil.getSearchTweets, {context: twitterUtil, multiArgs: true});
var getTrendsAsync = Promise.promisify(twitterUtil.getTrends, {context: twitterUtil, multiArgs: true});

var geocodes = [
      {city:'Worldwide', geocode: '', id:1},
      {city:'San Francisco', geocode: '37.7749,-122.4194,50km', id:2487956},
      {city:'Toronto', geocode: '43.6532,-79.3832,50km', id:4118},
      {city:'New York', geocode: '40.7128,-74.0059,50km', id:2459115},
      {city:'Chicago', geocode: '41.8781,-87.6298,50km', id:2379574},
      {city:'Austin', geocode: '30.2672,-97.7431,50km', id:2357536},
      {city:'Sydney', geocode: '-33.8688,151.2093,50km', id:1105779},
      {city:'London', geocode: '51.5074,-0.1278km', id:44418},
      {city:'Dubai', geocode: '25.2048, 55.2708,50km', id:1940330},
      {city:'Rio de Janeiro', geocode: '-22.9068, -43.1729,50km', id:455819}
    ];

module.exports = {
  getAnalysis: function(req, res, next) {
    var twitterHandle = req.params.handle || '@BarackObama';

    var globalTweets, globalTweetStrings, globalsentiment, globaluser;
    var promises = [];

    for (var i = 0; i < geocodes.length; i++) {
      promises.push(getSearchTweetsAsync(twitterHandle, geocodes[i].geocode));
    }
    Promise.all(promises).then(values => {
      globalTweets = values;
        globalTweetStrings = globalTweets.map(location => {
          return twitterUtil.getTweetString(location[0].statuses);
        })
        var sentimentPromises = globalTweetStrings.map((location, index) => {

          return location.string ? getSentimentAsync(null, location.string) : 0;
        })
        return Promise.all(sentimentPromises);
      })
      .then(sentiments => {
        Score.destroy({
          where: {
            twitterHandle: twitterHandle
          }, force:true
        });

        for (var k = 0; k < geocodes.length; k++) {
          var dbInput = {
            twitterHandle: twitterHandle,
            numTweets: globalTweets[k][0].statuses.length,
            tweetText: globalTweetStrings[k].string,
            sentimentScore: sentiments[k],
            retweetCount: globalTweetStrings[k].retweetCount,
            favoriteCount: globalTweetStrings[k].favoriteCount,
            locationId: k
          }
          Score.create(dbInput)
        }
        res.send('');
      })

  },

  updateTrends: function (req, res, next) {
    var promises = [];
    for (var i = 0; i < geocodes.length; i++) {
      promises.push(getTrendsAsync(geocodes[i].id));
    }
    Trend.destroy({force:true, truncate: true});
    Promise.all(promises).then(values => {
      for (var i = 0; i < values.length; i++) {
        var trends = values[i][0][0].trends.sort((a,b) => { return (b.tweet_volume || 0) - (a.tweet_volume || 0)});
        for (var j = 0; j < 10; j++) {
          Trend.create({
            trend: trends[j].query,
            locationId: i,
            numTweets: trends[j].tweet_volume || 0
          })
        }
      }
      res.end();
    });
  },
  getTrendAnalysis: function(req, res, next) {
    var globalTweets;
    getSearchTweetsAsync(req.params.trend, geocodes[req.params.locationId].geocode).then(value => {
      globalTweets = value[0].statuses;
      return getSentimentAsync(null, twitterUtil.getTweetString(globalTweets).string);
    }).then(sentiment => {
      res.send(JSON.stringify({sentiment, globalTweets}));
    })
  },

  getScores: function(req, res, next) {
    Score.findAll({where: {locationId: (req.params.locationId || 0)}})
    .then(function(scores) {
      res.status(200).json(scores);
    })
    .catch(function(err) {
      res.status(404).end();
    });
  },
  getTrends: function(req, res, next) {
    Trend.findAll({where: {locationId: (req.params.locationId || 0)}})
    .then(trends => {res.status(200).json(trends);})
    .catch(err => {res.status(404).end();});
  },
  deleteHandle: function(req, res, next) {
    var handle = req.params.handle
    Score.destroy({
      where: {
        twitterHandle: handle
      }, force:true
    })
    res.end();
  }

};