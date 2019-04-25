const Tweet = require('./model/tweet');
const Candidate = require('./model/candidate');
const mongoose = require('mongoose');
const config = require('./config/config');
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => {
    Candidate.find({}, function(err, docs) {
      if (!err) {
        console.log(docs);
      } else {
        throw err;
      }
    });
  })
  .catch(err => console.log(err));
