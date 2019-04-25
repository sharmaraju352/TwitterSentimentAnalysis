const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  positive_tweets: {
    type: Number,
    required: true
  },
  negative_tweets: {
    type: Number,
    required: true
  },
  neutral_tweets: {
    type: Number,
    required: true
  }
});

module.exports = Candidate = mongoose.model('candidates', CandidateSchema);
