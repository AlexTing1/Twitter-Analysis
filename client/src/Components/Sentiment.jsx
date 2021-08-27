import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sent from 'sentiment';
import { PieChart } from 'react-minimal-pie-chart';

function Sentiment({ id }) {
  //const [tweetData, setTweetData] = useState([]);
  const [sentiment, setSentiment] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const startDate = '2021-08-19T00:00:00Z';

  /* function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  } */
  const getSentiment = function(inputString) {
    const sent = new Sent();
    const result = sent.analyze(inputString);
    return result.score;
  };

  useEffect(() => {
    axios.get(`/tweets/${id}`, {
      params: {
        startDate,
      },
    })
      .then((resp) => {
        //setTweetData(resp.data.data);
        const tempSentiment = {
          positive: 0,
          neutral: 0,
          negative: 0,
        };
        const tweetData = resp.data.data;
        tweetData.forEach((tweet) => {
          const currentSent = getSentiment(tweet.text);
          if (currentSent > 0) {
            tempSentiment.positive += 1;
          } else if (currentSent < 0) {
            tempSentiment.negative += 1;
          } else {
            tempSentiment.neutral += 1;
          }
        });
        setSentiment(tempSentiment);
      });
  }, [id, startDate]);

  console.log(sentiment);

  return (
    <div>
      this is sentiment
    </div>
  );
}

export default Sentiment;
