import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sentiment from './Sentiment';
import PopularWords from './PopularWords';

function App() {
  const id = '1232319080637616128';
  const startDate = '2021-08-19T00:00:00Z';
  const [tweetData, setTweetData] = useState([]);
  const [likedTweetsData, setLikedTweetsData] = useState([]);
  useEffect(() => {
    axios.get(`/tweets/${id}`, {
      params: {
        startDate,
      },
    })
      .then((resp) => {
        setTweetData(resp.data.data);
      });
    axios.get(`/users/${id}/liked_tweets`)
      .then((resp) => {
        setLikedTweetsData(resp.data.data);
      });
  }, [id, startDate]);

  return (
    <div>
      <Sentiment tweetData={tweetData} />
      <PopularWords tweetData={tweetData} />
    </div>

  );
}

export default App;
