const express = require('express');
const mongoose = require('mongoose');
const tweets = require('./api/tweets');
const config = require('./config/config');

const app = express();
app.use('/api/tweets', tweets);

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
