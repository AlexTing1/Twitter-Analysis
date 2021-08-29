import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sentiment from './Sentiment';
import PopularWords from './PopularWords';
import Graph from './Graph';

function App() {
  const id = '1232319080637616128';
  const startDate = '2021-02-01T00:00:00Z';
  const [tweetData, setTweetData] = useState([]);
  const [likedTweetsData, setLikedTweetsData] = useState([]);
  const [retweetData, setRetweetData] = useState([]);

  function getRetweets(data) {
    const result = [];
    for (let i = 0; i < data.length; i += 1) {
      const currentText = data[i].text;
      const retweetTextArray = currentText.split(' ');
      if (retweetTextArray[0] === 'RT' && retweetTextArray[1][0] === '@') {
        result.push(data[i]);
      }
    }
    return result;
  }

  useEffect(() => {
    axios.get(`/tweets/${id}`, {
      params: {
        startDate,
      },
    })
      .then((resp) => {
        // console.log('this is tweet data raw: ', resp.data.data);
        setTweetData(resp.data.data);
      });
    axios.get(`/users/${id}/liked_tweets`)
      .then((resp) => {
        // console.log('this is liked data raw ', resp.data.data);
        setLikedTweetsData(resp.data.data);
      });
    axios.get(`/retweets/${id}`, {
      params: {
        startDate,
      },
    })
      .then((resp) => {
        setRetweetData(getRetweets(resp.data.data));
      });
  }, [id, startDate]);

  return (
    <div>
      <Sentiment tweetData={tweetData} />
      <PopularWords tweetData={tweetData} />
      <Graph tweetData={tweetData} likedTweetsData={likedTweetsData} retweetData={retweetData} />
    </div>

  );
}

export default App;
