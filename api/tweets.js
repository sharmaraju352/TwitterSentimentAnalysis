const express = require('express');
const Candidate = require('../model/candidate');
const Tweet = require('../model/tweet');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Tweets API works!!!');
});

router.get('/getCandidates', (req, res) => {
  Candidate.find({}, function(err, candidates) {
    if (!err) {
      res.json({ candidates });
    } else {
      throw err;
    }
  });
});

router.get('/getPositiveTweets/:canidate', (req, res) => {
  Tweet.find(
    { sentiment: 'positive', candidate: req.params.canidate },
    function(err, tweets) {
      if (!err) {
        res.json({ tweets });
      } else {
        throw err;
      }
    }
  );
});

router.get('/getNegativeTweets/:canidate', (req, res) => {
  Tweet.find(
    { sentiment: 'negative', candidate: req.params.canidate },
    function(err, tweets) {
      if (!err) {
        res.json({ tweets });
      } else {
        throw err;
      }
    }
  );
});

router.get('/getNeutralTweets/:canidate', (req, res) => {
  Tweet.find({ sentiment: 'neutral', candidate: req.params.canidate }, function(
    err,
    tweets
  ) {
    if (!err) {
      res.json({ tweets });
    } else {
      throw err;
    }
  });
});

module.exports = router;
