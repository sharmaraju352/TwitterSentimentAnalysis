const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  candidate: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  created: {
    type: String,
    required: true
  },
  followers: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  sentiment: {
    type: String,
    required: true
  }
});

module.exports = Tweet = mongoose.model('tweets', TweetSchema);
