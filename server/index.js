const express = require('express');
const axios = require('axios');
const config = require('../config');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

// get tweets of twitter user :id
app.get('/tweets/:id', (req, res) => {
  const { id } = req.params;
  const { startDate } = req.query;
  axios.get(`https://api.twitter.com/2/users/${id}/tweets?max_results=100`, {
    headers: {
      Authorization: `Bearer ${config.BEARER_TOKEN}`,
    },
    params: {
      start_time: startDate,
      'tweet.fields': 'public_metrics,created_at',
      exclude: 'retweets',
    },
  })
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
});

// get likes of twitter user :id
app.get('/users/:id/liked_tweets', (req, res) => {
  const { id } = req.params;
  axios.get(`https://api.twitter.com/2/users/${id}/liked_tweets?tweet.fields=created_at&max_results=100`, {
    headers: {
      Authorization: `Bearer ${config.BEARER_TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
});

// get retweets of twitter user :id
app.get('/retweets/:id', (req, res) => {
  const { id } = req.params;
  const { startDate } = req.query;

  axios.get(`https://api.twitter.com/2/users/${id}/tweets?max_results=100`, {
    headers: {
      Authorization: `Bearer ${config.BEARER_TOKEN}`,
    },
    params: {
      start_time: startDate,
      'tweet.fields': 'public_metrics,created_at',
    },
  })
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
